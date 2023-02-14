package propertydto

type Response_Property struct {
	Id               int    `json:"id" form:"id"`
	Name_Property    string `json:"name_property" form:"name_property"`
	City             string `json:"city" form:"city"`
	Address_Property string `json:"address_property" form:"address_property"`
	Price            int    `json:"price" form:"price"`
	Type_Of_Rent     string `json:"type_of_rent" form:"type_of_rent"`
	Amenities        string `json:"Amenities" form:"Amenities"`
	Date_Post        string `json:"date_post" form:"date_post"`
	Bed_Room         int    `json:"bed_room" form:"bed_room"`
	Bath_Room        int    `json:"bath_room" form:"bath_room"`
	Description      string `json:"description" form:"description"`
	Image_Property   string `json:"image_property" form:"image_property"`
}
