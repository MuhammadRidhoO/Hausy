package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	dto "server/dto/result"
	usersdto "server/dto/user"
	"server/models"
	"server/pkg/bcrypt"
	"server/repositories"
	"strconv"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/gorilla/mux"
)

type handlerUser struct {
	UserRepository repositories.UserRepository
}

func HandlerUser(UserRepository repositories.UserRepository) *handlerUser {
	return &handlerUser{UserRepository}
}

// for view all data
func (h *handlerUser) FindUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userId := int(userInfo["id"].(float64))

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: userId}
	json.NewEncoder(w).Encode(response)
	// fmt.Println(users)
}

// for getting one of data users by id
func (h *handlerUser) GetUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	//params
	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	//get data
	user, err := h.UserRepository.GetUser(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}
	//to view success get data
	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: user}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerUser) GetUserLogin(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// params
	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userId := int(userInfo["id"].(float64))

	// get data
	user, err := h.UserRepository.GetUser(userId)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// success
	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: user}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerUser) CreateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// request
	request := new(usersdto.Create_Request_User)
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}
	// validation
	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// hashing password sebelum masuk ke DB
	password, err := bcrypt.HashingPassword(request.Password)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}
	dataContex := r.Context().Value("Error")
	var filename string
	if dataContex == nil {
		// image
		dataContex := r.Context().Value("dataFile")
		filename = dataContex.(string)
	}
	// setup data
	user := models.User_Tenant{
		Full_Name: request.Full_Name,
		User_Name: request.User_Name,
		Email:     request.Email,
		Password:  password,
		Status:    request.Status,
		Gender:    request.Gender,
		Phone:     request.Phone,
		Address:   request.Address,
		Image:     filename,
	}

	// store data
	data, err := h.UserRepository.CreateUser(user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	// success
	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: convertResponse(data)}
	json.NewEncoder(w).Encode(response)
}

// Update data
func (h *handlerUser) UpdateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	request := usersdto.Update_Request_User{
		Full_Name: r.FormValue("full_name"),
		User_Name: r.FormValue("user_name"),
		Email:     r.FormValue("email"),
		Phone:     r.FormValue("phone"),
		Status:    r.FormValue("status"),
		Address:   r.FormValue("address"),
		Gender:    r.FormValue("gender"),
	}
	// validation
	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// params
	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	user, err := h.UserRepository.GetUserLogin(int(id))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	dataContex := r.Context().Value("dataFile")
	var filepath string
	if dataContex.(string) != "" {
		filepath = dataContex.(string)
	}

	// create empty context
	var ctx = context.Background()

	// setup cloudinary credentials
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")

	// create new instance of cloudinary object using cloudinary credentials
	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	fmt.Println("Test cld",cld)
	// Upload file to Cloudinary
	resp, err := cld.Upload.Upload(ctx, filepath, uploader.UploadParams{Folder: "Hausy"})
	if err != nil {
		fmt.Println(err.Error())
	}
	fmt.Println("Test resp",resp)

	// cek respon dari cloudinary

	// set user image data from img url from cloudinary
	user.Image = resp.SecureURL

	fmt.Println("Test resp.SecureURL",resp.SecureURL)
	fmt.Println("Test user.Image",user.Image)


	if request.Full_Name != "" {
		user.Full_Name = request.Full_Name
	}
	if request.User_Name != "" {
		user.User_Name = request.User_Name
	}
	if request.Email != "" {
		user.Email = request.Email
	}
	if request.Phone != "" {
		user.Phone = request.Phone
	}
	if request.Status != "" {
		user.Status = request.Status
	}
	if request.Address != "" {
		user.Address = request.Address
	}
	if request.Gender != "" {
		user.Gender = request.Gender
	}

	// store data
	data, err := h.UserRepository.UpdateUser(user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// success
	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: convertResponse(data)}
	json.NewEncoder(w).Encode(response)
}
func (h *handlerUser) UpdatePasswordUser(w http.ResponseWriter, r *http.Request) {

	request := new(usersdto.Update_Request_User)
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}
	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userId := int(userInfo["id"].(float64))

	user, err := h.UserRepository.GetUser(userId)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	isValid := bcrypt.CheckPasswordHash(request.Old_Password, user.Password)
	if !isValid {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: "Old Password is Wrong"}
		json.NewEncoder(w).Encode(response)
		return
	}
	old_password, err := bcrypt.HashingPassword(request.Old_Password)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	if request.New_Password == old_password {
		password, err := bcrypt.HashingPassword(request.Old_Password)

		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			response := dto.ErrorResult{Code: http.StatusBadRequest, Message: "Old Password is Wrong"}
			json.NewEncoder(w).Encode(response)

		}
		user.Password = password
	}
	if request.Confirm_Password == request.New_Password {
		password, err := bcrypt.HashingPassword(request.New_Password)

		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
			json.NewEncoder(w).Encode(response)

		}
		user.Password = password
	} else {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: "Password not same"}
		json.NewEncoder(w).Encode(response)
	}
	// hashing password sebelum masuk ke DB
	confirm_password, err := bcrypt.HashingPassword(request.Confirm_Password)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}
	if request.Confirm_Password != "" {
		user.Confirm_Password = confirm_password
	}

	// store data
	data, err := h.UserRepository.UpdateUser(user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// success
	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: convertResponse(data)}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerUser) DeleteUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	user, err := h.UserRepository.GetUser(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	data, err := h.UserRepository.DeleteUser(user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: convertResponse(data)}
	json.NewEncoder(w).Encode(response)
}

func convertResponse(u models.User_Tenant) usersdto.Response_User {
	return usersdto.Response_User{
		Id:        u.Id,
		Full_Name: u.Full_Name,
		User_Name: u.User_Name,
		Email:     u.Email,
		Password:  u.Password,
		Status:    u.Status,
		Address:   u.Address,
		Gender:    u.Gender,
		Image:     u.Image,
	}
}

// func convertDeleteUserResponse(u models.User_Tenant) usersdto.DeleteResponseUser {
// 	return usersdto.DeleteResponseUser{
// 		Id: u.Id,
// 	}
// }
