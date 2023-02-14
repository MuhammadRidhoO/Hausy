package models

type Property struct {
	Id               int        `json:"id"`
	// Name_Create      Other_User `json:"name_create"`
	// Name_Create_Id   int        `json:"name_create_id"`
	Name_Property    string     `json:"name_property"`
	City             string     `json:"city"`
	Address_Property string     `json:"address_property"`
	Price            int        `json:"price"`
	Type_Of_Rent     string     `json:"type_of_rent"`
	Date_Post        string     `json:"date_post"`
	Amenities        string     `json:"Amenities"`
	Bed_Room         int        `json:"bed_room"`
	Bath_Room        int        `json:"bath_room"`
	Description      string     `json:"description"`
	Image_Property   string     `json:"image_property"`
}

func (Property) TableName() string {
	return "properties"
}
