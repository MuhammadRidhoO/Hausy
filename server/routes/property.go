package routes

import (
	"server/handlers"
	"server/pkg/middleware"
	"server/pkg/mysql"
	"server/repositories"

	"github.com/gorilla/mux"
)

func PropertyRoutes(r *mux.Router) {
	propertyRepository := repositories.RepositoryProperty(mysql.DB)
	h := handlers.HandlerProperty(propertyRepository)

	r.HandleFunc("/propertys",h.FindPropertys).Methods("GET")
	r.HandleFunc("/filterpropertys",h.FilterPropertys).Methods("GET")
	r.HandleFunc("/filterbar",h.FilterBar).Methods("GET")
	r.HandleFunc("/property/{id}",h.GetProperty).Methods("GET")
	r.HandleFunc("/property", middleware.Auth(middleware.UploadFile(h.CreateProperty, "image_property"))).Methods("POST")
	r.HandleFunc("/propertyr/{id}", middleware.Auth(middleware.UploadFile(h.UpdateProperty, "image_property"))).Methods("PATCH")
}
