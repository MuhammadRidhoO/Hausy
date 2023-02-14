package repositories

import (
	"server/models"

	"gorm.io/gorm"
)

type AuthRepository interface {
	Register(user_tenant models.User_Tenant) (models.User_Tenant, error)
	Login(email string) (models.User_Tenant, error)
	CheckOut(ID int) (models.User_Tenant, error)
}

func RepositoryAuth(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) Register(user_tenant models.User_Tenant) (models.User_Tenant, error) {
	err := r.db.Create(&user_tenant).Error

	return user_tenant, err
}

func (r *repository) Login(email string) (models.User_Tenant, error) {
	var user_tenant models.User_Tenant
	err := r.db.First(&user_tenant, "email=?", email).Error

	return user_tenant, err
}

func (r *repository) CheckOut(ID int) (models.User_Tenant, error) {
	var user_tenant models.User_Tenant
	err := r.db.First(&user_tenant, ID).Error

	return user_tenant, err
}
