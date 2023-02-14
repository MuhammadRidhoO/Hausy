import { useEffect, useState } from "react";
import { Form, Button, NavLink, Modal } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import '../ProfileUser.css'

function ProfileUser() {
    const Navigate = useNavigate()
    const [passwordUser, setPasswordUser] = useState(false)

    const handleLogin = () => setPasswordUser(true);
    const handleClose = () => setPasswordUser(false);

    const [edit, setEdit] = useState(false)

    const handleEdit = () => setEdit(true);
    const handleCloseEdit = () => setEdit(false);

    let { data: profiles } = useQuery("ProfileUserView", async () => {
        const response = await API.get("profile")
        return response.data.data
    })

    const [password, setPassword] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const handleChangePassword = (e) => {
        setPassword({
            ...password,
            [e.target.name]: e.target.value
        })
    }

    const handleUpdatePassword = useMutation(async (e) => {
        e.preventDefault()
        try {

            const response = await API.patch(`user-password/${profiles.id}`, password)
            console.log(response)

            Navigate("/")
        } catch (error) {
            console.log(error)
        }
    })

    const [formAddPhoto, setFormAddPhoto] = useState({
        image: "",
    });

    const handleChangePhoto = (e) => {
        e.preventDefault();
        setFormAddPhoto({
            ...formAddPhoto,
            [e.target.name]:
                e.target.type === "file" ? e.target.files : e.target.value,
        });
    };

    const handleSubmitUser = useMutation(async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            };
            const dataPhoto = new FormData();
            dataPhoto.set("image", formAddPhoto.image[0], formAddPhoto.image[0].name);

            const response = await API.patch(`/userr/${profiles?.id}`, dataPhoto, config);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    });
    const [profileResult, setProfileResult] = useState(null);
    const [editProfile, setEditProfile] = useState({
        full_name: "",
        user_name: "",
        phone: "",
        address: "",
        status: "",
        gender: ""
    });

    const handleChangeEditProfile = (e) => {
        e.preventDefault();
        setEditProfile({
            ...editProfile,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmitProfileUser = useMutation(async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            };
            const dataEditProfile = new FormData();
            dataEditProfile.set("full_name", editProfile.full_name);
            dataEditProfile.set("user_name", editProfile.user_name);
            dataEditProfile.set("phone", editProfile.phone);
            dataEditProfile.set("address", editProfile.address);
            dataEditProfile.set("gender", editProfile.gender);

            const response = await API.patch(`/userr/${profiles?.id}`, dataEditProfile, config);
            console.log(response);
            Navigate("/profile_user")
        } catch (error) {
            console.log(error);
        }
    });
    useEffect(() => {
        console.log("Efek 1");
      }, [editProfile.full_name]);
      
      useEffect(() => {
        console.log("Efek 2");
        return () => {
          console.log("Efek 2 cleanup");
        };
      }, [editProfile.user_name]);
      
      useEffect(() => {
        console.log("Efek 3");
      }, []);
    return (
        <>
            <div className="allinfoidentity">
                <div>
                    <div className="allidentityuser">
                        <div className="usersbuy">
                            <div className="allidentity" style={{ display: "flex", }}>
                                <div>
                                    <h3 className="personalinfo">Personal info</h3>
                                </div>
                                <div className="identity">
                                    <div className="preidentity">
                                        <div>
                                            <img src="/image/name.svg" alt=""></img>
                                        </div>
                                        <div className="ms-2">
                                            <h6>Full Name</h6>
                                            <p className="nameidentity">{profiles?.full_name}</p>
                                        </div>
                                    </div>
                                    <div className="preidentity">
                                        <div>
                                            <img src="/image/local_post_office.svg" alt=""></img>
                                        </div>
                                        <div className="ms-2">
                                            <h6>Email</h6>
                                            <p className="nameidentity">{profiles?.email}</p>
                                        </div>
                                    </div>
                                    <div className="preidentity">
                                        <div>
                                            <img src="/image/local_phone.svg" alt=""></img>
                                        </div>
                                        <div className="ms-2">
                                            <h6>Mobile Phone</h6>
                                            <p className="nameidentity">{profiles?.phone}</p>
                                        </div>
                                    </div>
                                    <div className="preidentity">
                                        <div>
                                            <img src="/image/place.svg" alt=""></img>
                                        </div>
                                        <div className="ms-2">
                                            <h6>Address</h6>
                                            <p className="nameidentity">{profiles?.address}</p>
                                        </div>
                                    </div>
                                    <div className="preidentity">
                                        <div>
                                            <img src="/image/address 1.svg" alt=""></img>
                                        </div>
                                        <div className="ms-2">
                                            <h6>Status</h6>
                                            <p className="nameidentity">{profiles?.status}</p>
                                        </div>
                                    </div>
                                    <div className="preidentity">
                                        <div>
                                            <img src="/image/gender.svg" alt=""></img>
                                        </div>
                                        <div className="ms-2">
                                            <h6>Gender</h6>
                                            <p className="nameidentity">{profiles?.gender}</p>
                                        </div>
                                    </div>
                                    <div className="preidentity">
                                        <div>
                                            <NavLink onClick={handleLogin} ><img src="/image/Vector (1).svg" alt=""></img></NavLink>
                                        </div>
                                        <Modal show={passwordUser} onHide={handleClose}>
                                            <Modal.Title className="text-center p-4">Change Password</Modal.Title>
                                            <Modal.Body>
                                                <Form onSubmit={(e) => handleUpdatePassword.mutate(e)}>
                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                        <Form.Label>Old Password</Form.Label>
                                                        <Form.Control
                                                            type="password"
                                                            name="oldPassword"
                                                            autoFocus
                                                            onChange={handleChangePassword}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                        <Form.Label>New Password</Form.Label>
                                                        <Form.Control
                                                            type="password"
                                                            name="newPassword"
                                                            autoFocus
                                                            onChange={handleChangePassword}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                        <Form.Label>Confirm Password</Form.Label>
                                                        <Form.Control
                                                            type="password"
                                                            name="confirmPassword"
                                                            autoFocus
                                                            onChange={handleChangePassword}
                                                        />
                                                    </Form.Group>
                                                    <div style={{display:"flex", justifyContent:"center" }}>
                                                        <Button type="submit" variant="primary" style={{ width: 300 }}
                                                        >
                                                            Save Changes
                                                        </Button>
                                                    </div>
                                                </Form>
                                            </Modal.Body>
                                            <Modal.Footer className="display-flex justify-content-center">
                                            </Modal.Footer>
                                        </Modal>
                                        <div className="ms-2">
                                            <h6>Password</h6>
                                            <p className="nameidentity">Change Password</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                <div>
                                    <img
                                        src={"http://localhost:5000/uploads/" + profiles?.image}
                                        alt=""
                                        className="imgsize"
                                        style={{ width: "370px", height: "470px", border: "1px solid white", borderRadius: 20 }}
                                    />
                                </div>
                                <label for="formFile" class="form-label"></label>
                                <Form onSubmit={(e) => handleSubmitUser.mutate(e)} style={{ display: "flex", flexDirection: "column" }} >
                                    <Button
                                        type="submit"
                                        onSubmit={handleChangePhoto}
                                        className="position-relative p-0 m-0"
                                        style={{ backgroundColor: "#5A57AB", width: "370px" }}
                                    >
                                        <input
                                            className="d-block position-absolute h-100 w-100"
                                            id="formFile"
                                            type="file"
                                            name="image"
                                            onChange={handleChangePhoto}
                                            style={{ cursor: "pointer", opacity: 0 }}

                                        />
                                        <span className="d-block py-2 px-3">
                                            Upload Image
                                        </span>
                                    </Button>
                                </Form>
                                <Button
                                    style={{ marginTop: 10, backgroundColor: "#5A57AB" }}
                                    onClick={handleEdit}
                                >
                                    Edit Profile
                                </Button>
                                <Modal show={edit} onHide={handleCloseEdit}>
                                    <Modal.Title className="text-center p-4">Profile {profiles?.user_name}</Modal.Title>
                                    <Modal.Body>
                                        <Form onSubmit={(e) => handleSubmitProfileUser.mutate(e)}>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Full Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="full_name"
                                                    autoFocus
                                                    onChange={handleChangeEditProfile}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>User name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="user_name"
                                                    autoFocus
                                                    onChange={handleChangeEditProfile}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Phone</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="phone"
                                                    autoFocus
                                                    onChange={handleChangeEditProfile}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Address</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="address"
                                                    autoFocus
                                                    onChange={handleChangeEditProfile}
                                                />
                                            </Form.Group>
                                            <Form.Label className="fw-bloder mt-2" type="number">
                                                Gender
                                            </Form.Label>
                                            <Form.Select
                                                aria-label="Default select example"
                                                name="gender"
                                                onChange={handleChangeEditProfile}
                                            >
                                                <option>Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </Form.Select>
                                            <Form.Group className="mb-3">
                                            </Form.Group>
                                            <div style={{ display: "flex", justifyContent: "center" }}>
                                                <Button type="submit" variant="primary" style={{ width: 300 }}
                                                    onClick={handleCloseEdit}
                                                >
                                                    Save Changes
                                                </Button>
                                            </div>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer className="display-flex justify-content-center">
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileUser;
