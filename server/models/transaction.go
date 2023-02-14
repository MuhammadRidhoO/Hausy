package models

type Transaction_Property struct {
	Id             int         `json:"id"`
	Status_Payment string      `json:"status_payment"`
	Check_In       string      `json:"check_in"`
	Check_Out      string      `json:"check_out"`
	Property_Id    int         `json:"property_id"`
	Property       Property    `json:"property"`
	User_Id        int         `json:"user_id"`
	User           User_Tenant `json:"user"`
	Total          int         `json:"total"`
}

func (Transaction_Property) TableName() string {
	return "transactions"
}
