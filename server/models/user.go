package models

type User_Tenant struct {
	Id               int    `json:"id"`
	Full_Name        string `json:"full_name"`
	User_Name        string `json:"user_name"`
	Email            string `json:"email"`
	Password         string `json:"password"`
	Old_Password     string `json:"oldPassword"`
	New_Password     string `json:"newPassword"`
	Confirm_Password string `json:"confirmPassword"`
	Status           string `json:"status"`
	Gender           string `json:"gender"`
	Phone            string `json:"phone"`
	Address          string `json:"address"`
	Image            string `json:"image"`
}
// type Other_User struct {
// 	Id   int    `json:"id"`
// 	Name string `json:"name"`
// }

func (User_Tenant) TableName() string {
	return "users"
}
