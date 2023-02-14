package authdto

type Response_Login struct {
	Id        int    `json:"id"`
	Token     string `json:"token"`
	Full_Name string `json:"full_name" form:"full_name"`
	Email     string `json:"email" form:"email"`
	Status    string `json:"status" form:"status"`
	Phone     string `json:"phone" form:"phone"`
	Gender    string `json:"gender" form:"gender"`
}

type Resgister struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Status   string `json:"status"`
}
type CheckAuthResponse struct {
	Id       int    `json:"id"`
	Full_Name string `json:"full_name" form:"full_name"`
	Email     string `json:"email" form:"email"`
	Status    string `json:"status" form:"status"`
	Phone     string `json:"phone" form:"phone"`
	Gender    string `json:"gender" form:"gender"`
}
