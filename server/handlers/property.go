package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	propertydto "server/dto/property"
	dto "server/dto/result"
	"server/models"
	"server/repositories"
	"strconv"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/go-playground/validator/v10"
	"github.com/gorilla/mux"
)

type handlerProperty struct {
	PropertyRepository repositories.PropertyRepository
}

func HandlerProperty(PropertyRepository repositories.PropertyRepository) *handlerProperty {
	return &handlerProperty{PropertyRepository}
}

// for view all data
func (h *handlerProperty) FindPropertys(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	propertys, err := h.PropertyRepository.FindPropertys()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())
	}
	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: propertys}
	json.NewEncoder(w).Encode(response)
	// fmt.Println(propertys)
}
func (h *handlerProperty) FilterBar(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	queryParams := r.URL.Query()

	city := queryParams.Get("city")
	price, _ := strconv.Atoi(queryParams.Get("price"))

	propertys, err := h.PropertyRepository.FilterBar(city, price)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())
	}
	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: propertys}
	json.NewEncoder(w).Encode(response)
	fmt.Println(propertys)
}
func (h *handlerProperty) FilterPropertys(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	queryParams := r.URL.Query()

	typeRent := queryParams.Get("type_of_rent")
	Amenities := queryParams.Get("Amenities")
	city := queryParams.Get("city")
	price, _ := strconv.Atoi(queryParams.Get("price"))
	bed_room, _ := strconv.Atoi(queryParams.Get("bed_room"))
	bath_room, _ := strconv.Atoi(queryParams.Get("bath_room"))

	propertys, err := h.PropertyRepository.FilterPropertys(typeRent, price, bed_room, bath_room, Amenities, city)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())
	}
	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: propertys}
	json.NewEncoder(w).Encode(response)
	fmt.Println(propertys)
}

func (h *handlerProperty) GetProperty(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	//params
	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	//get data
	property, err := h.PropertyRepository.GetProperty(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}
	//to view success get data
	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: property}
	json.NewEncoder(w).Encode(response)

}

func (h *handlerProperty) CreateProperty(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")
	// request
	price, _ := strconv.Atoi(r.FormValue("price"))
	bed_room, _ := strconv.Atoi(r.FormValue("bed_room"))
	bath_room, _ := strconv.Atoi(r.FormValue("bath_room"))
	// name_create_id, _ := strconv.Atoi(r.FormValue("name_create_id"))

	fmt.Println(r.FormValue("image"), "Hallo")
	request := propertydto.Create_Request_Property{
		Price:            price,
		Bed_Room:         bed_room,
		Bath_Room:        bath_room,
		Name_Property:    r.FormValue("name_property"),
		City:             r.FormValue("city"),
		Address_Property: r.FormValue("address_property"),
		Type_Of_Rent:     r.FormValue("type_of_rent"),
		Amenities:        r.FormValue("Amenities"),
		Date_Post:        r.FormValue("date_post"),
		Image_Property:   r.FormValue("image_property"),
		Description:      r.FormValue("description"),
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

	// image
	dataContex := r.Context().Value("Error")
	var filename string
	if dataContex == nil {
		// image
		dataContex := r.Context().Value("dataFile")
		filename = dataContex.(string)
	}
	// dataContex := r.Context().Value("dataFile") // add this code
	// filename := dataContex.(string)             // add this code
	// Add your Cloudinary credentials ...
	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	// Upload file to Cloudinary ...
	resp, err := cld.Upload.Upload(ctx, filename, uploader.UploadParams{Folder: "Hausy"})

	if err != nil {
		fmt.Println(err.Error())
	}
	property := models.Property{
		// Name_Create_Id:   request.Name_Create_Id,
		Price:            request.Price,
		Bed_Room:         request.Bed_Room,
		Bath_Room:        request.Bath_Room,
		Name_Property:    request.Name_Property,
		City:             request.City,
		Address_Property: request.Address_Property,
		Type_Of_Rent:     request.Type_Of_Rent,
		Amenities:        request.Amenities,
		Date_Post:        request.Date_Post,
		Description:      request.Description,
		Image_Property:   resp.SecureURL,
	}

	// store data
	data, err := h.PropertyRepository.CreateProperty(property)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// get data
	propertyGet, err := h.PropertyRepository.GetProperty(data.Id)
	propertyGet.Image_Property = os.Getenv("PATH_FILE") + propertyGet.Image_Property
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}
	// success
	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: convertPropertyResponse(propertyGet)}
	json.NewEncoder(w).Encode(response)
}

// Update data
func (h *handlerProperty) UpdateProperty(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// params
	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	// get data
	property, err := h.PropertyRepository.GetProperty(int(id))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}
	// validation
	if r.FormValue("name_property") != "" {
		property.Name_Property = r.FormValue("name_property")
	}
	Price, _ := strconv.Atoi(r.FormValue("price"))
	if Price != 0 {
		property.Price = Price
	}
	if r.FormValue("city") != "" {
		property.City = r.FormValue("city")
	}
	if r.FormValue("address_property") != "" {
		property.Address_Property = r.FormValue("address_property")
	}
	if r.FormValue("type_of_rent") != "" {
		property.Type_Of_Rent = r.FormValue("type_of_rent")
	}
	bed_room, _ := strconv.Atoi(r.FormValue("bed_room"))
	if bed_room != 0 {
		property.Bed_Room = bed_room
	}
	bath_room, _ := strconv.Atoi(r.FormValue("bath_room"))
	if bath_room != 0 {
		property.Bath_Room = bath_room
	}
	// date_tripInput, _ := time.Parse("2006-01-02", r.FormValue("date_trip"))
	// if date_tripInput.IsZero() {
	// 	date_trip := trip.Date_Trip
	// 	trip.Date_Trip = date_trip
	// }
	if r.FormValue("Amenities") != "" {
		property.Amenities = r.FormValue("Amenities")
	}
	if r.FormValue("Date_Post") != "" {
		property.Date_Post = r.FormValue("Date_Post")
	}
	if r.FormValue("Description") != "" {
		property.Description = r.FormValue("Description")
	}

	// image
	dataContex := r.Context().Value("Error")

	// fmt.Println(dataContex)
	if dataContex == nil {
		// image
		dataContex := r.Context().Value("dataFile")
		filename := dataContex.(string)
		property.Image_Property = filename
	}

	// update data
	data, err := h.PropertyRepository.UpdateProperty(property)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// get data
	propertyInserted, err := h.PropertyRepository.GetProperty(data.Id)
	propertyInserted.Image_Property = os.Getenv("PATH_FILE") + propertyInserted.Image_Property
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}
	// success
	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: convertPropertyResponse(propertyInserted)}
	json.NewEncoder(w).Encode(response)
}

func convertPropertyResponse(r models.Property) propertydto.Response_Property {
	return propertydto.Response_Property{
		Id:               r.Id,
		Price:            r.Price,
		Bed_Room:         r.Bed_Room,
		Bath_Room:        r.Bath_Room,
		Name_Property:    r.Name_Property,
		City:             r.City,
		Address_Property: r.Address_Property,
		Type_Of_Rent:     r.Type_Of_Rent,
		Amenities:        r.Amenities,
		Date_Post:        r.Date_Post,
		Image_Property:   r.Image_Property,
		Description:      r.Description,
	}
}
