package propertydto

type Create_Request_Property struct {
	// Name_Create_Id   int    `json:"name_create_id" form:"name_create_id" validate:"required"`
	Name_Property    string `json:"name_property" form:"name_property" validate:"required"`
	City             string `json:"city" form:"city" validate:"required"`
	Address_Property string `json:"address_property" form:"address_property" validate:"required"`
	Price            int    `json:"price" form:"price" validate:"required"`
	Type_Of_Rent     string `json:"type_of_rent" form:"type_of_rent" validate:"required"`
	Amenities        string `json:"Amenities" form:"Amenities" validate:"required"`
	Date_Post        string `json:"date_post" form:"date_post" validate:"required"`
	Bed_Room         int    `json:"bed_room" form:"bed_room" validate:"required"`
	Bath_Room        int    `json:"bath_room" form:"bath_room" validate:"required"`
	Description      string `json:"description" form:"description" validate:"required"`
	Image_Property   string `json:"image_property" form:"image_property"`
}
type Update_Request_Property struct {
	// Name_Create_Id   int    `json:"name_create_id" form:"name_create_id" validate:"required"`
	Name_Property    string `json:"name_property" form:"name_property"`
	City             string `json:"city" form:"city"`
	Address_Property string `json:"address_property" form:"address_property"`
	Price            int    `json:"price" form:"price"`
	Type_Of_Rent     string `json:"type_of_rent" form:"type_of_rent"`
	Amenities        string `json:"Amenities" form:"Amenities"`
	Date_Post        string `json:"date_post" form:"date_post" validate:"required"`
	Bed_Room         int    `json:"bed_room" form:"bed_room"`
	Bath_Room        int    `json:"bath_room" form:"bath_room"`
	Description      string `json:"description" form:"description"`
	Image_Property   string `json:"image_property" form:"image_property"`
}
