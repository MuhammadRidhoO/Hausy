package userdto

type Response_User struct {
	Id        int    `json:"id" form:"id"`
	Full_Name string `json:"full_name" form:"full_name"`
	User_Name string `json:"user_name" form:"user_name"`
	Email     string `json:"email" form:"email"`
	Password  string `json:"password" form:"password"`
	Status    string `json:"status" form:"status"`
	Gender    string `json:"gender" form:"gender"`
	Address   string `json:"address" form:"address"`
	Image     string `json:"image" form:"image"`
}
type Response_Update_User struct {
	Id               int    `json:"id" form:"id"`
	Full_Name        string `json:"full_name" form:"full_name"`
	User_Name        string `json:"user_name" form:"user_name"`
	Email            string `json:"email" form:"email"`
	Password         string `json:"password" form:"password"`
	New_Password     string `json:"new_password" form:"new_password"`
	Confirm_Password string `json:"confirm_password" form:"confirm_password"`
	Status           string `json:"status" form:"status"`
	Gender           string `json:"gender" form:"gender"`
	Address          string `json:"address" form:"address"`
	Image            string `json:"image" form:"image"`
}
type DeleteResponseUser struct {
	Id int `json:"id" form:"id"`
}
