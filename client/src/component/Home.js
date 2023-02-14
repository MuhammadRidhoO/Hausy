import { Button, ButtonGroup, Col, Container, Form, Row, ToggleButton } from "react-bootstrap"
import '../Home1.css';
import { Link } from "react-router-dom";
import { FormatRupiah } from "@arismun/format-rupiah";
import { useQuery } from "react-query";
import { API, setAuthToken } from "../config/api";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UseContext";

function Home() {
   const [propertyData, setPropertyData] = useState(null)
   if (localStorage.token) {
      setAuthToken(localStorage.token)
   }
   const [state, dispatch] = useContext(UserContext)

   const [typeOfRentValue, setTypeOfRentValue] = useState("");
   const [amenitiesValue, setAmenitiesValue] = useState([]);
   const [priceValue, setPriceValue] = useState(0);
   const [bedRoomValue, setBedRoomValue] = useState(0);
   const [bathRoomValue, setBathRoomValue] = useState(0);

   const handleAmenityChange = (event) => {
      const selectedItems = [...amenitiesValue]
      if (event.target.checked) {
         selectedItems.push([event.target.value]);
      } else {
         selectedItems.splice(selectedItems.indexOf(event.target.value), 1);
      }
      setAmenitiesValue(selectedItems)
   };

   let amenitiesString = amenitiesValue.join("|")
   console.log(amenitiesString)

   let { data: properties } = useQuery("propertysCache", async () => {
      const response = await API.get("/propertys");
      setPropertyData(response.data.data)
      // if (state.city !== undefined) {
      //    setPropertyData(state.city)
      // } 
      // return response.data.data;
   });


   const HandleFilterButton = async () => {
      try {
         const response = await API.get(`/filterpropertys?type_of_rent=${typeOfRentValue}&price=${priceValue}&bed_room=${bedRoomValue}&bath_room=${bathRoomValue}&Amenities=${amenitiesString}`);
         setPropertyData(response.data.data)
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(()=>{
      setPropertyData(state.city)
   },[state.city])

   return (
      <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
         <Container fluid style={{ display: "flex", justifyContent: "space-between" }}>
            <Row style={{ width: "17%", height: "670px", padding: "20px 0px 0px 20px" }}>

               <div className="position-fixed" style={{ marginRight: 100, width: 280, height: 600, marginTop: 80 }}>
                  <div style={{ padding: "0px 0px 40px 0px" }}>
                     <p style={{ fontWeight: "bold" }}>Type of Rent</p>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                  </div>
                  <ButtonGroup style={{ marginTop: -65 }}>
                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: 256 }}>
                        <ToggleButton
                           id="Day"
                           type="radio"
                           variant="primary"
                           name="radio"
                           style={{ height: 38, width: 100 }}
                           value="Day"
                           className="me-2 rounded-3"
                           checked={typeOfRentValue === "Day"}
                           onChange={(e) => setTypeOfRentValue(e.currentTarget.value)}

                        >
                           Day
                        </ToggleButton>
                        <ToggleButton
                           id="Month"
                           type="radio"
                           variant="primary"
                           name="radio"
                           style={{ height: 38, width: 100 }}
                           value="Month"
                           className="me-2 rounded-3"
                           checked={typeOfRentValue === "Month"}
                           onChange={(e) => setTypeOfRentValue(e.currentTarget.value)}
                        >
                           Month
                        </ToggleButton>
                        <ToggleButton
                           id="Year"
                           type="radio"
                           variant="primary"
                           name="radio"
                           style={{ height: 38, width: 100 }}
                           value="Year"
                           checked={typeOfRentValue === "Year"}
                           onChange={(e) => setTypeOfRentValue(e.currentTarget.value)}
                           className="rounded-3"
                        >
                           Year
                        </ToggleButton>
                     </div>
                  </ButtonGroup>

                  <div style={{ marginTop: -30 }}>
                     <p style={{ fontWeight: "bold" }} className="mt-3">Date</p>
                     <div style={{ width: "100%", display: "flex", alignItems: "center", marginTop: -15 }}>
                        <img src="Calender.png" alt="" />
                        <input type="date" style={{ width: "256px", borderRadius: "10px" }} />
                     </div>
                  </div>
                  <div style={{ marginTop: -30 }}>
                     <div>
                        <p style={{ fontWeight: "bold" }} className="mt-5">Property Room</p>
                     </div>
                     <div>
                        <p className="mt-2">Bedroom</p>
                        <div className="d-flex" style={{ justifyContent: "space-between", marginTop: -12 }}>
                           <ButtonGroup className="mb-2" style={{ width: "256px" }}>
                              <ToggleButton
                                 id="1"
                                 type="radio"
                                 variant="primary"
                                 name="radio"
                                 value="1"
                                 className="me-3 rounded-3"
                                 checked={bedRoomValue === "1"}
                                 onChange={(e) => setBedRoomValue(e.currentTarget.value)}

                              >
                                 1
                              </ToggleButton>
                              <ToggleButton
                                 id="2"
                                 type="radio"
                                 variant="primary"
                                 name="radio"
                                 value="2"
                                 className="me-3 rounded-3"
                                 checked={bedRoomValue === "2"}
                                 onChange={(e) => setBedRoomValue(e.currentTarget.value)}
                              >
                                 2
                              </ToggleButton>
                              <ToggleButton
                                 id="3"
                                 type="radio"
                                 variant="primary"
                                 name="radio"
                                 value="3"
                                 checked={bedRoomValue === "3"}
                                 onChange={(e) => setBedRoomValue(e.currentTarget.value)}
                                 className="rounded-3 me-3"
                              >
                                 3
                              </ToggleButton>
                              <ToggleButton
                                 id="4"
                                 type="radio"
                                 variant="primary"
                                 name="radio"
                                 value="4"
                                 checked={bedRoomValue === "4"}
                                 onChange={(e) => setBedRoomValue(e.currentTarget.value)}
                                 className="rounded-3 me-3"
                              >
                                 4
                              </ToggleButton>
                              <ToggleButton
                                 id="5"
                                 type="radio"
                                 variant="primary"
                                 name="radio"
                                 value="5"
                                 checked={bedRoomValue === "5"}
                                 onChange={(e) => setBedRoomValue(e.currentTarget.value)}
                                 className="rounded-3"
                              >
                                 5
                              </ToggleButton>
                           </ButtonGroup>
                        </div>
                     </div>
                     <div>
                        <p className="mt-1">Bathroom</p>
                        <div className="d-flex" style={{ justifyContent: "space-between", marginTop: -12 }}>
                           <ButtonGroup className="mb-2" style={{ width: "256px" }}>
                              <ToggleButton
                                 id="bathroom1"
                                 type="radio"
                                 variant="primary"
                                 name="radio"
                                 value="1"
                                 className="me-3 rounded-3"
                                 checked={bathRoomValue === "1"}
                                 onChange={(e) => setBathRoomValue(e.currentTarget.value)}

                              >
                                 1
                              </ToggleButton>
                              <ToggleButton
                                 id="bathroom2"
                                 type="radio"
                                 variant="primary"
                                 name="radio"
                                 value="2"
                                 className="me-3 rounded-3"
                                 checked={bathRoomValue === "2"}
                                 onChange={(e) => setBathRoomValue(e.currentTarget.value)}
                              >
                                 2
                              </ToggleButton>
                              <ToggleButton
                                 id="bathroom3"
                                 type="radio"
                                 variant="primary"
                                 name="radio"
                                 value="3"
                                 checked={bathRoomValue === "3"}
                                 onChange={(e) => setBathRoomValue(e.currentTarget.value)}
                                 className="rounded-3 me-3"
                              >
                                 3
                              </ToggleButton>
                              <ToggleButton
                                 id="bathroom4"
                                 type="radio"
                                 variant="primary"
                                 name="radio"
                                 value="4"
                                 checked={bathRoomValue === "4"}
                                 onChange={(e) => setBathRoomValue(e.currentTarget.value)}
                                 className="rounded-3 me-3"
                              >
                                 4
                              </ToggleButton>
                              <ToggleButton
                                 id="bathroom5"
                                 type="radio"
                                 variant="primary"
                                 name="radio"
                                 value="5"
                                 checked={bathRoomValue === "5"}
                                 onChange={(e) => setBathRoomValue(e.currentTarget.value)}
                                 className="rounded-3"
                              >
                                 5
                              </ToggleButton>
                           </ButtonGroup>
                        </div>
                     </div>
                     <div>
                        <p style={{ fontWeight: "bold" }} className="mt-2">Amenities</p>
                        <div style={{ marginTop: -12 }}>
                           <div className="d-flex" style={{ justifyContent: "space-between" }}>
                              <label>Furnished</label>
                              <Form.Check aria-label="option 1" Value="Furnished" onChange={handleAmenityChange}
                              />
                           </div>
                           <div className="d-flex" style={{ justifyContent: "space-between" }}>
                              <label>Pet Allowed</label>
                              <Form.Check aria-label="option 2" Value="Pet Allowed" onChange={handleAmenityChange}
                              />
                           </div>
                           <div className="d-flex" style={{ justifyContent: "space-between" }}>
                              <label>Shared Accomodation</label>
                              <Form.Check aria-label="option 3" Value="Shared Accomodation" onChange={handleAmenityChange}
                              />
                           </div>
                        </div>
                     </div>
                     <div>
                        <p style={{ fontWeight: "bold" }} className="mt-3">Budget</p>
                        <div className="d-flex" style={{ justifyContent: "space-between" }}>
                           <p style={{ fontSize: 12 }}>Less then IDR :</p>
                           <input
                              type="number"
                              style={{ height: 20, width: 150 }}
                              id="value"
                              name="price"
                              value={priceValue}
                              onChange={(e) => setPriceValue(e.currentTarget.value)} />
                        </div>
                     </div>
                     <Button type="button" onClick={HandleFilterButton}>APPLY</Button>
                  </div>
               </div>
            </Row>
            <div className="home" style={{ padding: "20px 0px 20px 20px", marginTop: 80 }}>
               {propertyData?.map((a, b) => {
                  const Status_Amenities = a?.Amenities.split("|");
                  // console.log(Status_Amenities)
                  return (
                     <div>
                        <div style={{ width: 350, height: 280, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "30px 0px 30px 0px", backgroundColor: "white", borderRadius: 10 }}>
                           <div>
                              <Col
                                 md="6"
                              >
                                 <div className="position-relative">
                                    <Link to={`/detailHausy/${a.id}`}>
                                       <img
                                          src={a.image_property}
                                          alt=""
                                          style={{ width: 300, height: 180, borderRadius: 10 }}
                                       />
                                    </Link>
                                    <div style={{ top: "4px", left: "4px", position: "absolute", width: "300px" }}>
                                       {Status_Amenities?.map((c, d) => {
                                          // console.log(c)
                                          return (
                                             <span className="bg-white p-1 rounded-3 text-black me-2" style={{ fontSize: "12px", fontWeight: 600 }} >
                                                {c}
                                             </span>
                                          )
                                       })}
                                    </div>
                                 </div>
                              </Col>
                              <div style={{ width: 300 }}>
                                 <p style={{ fontSize: 12 }}><FormatRupiah value={a.price} /> / {a.type_of_rent}</p>
                                 <p style={{ marginTop: "-10px", fontSize: 9 }}>{a.bed_room} Beds, {a.bath_room} Baths, {a.area} City {a.city}</p>
                                 <p style={{ marginTop: "0px", fontSize: 9 }}>{a.address_property}</p>
                              </div>
                           </div>
                        </div>

                     </div>
                  )
               })}



            </div>
         </Container>
      </div >
   )
}
export default Home