package transactiondto

type Request_Transaction struct {
	Check_In       string `json:"check_in" form:"check_in" validate:"required"`
	Check_Out      string `json:"check_out" form:"check_out" validate:"required"`
	Total          int    `json:"total" form:"total"`
	User_Id        int    `json:"user_id" form:"user_id"`
	Property_Id     int    `json:"property_id" form:"property_id"`
	Status_Payment string `json:"status_payment" form:"status_payment" validate:"required"`
	// Image_Payment  string `json:"image_payment" form:"image_payment"`
}
