package repositories

import (
	"server/models"

	"gorm.io/gorm"
)

type UserTrcRepository interface {
	FindUserTrc(ID int) ([]models.Transaction_Property, error)
	// GetUser(ID int) (models.User, error)
	// CreateUser(user models.User) (models.User, error)
	// UpdateUser(user models.User) (models.User, error)
	// DeleteUser(user models.User) (models.User, error)
}

func RepositoryUserTrc(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindUserTrc(ID int) ([]models.Transaction_Property, error) {
	var transaction_propertys []models.Transaction_Property
	err := r.db.Preload("Property").Preload("User").Where("user_id =?", ID).Find(&transaction_propertys).Error

	// err := r.db.Preload("Trip").Raw("SELECT * FROM Transaction_Propertys WHERE user_id=?", ID).Scan(&Transaction_Propertys).Error

	return transaction_propertys, err
}