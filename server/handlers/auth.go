package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	authdto "server/dto/auth"
	dto "server/dto/result"
	"server/models"
	"server/pkg/bcrypt"
	jwtToken "server/pkg/jwt"
	"server/repositories"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
)

type handlerAuth struct {
	AuthRepository repositories.AuthRepository
}

func HandlerAuth(AuthRepository repositories.AuthRepository) *handlerAuth {
	return &handlerAuth{AuthRepository}
}

func (h *handlerAuth) Register(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// request sesuai dengan register request
	request := new(authdto.Request_Register)
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// validation dari request
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
		return
	}

	// setup user sesuai dengan struct di models user
	user := models.User_Tenant{
		Full_Name: request.Full_Name,
		User_Name: request.User_Name,
		Email:     request.Email,
		Password:  password,
		Phone:     request.Phone,
		Gender:    request.Gender,
		Address:   request.Address,
		Status:    request.Status,
		// Image: "https://api.dicebear.com/5.x/adventurer/svg?seed="+ request.User_Name,
	}

	// masukkankan data ke database
	data, err := h.AuthRepository.Register(user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// respon setelah register
	registerResponse := authdto.Resgister{
		Email:    data.Email,
		Password: data.Password,
		Status:   data.Status,
	}
	// success
	w.Header().Set("Content-Type", "application/json")
	response := dto.SuccessResult{Code: http.StatusOK, Data: registerResponse}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerAuth) Login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	request := new(authdto.Request_Login)
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	user := models.User_Tenant{
		Email:    request.Email,
		Password: request.Password,
		Status:   request.Status,
	}
	// fmt.Println(user, "Mana ni??")

	// Check email
	// err := mysql.DB.First(&user, "email = ?", user.Email).Error
	user, err := h.AuthRepository.Login(user.Email)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// Check password
	isValid := bcrypt.CheckPasswordHash(request.Password, user.Password)
	if !isValid {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: "wrong email or password"}
		json.NewEncoder(w).Encode(response)
		return
	}

	//generate token
	claims := jwt.MapClaims{}
	claims["id"] = user.Id
	claims["status"] = user.Status
	claims["exp"] = time.Now().Add(time.Hour * 2).Unix() // 2 jam expired

	token, errGenerateToken := jwtToken.GenerateToken(&claims)
	if errGenerateToken != nil {
		log.Println(errGenerateToken)
		fmt.Println("Unauthorize")
		return
	}

	response_login := authdto.Response_Login{

		Id:        user.Id,
		Email:     user.Email,
		Token:     token,
		Status:    user.Status,
		Full_Name: user.Full_Name,
		Gender:    user.Gender,
		Phone:     user.Phone,
	}

	w.Header().Set("Content-Type", "application/json")
	response := dto.SuccessResult{Code: http.StatusOK, Data: response_login}
	json.NewEncoder(w).Encode(response)

}
func (h *handlerAuth) CheckAuth(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userId := int(userInfo["id"].(float64))

	// Check User by Id
	user, err := h.AuthRepository.CheckOut(userId)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}
	CheckAuthResponse := authdto.CheckAuthResponse{
		Id:        user.Id,
		Full_Name: user.Full_Name,
		Email:     user.Email,
		Status:    user.Status,
		Gender:    user.Gender,
		Phone:     user.Phone,
	}

	w.Header().Set("Content-Type", "application/json")
	response := dto.SuccessResult{Code: http.StatusOK, Data: CheckAuthResponse}
	json.NewEncoder(w).Encode(response)
}
