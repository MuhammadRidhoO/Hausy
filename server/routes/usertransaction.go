package routes

import (
	handlers "server/handlers"
	"server/pkg/mysql"
	"server/repositories"

	"github.com/gorilla/mux"
)

func UserTrcRoutes(r *mux.Router) {
	usertrcRepository := repositories.RepositoryUserTrc(mysql.DB)
	h := handlers.HandlerUsertrc(usertrcRepository)

	r.HandleFunc("/user-transactions/{id}", h.FindUserTrc).Methods("GET")

}
