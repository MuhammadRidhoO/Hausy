
import { useContext, useState } from "react";
import { Container, FloatingLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";

function AddProperty() {
   const navigate = useNavigate()
   const [preview, setPreview] = useState(null)
   const [formAddPoperty, setFormAddPoperty] = useState({
      name_property: "",
      city: "",
      address_property: "",
      price: "",
      type_of_rent: "",
      bed_room: "",
      bath_room: "",
      date_post: "",
      image_property: "",
      description: ""
   });

   const [amenities, setAmenities] = useState([])

   const handleChangeAmenities = (event) => {
      const selectedItems = [...amenities];
      if (event.target.checked) {
         selectedItems.push(event.target.value);
      } else {
         selectedItems.splice(selectedItems.indexOf(event.target.value), 1);
      }
      setAmenities(selectedItems);
   };

   console.log(amenities)
   let amenitiesString = amenities.join("|")
   console.log(amenitiesString)


   const handleChangeAddPopertyAdmin = (e) => {
      setFormAddPoperty({
         ...formAddPoperty,
         [e.target.name]:
            e.target.type === 'file' ? e.target.files : e.target.value,
      });
   };
   console.log(formAddPoperty)

   const handleSubmitTrip = useMutation(async (e) => {
      e.preventDefault()
      try {
         const config = {
            headers: {
               // Authorrization:"Bearer " + localStorage.token,
               'Content-type': 'multipart/form-data'
            }
         }
         const dataProperty = new FormData();
         dataProperty.append('name_property', formAddPoperty.name_property)
         dataProperty.append('city', formAddPoperty.city)
         dataProperty.append('address_property', formAddPoperty.address_property)
         dataProperty.append('price', formAddPoperty.price)
         dataProperty.append('type_of_rent', formAddPoperty.type_of_rent)
         dataProperty.append('Amenities', amenitiesString)
         dataProperty.append('bed_room', formAddPoperty.bed_room)
         dataProperty.append('date_post', formAddPoperty.date_post)
         dataProperty.append('bath_room', formAddPoperty.bath_room)
         dataProperty.append('description', formAddPoperty.description)
         dataProperty.append('image_property', formAddPoperty.image_property[0])



         //   return
         const response = await API.post("/property", dataProperty, config);

         console.log(response)
         navigate('/')

      } catch (error) {
         console.log(error)
      }

   });

   return (
      <Container>
         <div>
            <div style={{ padding: "50px 0px 50px 0px" }}>
               <h1 style={{ marginTop: 80 }}>Add Poperty</h1>
            </div>
            <Form
               className="alltripadmin"
               onSubmit={(e) => handleSubmitTrip.mutate(e)}
            >
               <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                     name="name_property"
                     placeholder="Name_Property"
                     onChange={handleChangeAddPopertyAdmin}
                  />
               </Form.Group>
               <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Select
                     name="city"
                     placeholder="City"
                     onChange={handleChangeAddPopertyAdmin}
                  >
                     <option>--- Choice City ---</option>
                     <option>Tangerang</option>
                     <option>Jakarta</option>
                     <option>Depok</option>
                     <option>Bandung</option>
                     <option>Dubai</option>
                     <option>UK</option>
                     <option>USA</option>
                  </Form.Select>
               </Form.Group>
               <Form.Group className="mb-3" controlId="formBasicPassword">
                  <FloatingLabel controlId="floatingTextarea2" label="Address Poperty">
                     <Form.Control
                        as="textarea"
                        name="address_property"
                        onChange={handleChangeAddPopertyAdmin}
                        placeholder="Leave a comment here"
                        style={{ height: '100px' }}
                     />
                  </FloatingLabel>
               </Form.Group>
               <Form.Group className="mb-3">
                  <FloatingLabel label="Date Post">
                     <Form.Control
                        type="date"
                        name="date_post"
                        onChange={handleChangeAddPopertyAdmin}
                        style={{ height: '60px' }}
                     ></Form.Control>
                  </FloatingLabel>
               </Form.Group>
               <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                     type="text"
                     name="price"
                     placeholder="Price"
                     onChange={handleChangeAddPopertyAdmin}
                  />
               </Form.Group>
               <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                     type="text"
                     name="type_of_rent"
                     placeholder="Type_Of_Rent"
                     onChange={handleChangeAddPopertyAdmin}
                  />
               </Form.Group>
               <Form.Group>
                  <Form.Label style={{ fontWeight: "bold" }}> Amenities </Form.Label>
               </Form.Group>
               <Form.Group className="mb-3 d-flex" style={{ width: 500, justifyContent: "space-between" }} controlId="formBasicPassword">
                  <Form.Check
                     type="checkbox"
                     name="Amenities"
                     value="Furnished"
                     label="Furnished"
                     onChange={handleChangeAmenities}
                  />
                  <Form.Check
                     type="checkbox"
                     name="Amenities"
                     value="Pet Allowed"
                     label="Pet Allowed"
                     onChange={handleChangeAmenities}
                  />
                  <Form.Check
                     type="checkbox"
                     name="Amenities"
                     value="Shared Accomodation"
                     label="Shared Accomodation"
                     onChange={handleChangeAmenities}
                  />
               </Form.Group>
               <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Group>
                     <Form.Label style={{ fontWeight: "bold" }}> Bed_Room </Form.Label>
                  </Form.Group>
                  <Form.Select
                     name="bed_room"
                     placeholder="Bed_Room"
                     onChange={handleChangeAddPopertyAdmin}
                  >

                     <option>-</option>
                     <option>1</option>
                     <option>2</option>
                     <option>3</option>
                     <option>4</option>
                     <option>5</option>

                  </Form.Select>
               </Form.Group>
               <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Group>
                     <Form.Label style={{ fontWeight: "bold" }}> Bath_Room </Form.Label>
                  </Form.Group>
                  <Form.Select
                     name="bath_room"
                     placeholder="Stasiun Asal"
                     onChange={handleChangeAddPopertyAdmin}
                  >

                     <option>-</option>
                     <option>1</option>
                     <option>2</option>
                     <option>3</option>
                     <option>4</option>
                     <option>5</option>

                  </Form.Select>
               </Form.Group>
               <Form.Group className="mb-3" controlId="formBasicPassword">
                  <FloatingLabel controlId="floatingTextarea2" label="Description">
                     <Form.Control
                        as="textarea"
                        name="description"
                        onChange={handleChangeAddPopertyAdmin}
                        placeholder="Descraption"
                        style={{ height: '100px' }}
                     />
                  </FloatingLabel>
               </Form.Group>
               <Button
                  type="button"
                  //onSubmit={handleChangePhoto}
                  className="position-relative p-0 m-0"
                  style={{ backgroundColor: "#5A57AB", width: "140px" }}
               >
                  <input
                     className="d-block position-absolute h-100 w-100"
                     id="formFile"
                     type="file"
                     name="image_property"
                     onChange={handleChangeAddPopertyAdmin}
                     style={{ cursor: "pointer", opacity: 0 }}
                  />
                  <span className="d-block py-2 px-3">
                     Upload Image
                  </span>
               </Button>
               <div
                  style={{
                     width: "auto",
                     height: 40,
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "center",
                  }}
               >
                  <Button
                     variant="primary"
                     type="submit"
                     className="bg-success"
                     style={{
                        width: 300,
                        height: 40,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                     }}
                  // onSubmit={handleChangeAddPopertyAdmin}
                  >
                     Save
                  </Button>
               </div>
            </Form>
         </div>
      </Container>
   );
}

export default AddProperty;
