package repositories

import (
	"server/models"

	"gorm.io/gorm"
)

type UserRepository interface {
	FindUsers() ([]models.User_Tenant, error)
	GetUser(ID int) (models.User_Tenant, error)
	GetUserLogin(ID int) (models.User_Tenant, error)
	CreateUser(user_tenant models.User_Tenant) (models.User_Tenant, error)
	UpdateUser(user_tenant models.User_Tenant) (models.User_Tenant, error)
	UpdatePasswordUser(update_password_user_tenant models.User_Tenant) (models.User_Tenant, error)
	DeleteUser(user_tenant models.User_Tenant) (models.User_Tenant, error)

	// GetPassword(username string) (string, error)
	// UpdatePassword(username, password string) error
}

func RepositoryUser(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindUsers() ([]models.User_Tenant, error) {
	var user_tenant []models.User_Tenant
	err := r.db.Find(&user_tenant).Error

	return user_tenant, err
}

func (r *repository) GetUser(ID int) (models.User_Tenant, error) {
	var user_tenant models.User_Tenant
	err := r.db.First(&user_tenant, ID).Error

	return user_tenant, err
}

func (r *repository) GetUserLogin(ID int) (models.User_Tenant, error) {
	var user_tenant models.User_Tenant
	err := r.db.First(&user_tenant, ID).Error

	return user_tenant, err
}

func (r *repository) CreateUser(user_tenant models.User_Tenant) (models.User_Tenant, error) {
	err := r.db.Create(&user_tenant).Error

	return user_tenant, err
}

func (r *repository) UpdateUser(user_tenant models.User_Tenant) (models.User_Tenant, error) {
	err := r.db.Save(&user_tenant).Error

	return user_tenant, err
}
func (r *repository) UpdatePasswordUser(update_password_user_tenant models.User_Tenant) (models.User_Tenant, error) {
	err := r.db.Save(&update_password_user_tenant).Error

	return update_password_user_tenant, err
}
func (r *repository) DeleteUser(user_tenant models.User_Tenant) (models.User_Tenant, error) {
	err := r.db.Delete(&user_tenant).Error

	return user_tenant, err
}
