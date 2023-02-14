package userdto

type Create_Request_User struct {
	Full_Name string `json:"full_name" form:"full_name"`
	User_Name string `json:"user_name" form:"user_name"`
	Email     string `json:"email" form:"email"`
	Password  string `json:"password" form:"password" validate:"required"`
	Status    string `json:"status" form:"status"`
	Gender    string `json:"gender" form:"gender"`
	Phone     string `json:"phone" form:"phone"`
	Address   string `json:"address" form:"address"`
	Image     string `json:"image" form:"image"`
}
type Update_Request_User struct {
	Full_Name        string `json:"full_name" form:"full_name"`
	User_Name        string `json:"user_name" form:"user_name"`
	Email            string `json:"email" form:"email"`
	Password         string `json:"password" form:"password"`
	Old_Password     string `json:"oldPassword" form:"oldPassword"`
	New_Password     string `json:"newPassword" form:"newPassword"`
	Confirm_Password string `json:"confirmPassword" form:"confirmPassword"`
	Status           string `json:"status" form:"status"`
	Gender           string `json:"gender" form:"gender"`
	Phone            string `json:"phone" form:"phone"`
	Address          string `json:"address" form:"address"`
	Image            string `json:"image" form:"image"`
}