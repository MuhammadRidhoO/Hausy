package routes

// import (
// 	"server/handlers"
// 	"server/pkg/middleware"
// 	"server/pkg/mysql"
// 	"server/repositories"

// 	"github.com/gorilla/mux"
// )

// func ProfileRoutes(r *mux.Router) {
// 	profileRepository := repositories.RepositoryProfile(mysql.DB)
// 	h := handlers.HandlerProfile(profileRepository)

// 	r.HandleFunc("/profiles", middleware.Auth(h.FindProfiles)).Methods("GET")
// 	r.HandleFunc("/profile/{id}", middleware.Auth(h.GetProfile)).Methods("GET")
// 	r.HandleFunc("/profile", middleware.Auth(middleware.UploadFile(h.CreateProfile, "image"))).Methods("POST")
// 	r.HandleFunc("/profile/{id}", middleware.Auth(middleware.UploadFile(h.UpdateProfile, "image"))).Methods("PATCH")
// }
