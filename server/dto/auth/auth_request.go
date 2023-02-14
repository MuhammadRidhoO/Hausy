package authdto

type Request_Register struct {
	Full_Name string `json:"full_name" form:"full_name" validate:"required"`
	User_Name string `json:"user_name" form:"user_name" validate:"required"`
	Email     string `json:"email" form:"email" validate:"required"`
	Password  string `json:"password" form:"password" validate:"required"`
	Status    string `json:"status" form:"status" validate:"required"`
	Phone     string `json:"phone" form:"phone" validate:"required"`
	Address   string `json:"address" form:"address" validate:"required"`
	Gender    string `json:"gender" form:"gender" validate:"required"`
}

type Request_Login struct {
	// Id_User  uint   `json:"id_user" form:"id_user" validate:"required"`
	Email    string `json:"email" form:"email" validate:"required"`
	Password string `json:"password" form:"password" validate:"required"`
	Status string `json:"status" form:"status" validate:"required"`
}
