// import { FormatRupiah } from "@arismun/format-rupiah";
import { Button, Form, Modal } from "react-bootstrap"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { FormatRupiah } from "@arismun/format-rupiah"
import { useMutation, useQuery } from "react-query"
import { API } from "../config/api"

function Detail({ setCheckHotel, checkHotel }) {
    const { id } = useParams()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let { data: propertys } = useQuery("Property", async () => {
        const response = await API.get("property/" + id)
        return response.data.data
    })
    let { data: users } = useQuery("UserProperty", async () => {
        const response = await API.get("/user/" + id)
        return response.data.data
    })
    // console.log(users)
    // console.log(property)

    const handleCheckInAndOut = (e) => {
        setCheckHotel({
            ...checkHotel,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "50px 0px 0px 0px" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop:"120px" }}>
                    <div>
                        <img style={{ width: 1000, height: 500 }}
                            src={propertys?.image_property}
                            alt=""
                        ></img>
                    </div>
                    <div>
                        <img src={propertys?.image_property} className="p-3" style={{ width: 350 }} alt=""></img>
                        <img src={propertys?.image_property} className="p-3" style={{ width: 350 }} alt="" ></img>
                        <img src={propertys?.image_property} className="p-3" style={{ width: 350 }} alt=""></img>
                    </div>
                </div>
                <div style={{ width: 1018 }}>
                    <div>
                        <h2 className="fw-bold">{propertys?.name_property}</h2>
                    </div>
                    <div className="d-flex" style={{ justifyContent: "space-between" }}>
                        <div>
                            <p className="fw-bold" style={{ fontSize: 18 }}><FormatRupiah value={propertys?.price} />/ {propertys?.type_of_rent}</p>
                            <p>{propertys?.address_property}</p>
                        </div>
                        <div className="d-flex">
                            <div>
                                <p>Bed Room</p>
                                <div className="d-flex" style={{ margin: "0px" }}>
                                    <h5 style={{ fontWeight: "bold" }}>{propertys?.bed_room}</h5>
                                    <img src="bed.svg" alt="" />
                                </div>
                            </div>
                            <div className="ms-3">
                                <p>Bath Rooms</p>
                                <div className="d-flex" style={{ margin: "0px" }}>
                                    <h5 style={{ fontWeight: "bold" }}>{propertys?.bath_room}</h5>
                                    <img src="bath.svg" alt="" />
                                </div>
                            </div>
                            <div className="ms-3">
                                <p>Area</p>
                                <h5>1800 ft</h5>
                            </div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <p className="fw-bold" style={{ fontSize: 18 }}>Description</p>
                        <p>{propertys?.description}</p>
                    </div>
                </div>
                {localStorage.getItem("status") === "Owner" || "Tenant" ? (
                    <div className="d-flex" style={{ width: 1018, justifyContent: "end" }}>
                        <button style={{ width: 200, backgroundColor: "#5A57AB", border: "0px", height: 40, borderRadius: 7, color: "white" }} onClick={handleShow}>BOOK NOW</button>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Modal.Title>How long you will stay</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3" style={{ display: "flex", flexDirection: "column" }} controlId="exampleForm.ControlInput1">
                                        <Form.Label style={{ fontWeight: "bold" }}>Check-in</Form.Label>
                                        <input type="date" name="check_in" onChange={handleCheckInAndOut} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" style={{ display: "flex", flexDirection: "column" }} controlId="exampleForm.ControlInput1">
                                        <Form.Label style={{ fontWeight: "bold" }}>Check-Out</Form.Label>
                                        <input type="date" name="check_out" onChange={handleCheckInAndOut} />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Link to={`/myticket/` + id}>
                                    <Button variant="primary"
                                        type="button"
                                        // onClick={(e) => handleBooking.mutate(e)}
                                        // onSubmit={() => {
                                        //     // handle();
                                        //     Navigation(`/myticket/${id}`)
                                        // }}
                                        style={{ backgroundColor: "#5A57AB", width: 200 }}>
                                        Order
                                    </Button>
                                </Link>
                            </Modal.Footer>
                        </Modal>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
}

export default Detail;
