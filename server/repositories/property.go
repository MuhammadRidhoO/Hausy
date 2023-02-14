package repositories

import (
	"server/models"

	"gorm.io/gorm"
)

type PropertyRepository interface {
	FindPropertys() ([]models.Property, error)
	GetProperty(ID int) (models.Property, error)
	UpdateProperty(property models.Property) (models.Property, error)
	CreateProperty(property models.Property) (models.Property, error)
	DeleteProperty(property models.Property) (models.Property, error)
	FilterPropertys(type_of_rent string, price int, bed_room int, bath_room int, Amenities string, city string) ([]models.Property, error)
	FilterBar(city string, price int) ([]models.Property, error)
}

func RepositoryProperty(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindPropertys() ([]models.Property, error) {
	var propertys []models.Property
	err := r.db.Find(&propertys).Error
	// Preload("Name_Owner").Preload("Name_Owner.User_Name").
	return propertys, err
}

func (r *repository) GetProperty(ID int) (models.Property, error) {
	var property models.Property
	err := r.db.First(&property, ID).Error
	// Preload("Name_Owner").Preload("Name_Owner.User_Name").
	return property, err
}

func (r *repository) CreateProperty(property models.Property) (models.Property, error) {
	err := r.db.Create(&property).Error
	// Preload("Name_Owner").Preload("Name_Owner.User_Name").
	return property, err
}

func (r *repository) UpdateProperty(property models.Property) (models.Property, error) {
	err := r.db.Save(&property).Error

	return property, err
}

func (r *repository) FilterPropertys(type_of_rent string, price int, bed_room int, bath_room int, Amenities string, city string) ([]models.Property, error) {
	var propertys []models.Property
	var err error

	if type_of_rent != "" && price != 0 && bed_room != 0 && bath_room != 0 && Amenities != "" {
		err = r.db.Where("type_of_rent = ? AND price < ? AND bed_room = ? AND bath_room = ? AND Amenities = ?", type_of_rent, price, bed_room, bath_room, Amenities).Find(&propertys).Error

	} else if type_of_rent == "" && price != 0 && bed_room != 0 && bath_room != 0 && Amenities != "" {

		err = r.db.Where("price < ? AND bed_room = ? AND bath_room =? AND Amenities = ?", price, bed_room, bath_room, Amenities).Find(&propertys).Error

	} else if type_of_rent != "" && price == 0 && bed_room != 0 && bath_room != 0 && Amenities != "" {
		err = r.db.Where("type_of_rent = ? AND bed_room = ? AND bath_room = ? AND Amenities = ?", type_of_rent, bed_room, bath_room, Amenities).Find(&propertys).Error

	} else if type_of_rent != "" && price != 0 && bed_room == 0 && bath_room != 0 && Amenities != "" {
		err = r.db.Where("type_of_rent = ? AND price < ? AND bath_room = ? AND Amenities = ?", type_of_rent, price, bath_room, Amenities).Find(&propertys).Error

	} else if type_of_rent != "" && price != 0 && bed_room != 0 && bath_room == 0 && Amenities != "" {
		err = r.db.Where("type_of_rent = ? AND price < ? AND bed_room = ? AND Amenities = ? ", type_of_rent, price, bed_room, Amenities).Find(&propertys).Error

	} else if type_of_rent != "" && price != 0 && bed_room != 0 && bath_room != 0 && Amenities == "" {

		err = r.db.Where("type_of_rent = ? AND price < ? AND bed_room = ? AND bath_room = ?", type_of_rent, price, bed_room, bath_room).Find(&propertys).Error

	} else if type_of_rent == "" && price == 0 && bed_room != 0 && bath_room != 0 && Amenities != "" {

		err = r.db.Where("bed_room = ? AND bath_room = ? AND Amenities = ? ", bed_room, bath_room, Amenities).Find(&propertys).Error

	} else if type_of_rent != "" && price == 0 && bed_room == 0 && bath_room != 0 && Amenities != "" {

		err = r.db.Where("type_of_rent = ? AND bath_room = ? AND Amenities = ?", type_of_rent, bath_room, Amenities).Find(&propertys).Error

	} else if type_of_rent != "" && price != 0 && bed_room == 0 && bath_room == 0 && Amenities != "" {

		err = r.db.Where("price < ? AND bed_room = ? ", type_of_rent, price, Amenities).Find(&propertys).Error

	} else if type_of_rent != "" && price != 0 && bed_room != 0 && bath_room == 0 && Amenities == "" {

		err = r.db.Where("type_of_rent = ? AND price < ? AND bed_room = ?", type_of_rent, price, bed_room).Find(&propertys).Error

	} else if type_of_rent == "" && price != 0 && bed_room != 0 && bath_room != 0 && Amenities == "" {

		err = r.db.Where("price < ? AND bed_room = ? AND bath_room = ?", price, bed_room, bath_room).Find(&propertys).Error

	} else if type_of_rent == "" && price == 0 && bed_room == 0 && bath_room != 0 && Amenities != "" {

		err = r.db.Where("bath_room = ? AND Amenities = ?", bath_room, Amenities).Find(&propertys).Error

	} else if type_of_rent != "" && price == 0 && bed_room == 0 && bath_room == 0 && Amenities != "" {

		err = r.db.Where("type_of_rent = ? AND Amenities = ?", type_of_rent, Amenities).Find(&propertys).Error

	} else if type_of_rent != "" && price != 0 && bed_room == 0 && bath_room == 0 && Amenities == "" {

		err = r.db.Where("type_of_rent = ? AND price < ?", type_of_rent, price).Find(&propertys).Error

	} else if type_of_rent == "" && price != 0 && bed_room != 0 && bath_room == 0 && Amenities == "" {

		err = r.db.Where("price < ? AND bed_room = ?", price, bed_room).Find(&propertys).Error

	} else if type_of_rent == "" && price == 0 && bed_room != 0 && bath_room != 0 && Amenities == "" {

		err = r.db.Where("bed_room = ? AND bath_room = ?", bed_room, bath_room).Find(&propertys).Error

	} else if type_of_rent == "" && price == 0 && bed_room == 0 && bath_room == 0 && Amenities != "" {

		err = r.db.Where("Amenities = ?", Amenities).Find(&propertys).Error

	} else if type_of_rent != "" && price == 0 && bed_room == 0 && bath_room == 0 && Amenities == "" {

		err = r.db.Where("type_of_rent = ?", type_of_rent).Find(&propertys).Error

	} else if type_of_rent == "" && price != 0 && bed_room == 0 && bath_room == 0 && Amenities == "" {

		err = r.db.Where("price < ?", price).Find(&propertys).Error

	} else if type_of_rent == "" && price == 0 && bed_room != 0 && bath_room == 0 && Amenities == "" {

		err = r.db.Where("bed_room = ?", bed_room).Find(&propertys).Error

	} else if type_of_rent == "" && price == 0 && bed_room == 0 && bath_room != 0 && Amenities == "" {

		err = r.db.Where("bath_room = ?", bath_room).Find(&propertys).Error

	} else if type_of_rent == "" && price == 0 && bed_room == 0 && bath_room == 0 && Amenities == "" && city != "" {

		err = r.db.Where("bath_room = ?", bath_room).Find(&propertys).Error

	} else {
		err = r.db.Find(&propertys).Error

	}

	return propertys, err
}
func (r *repository) FilterBar(city string, price int) ([]models.Property, error) {
	var propertysfilter []models.Property
	var err error

	if city != "" && price != 0 {
		err = r.db.Where("city = ? AND price < ?", city, price).Find(&propertysfilter).Error

	} else if city == "" && price != 0 {
		err = r.db.Where("price < ?", price).Find(&propertysfilter).Error

	} else if city != "" && price == 0 {
		err = r.db.Where("city = ?", city).Find(&propertysfilter).Error

	} else {
		err = r.db.Find(&propertysfilter).Error

	}

	return propertysfilter, err
}

func (r *repository) DeleteProperty(property models.Property) (models.Property, error) {
	err := r.db.Delete(&property).Error

	return property, err
}
