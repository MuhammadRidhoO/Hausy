package repositories

import (
	"server/models"

	"gorm.io/gorm"
)

type TransactionRepository interface {
	FindTransactions() ([]models.Transaction_Property, error)
	GetTransaction(ID int) (models.Transaction_Property, error)
	GetOneTransaction(ID string) (models.Transaction_Property, error)
	CreateTransaction(transactions models.Transaction_Property) (models.Transaction_Property, error)
	UpdateTransaction(status string, transaction models.Transaction_Property) error
	ChangeTransaction(transaction models.Transaction_Property) (models.Transaction_Property, error)
	DeleteTransaction(transaction models.Transaction_Property) (models.Transaction_Property, error)
}

func RepositoryTransaction(db *gorm.DB) *repository {
	return &repository{db}
}
// func (r *repository) updatePropertyStatus(propertyID, status_payment string) error {
// 	// koneksi ke database
// 	db, err := r.db.Open("mysql", "user:password@/dbname")
// 	if err != nil {
// 		return err
// 	}
// 	defer db.Close()

// 	// membuat perintah SQL untuk mengubah status property
// 	query := fmt.Sprintf("UPDATE properties SET status = '%s' WHERE id = '%s'", status_payment, propertyID)

// 	// mengeksekusi perintah
// 	_, err = db.Exec(query)
// 	if err != nil {
// 		return err
// 	}

// 	return nil
// }

func (r *repository) FindTransactions() ([]models.Transaction_Property, error) {
	var transactions []models.Transaction_Property
	err := r.db.Preload("Property").Preload("User").Find(&transactions).Error

	return transactions, err
}

func (r *repository) GetTransaction(ID int) (models.Transaction_Property, error) {
	var transactions models.Transaction_Property
	err := r.db.Preload("Property").Preload("User").Find(&transactions, "id = ?", ID).Error

	// err := r.db.Raw("SELECT * FROM transactions WHERE user_id=?", ID).Scan(&transactions).Error

	return transactions, err
}

func (r *repository) GetOneTransaction(ID string) (models.Transaction_Property, error) {
	var transactions models.Transaction_Property
	err := r.db.Preload("Property").Preload("User").First(&transactions, ID).Error

	return transactions, err
}

func (r *repository) CreateTransaction(transaction models.Transaction_Property) (models.Transaction_Property, error) {
	err := r.db.Preload("Property").Preload("User").Create(&transaction).Error

	return transaction, err
}

func (r *repository) UpdateTransaction(status string, transaction models.Transaction_Property) error {
	if status != transaction.Status_Payment && status == "success" {
		var property models.Property
		r.db.First(&property, transaction.Property.Id)
		r.db.Model(&property).Updates(property)
	}
	transaction.Status_Payment = status
	err := r.db.Preload("Property").Preload("User").Model(&transaction).Updates(transaction).Error

	return err
}

func (r *repository) ChangeTransaction(transaction models.Transaction_Property) (models.Transaction_Property, error) {
	err := r.db.Model(&transaction).Updates(transaction).Error

	return transaction, err
}

func (r *repository) DeleteTransaction(transaction models.Transaction_Property) (models.Transaction_Property, error) {
	err := r.db.Delete(&transaction).Error

	return transaction, err
}
