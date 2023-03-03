import { useContext, useEffect, useState } from 'react';
import { Button, Dropdown, Form, InputGroup, Modal } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../config/api';
import { UserContext } from '../context/UseContext';
import UserDropdown from '../../src/image/User.jpg'

function Navbarr() {
   const { id } = useParams()
   const navigator = useNavigate();
   const [login, setLogin] = useState(false);

   const handleClose = () => setLogin(false);

   const handleLogin = () => setLogin(true);

   const [register, setRegister] = useState(false);

   const handleCloseRegister = () => setRegister(false);
   const handleRegister = () => setRegister(true)
   let { data: profiles, refetch: imageRefetch } = useQuery("ProfileUserViewNavbar", async () => {
      const response = await API.get("profile")
      return response.data.data
   })
   imageRefetch()

   const [signUp, setSignUp] = useState({
      full_name: "",
      user_name: "",
      email: "",
      password: "",
      phone: "",
      gender: "",
      status: "",
      address: ""
   })

   const handleChangeSignUp = (e) => {
      setSignUp({
         ...signUp,
         [e.target.name]: e.target.value,
      })
   }

   const handleSignUp = useMutation(async (e) => {
      try {
         e.preventDefault()

         const response = await API.post("/register", signUp)
         if (response === "") {
            alert("Please Resgister Until Done")
            console.log(response)
         }
         if (response.data.code === 200) {
            alert("Congratulations you have the new account")
            setRegister(false)
            setLogin(true)
            setSignUp({
               full_name: "",
               user_name: "",
               email: "",
               password: "",
               phone: "",
               gender: "",
               status: "",
               address: "",
               // image: ""
            })
         }

      } catch (error) {
         console.log(error)
      }
   })


   const [state, dispatch] = useContext(UserContext)
   const [signIn, setSignIn] = useState({
      email: "",
      password: "",
      // status:""
   })
   const handleChangeSignIn = (e) => {
      setSignIn({
         ...signIn,
         [e.target.name]: e.target.value
      })
   }
   const handleSubmitLogin = useMutation(async (e) => {
      try {
         e.preventDefault()

         const responseSignIn = await API.post("/login", signIn)
         dispatch({
            type: "LOGIN_SUCCESS",
            payload: responseSignIn.data.data,
         })
         // console.log(responseSignIn.data.data, "Hallo Login")
         alert("Login Berhasil")
         if (localStorage.status === "Owner") {
            navigator("/")
         } else {
            navigator("/")
         }
      } catch (error) {
         alert("Login Gagal")
         console.log(error)
      }
   })

   const [barCity, setBarCity] = useState(null)
   const [city, setCity] = useState("")

   let { data: propertyss } = useQuery("propertycityfiltersCache", async () => {
      const response = await API.get("/propertys");
      setBarCity(response.data.data)
      return response.data.data;
   });

   const HandleFilterCityButton = async () => {
      try {
         const response = await API.get(`/filterbar?city=${city}`)
         console.log(response)
         setBarCity(response.data.data)
         dispatch({
            type: "CITY",
            payload: state.user,
            cityPayload: response.data.data,
            thatTrue: state.isLogin
         })
      } catch (error) {
         console.log(error)
      }
   }
   // console.log(state.user.status)
   const handleLogOut = (e) => {
      e.preventDefault()
      dispatch({
         type: "LOGOUT"
      })
      navigator("/")
   }


   return (
      <div style={{ position: "fixed", width: "100%", zIndex: 99 }}>
         <Navbar bg="light" expand="lg">
            <Container className='d-flex justify-content-space-between alignItems-center'>
               <div>
                  <Navbar.Brand href="/" ><img src="/image/LogoHousy.png" alt=''></img></Navbar.Brand>
               </div>
               <div>
                  <Navbar.Collapse id="basic-navbar-nav">
                     <Nav className="me-auto">
                        {state.user.status !== "Owner" ? (
                           <div style={{ display: "flex", height: "40px", backgroundColor: "white", boder: "1px solid black" }}>
                              <InputGroup className="mb-3">
                                 <Form.Control
                                    style={{ height: "40px", width: "400px" }}
                                    type="text"
                                    placeholder='Search...'
                                    name='city'
                                    value={city}
                                    onChange={(e) => setCity(e.currentTarget.value)}
                                    id="value"
                                 />
                              </InputGroup>

                              <Button
                                 style={{ backgroundColor: "white", border: "1px solid gray", height: "40px" }}
                                 type="button"
                                 onClick={HandleFilterCityButton}>
                                 <img src="/image/Pencariaann.svg" alt=""></img>
                              </Button>

                           </div>

                        ) : (
                           <></>
                        )}
                     </Nav>
                  </Navbar.Collapse>
               </div>
               <div>
                  {localStorage.getItem("token") ? (
                     <Dropdown>
                        <Dropdown.Toggle
                           variant=""
                           id="dropdown-basic"
                           className="border-0"
                        >
                            {(() => {
                              if (profiles?.image !== "") {
                                 return (
                                    <img
                                       src={profiles?.image}
                                       alt=""
                                       style={{
                                          borderRadius: 40,
                                          height: 50,
                                          width: 50,
                                          fontSize: 24,
                                          color: "Red",
                                          border: "3px solid black"
                                       }}
                                    />
                                 )
                              } else {
                                 return (
                                    <img
                                       src={UserDropdown}
                                       alt=""
                                       style={{
                                          borderRadius: 40,
                                          height: 50,
                                          width: 50,
                                          fontSize: 24,
                                          color: "Blue",
                                          border: "3px solid black"
                                       }}
                                    />
                                 )
                              }
                           })()}
                        </Dropdown.Toggle>
                        {state.user.status === "Owner" ? (
                           <Dropdown.Menu>
                              <Dropdown.Item href='/indexadmin'>
                                 <img src="/image/ListHousy.png" alt="" style={{ width: 40, height: 40 }}></img> List Poperty
                              </Dropdown.Item>
                              <Dropdown.Item href='/profile_owner'>
                                 <img src="/image/UserHausy.svg" alt=""></img> Profile
                              </Dropdown.Item>
                              <Dropdown.Item href='/addpoperty'>
                                 <img src="/image/AddProperty.svg" alt=""></img> Add Poperty
                              </Dropdown.Item>
                              <Dropdown.Item>
                                 <img src="/image/CalenderHausy.svg" alt=""></img> History
                              </Dropdown.Item>
                              <hr></hr>
                              <Dropdown.Item
                                 onClick={handleLogOut}
                              >
                                 <img src="/image/LogoutHausy.svg" alt=""></img> Logout
                              </Dropdown.Item>
                           </Dropdown.Menu>

                        ) : (
                           <Dropdown.Menu>
                              <Dropdown.Item href={`/profile_user`}>
                                 <img src="/image/UserHausy.svg" alt=""></img> Profile
                              </Dropdown.Item>
                              {/* <Dropdown.Item href={"/myticketpending"} >
                                 <img src="/image/BillHausy.svg" alt=""></img> My Booking
                              </Dropdown.Item> */}
                              <Dropdown.Item href={`/myticketapprove`}>
                                 <img src="/image/CalenderHausy.svg" alt=""></img> History
                              </Dropdown.Item>
                              <hr></hr>
                              <Dropdown.Item
                                 onClick={handleLogOut}
                              >
                                 <img src="/image/LogoutHausy.svg" alt=""></img> Logout
                              </Dropdown.Item>
                           </Dropdown.Menu>
                        )}
                     </Dropdown>
                  ) : (
                     <div>
                        <Button variant="primary" className='me-2' show={login} onClick={handleLogin}>Sign In</Button>
                        <Modal show={login} onHide={handleClose} size="sm">
                           <Modal.Header>
                              <Modal.Title>Sign In</Modal.Title>
                           </Modal.Header>
                           <Modal.Body>
                              <Form onSubmit={(e) => handleSubmitLogin.mutate(e)}>
                                 <Form.Group className="mb-3">
                                    <Form.Label className="fw-bloder">Email</Form.Label>
                                    <Form.Control
                                       type="email"
                                       name="email"
                                       onChange={handleChangeSignIn}
                                    />
                                 </Form.Group>
                                 <Form.Group className="mb-3">
                                    <Form.Label className="fw-bloder">
                                       Password
                                    </Form.Label>
                                    <Form.Control
                                       type="password"
                                       name="password"
                                       onChange={handleChangeSignIn}
                                    />
                                 </Form.Group>
                                 {/* <Form.Group className="mb-3">
                                            <Form.Label className="fw-bloder">
                                                Status
                                            </Form.Label>
                                            <Form.Select
                                                type="text"
                                                name="status"
                                                onChange={handleChangeSignIn}
                                            >
                                                <option>--- Pilih ---</option>
                                                <option name="Tenant">Tenant</option>
                                                <option name="Owner">Owner</option>
                                            </Form.Select>
                                        </Form.Group> */}
                                 <Modal.Footer className="buttonlogin">
                                    <Button
                                       type="submit"
                                       variant="primary"
                                       className="buttonloginacc"
                                       onClick={handleClose}
                                       style={{ width: "100%" }}
                                    >
                                       Sign In
                                    </Button>
                                 </Modal.Footer>
                              </Form>
                           </Modal.Body>

                           <div className="noticeregister">
                              <p className="noticeme">
                              </p>
                           </div>
                        </Modal>

                        <Button variant="primary" show={register}
                           onClick={handleRegister}>Sign Up</Button>

                        <Modal show={register} onHide={handleCloseRegister} size="md">
                           <Modal.Header style={{ display: "flex", justifyContent: "center" }}>
                              <Modal.Title>Sign Up</Modal.Title>
                           </Modal.Header>

                           <Modal.Body>
                              <Form onClick={(e) => handleSignUp.mutate(e)}>
                                 <Form.Group className="mb-3">
                                    <Form.Label className="fw-bloder">Full Name</Form.Label>
                                    <Form.Control
                                       type="text"
                                       name="full_name"
                                       onChange={handleChangeSignUp}
                                    />
                                 </Form.Group>
                                 <Form.Group className="mb-3">
                                    <Form.Label className="fw-bloder">User Name</Form.Label>
                                    <Form.Control
                                       type="text"
                                       name="user_name"
                                       onChange={handleChangeSignUp}
                                    />
                                 </Form.Group>
                                 <Form.Group className="mb-3">
                                    <Form.Label className="fw-bloder">Email</Form.Label>
                                    <Form.Control
                                       type="email"
                                       name="email"
                                       onChange={handleChangeSignUp}
                                    />
                                 </Form.Group>

                                 <Form.Group className="mb-3">
                                    <Form.Label className="fw-bloder">Password</Form.Label>
                                    <Form.Control
                                       type="password"
                                       name="password"
                                       onChange={handleChangeSignUp}
                                    />
                                 </Form.Group>
                                 <Form.Group className="mb-3">
                                    <Form.Label className="fw-bloder" type="number">
                                       Phone
                                    </Form.Label>
                                    <Form.Control
                                       type="number"
                                       name="phone"
                                       onChange={handleChangeSignUp}
                                    />

                                    <Form.Label className="fw-bloder mt-4" type="number">
                                       List As
                                    </Form.Label>
                                    <Form.Select
                                       aria-label="Default select example"
                                       name="status"
                                       onChange={handleChangeSignUp}
                                    >
                                       <option>-- Pilih --</option>
                                       <option value="Tenant">Tenant</option>
                                       <option value="Owner">Owner</option>
                                    </Form.Select>
                                    <Form.Label className="fw-bloder mt-4" type="number">
                                       Gender
                                    </Form.Label>
                                    <Form.Select
                                       aria-label="Default select example"
                                       name="gender"
                                       onChange={handleChangeSignUp}
                                    >
                                       <option>Gender</option>
                                       <option value="Male">Male</option>
                                       <option value="Female">Female</option>
                                    </Form.Select>
                                 </Form.Group>
                                 <Form.Group className="mb-3">
                                    <Form.Label className="fw-bloder">Address</Form.Label>
                                    <Form.Control
                                       as="textarea"
                                       name="address"
                                       onChange={handleChangeSignUp}
                                    />
                                 </Form.Group>
                                 {/* <Form.Group className="mb-3">
                                    <Form.Label className="fw-bloder">Photo Profile </Form.Label>
                                    <Form.Control
                                       name="image"
                                       type='file'
                                       onChange={handleChangeSignUp}
                                    />
                                 </Form.Group> */}
                                 <Modal.Footer className="buttonlogin">
                                    <Button
                                       type="submit"
                                       variant="primary"
                                       className="buttonloginacc"
                                       onClick={handleCloseRegister}
                                       style={{ width: 500, backgroundColor: "#5A57AB" }}
                                    >
                                       Sign Up
                                    </Button>
                                 </Modal.Footer>
                              </Form>
                           </Modal.Body>
                        </Modal>
                     </div>
                  )}
               </div>
            </Container>
         </Navbar>
      </div>
   );
}

export default Navbarr;