package transactiondto

import "server/models"

type Response_Transaction struct {
	Id             int                `json:"id" form:"id"`
	Check_In       string             `json:"check_in" form:"check_in"`
	Check_Out      string             `json:"check_out" form:"check_out"`
	Property       models.Property    `json:"property" form:"property"`
	User           models.User_Tenant `json:"user" form:"user"`
	Total          int                `json:"total" form:"total"`
	Status_Payment string             `json:"status_payment" form:"status_payment"`
	// Image_Payment  string             `json:"image_payment" form:"image_payment"`
}
