import { FormatRupiah } from "@arismun/format-rupiah";
import { useState } from "react";
import { Button, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import { useQuery } from "react-query";
import { API } from "../config/api";
function IndexOwner() {
    const [view, setView] = useState(false);

    const handleOnCloseView = () => setView(false);
    const handleOnShowView = () => setView(true);

    let { data: users } = useQuery("userTrcH", async () => {
        const response = await API.get("/users")//localStorage.getItem("token"))
        return response.data.data
    })

    let { data: transaction } = useQuery("userTrc", async () => {
        const response = await API.get("/transaction")//localStorage.getItem("token"))
        return response.data.data
    })
    console.log(transaction)
    return (
        <Container style={{padding:"120px 80px 0px 80px"}}>
            <div>
                <div>
                    <h3>List Transaksi</h3>
                </div>
                {transaction?.map((a, b) => {
                    return (
                        <Table>
                            <thead>
                                <tr style={{width:"100px"}}>
                                    <th className="py-3" style={{width:"20px"}}>No</th>
                                    <th className="py-3" style={{width:"110px"}}>Users</th>
                                    <th className="py-3" style={{width:"100px"}}>Type of Rent</th>
                                    <th className="py-3" style={{width:"20px"}}>Bukti Transaction</th>
                                    <th className="py-3" style={{width:"20px"}}>Status Payment</th>
                                    <th className="py-3" style={{width:"20px"}}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{width:"100px"}}>
                                    <td className="py-3" style={{width:"20px"}}>{a.id}</td>
                                    <td className="py-3" style={{width:"110px"}}>{a.user?.full_name}</td>
                                    <td className="py-3" style={{width:"100px"}}>{a.property?.type_of_rent}</td>
                                    <td className="py-3" style={{width:"20px"}}>bca.jpg</td>
                                    <td style={{width:"20px"}}>
                                        {(() => {
                                            if (a.status_payment === "success") {
                                                return (
                                                    <p className="text-success">
                                                        Success
                                                    </p>
                                                )
                                            } else if (a.status_payment === "pending") {
                                                return (
                                                    <p className="text-warning">
                                                        Pending
                                                    </p>
                                                )
                                            } else {
                                                return (
                                                    <p className="text-danger">
                                                        Failed
                                                    </p>
                                                )
                                            }
                                        })()}
                                    </td>
                                    <td className="py-3">
                                        <Button
                                            to="#"
                                            className="bg-light border-0"
                                            onClick={handleOnShowView}
                                        >
                                            <img src="/image/Pencariaann.svg" alt=""></img>
                                        </Button>
                                        <Modal show={view} onHide={handleOnCloseView} size="xl">
                                            <Container className="p-4">
                                                <div className="d-flex justify-content-between">
                                                    <img src="/image/LogoHousy.png" alt="" />
                                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                                        <h3>
                                                            Booking
                                                        </h3>
                                                        <p>{a.check_in}</p>
                                                    </div>
                                                </div>
                                                <Row style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                                                    <Col>
                                                        <h4>
                                                            {a.property?.name_property}
                                                        </h4>
                                                        <p>
                                                            {a.property?.address_property}
                                                        </p>
                                                    </Col>
                                                    <Col xxl={1}>
                                                        <img src="/image/Howfar.svg" alt="" style={{ width: 100, height: 90, marginTop: 10, marginRight: -30 }} />
                                                    </Col>
                                                    <Col>
                                                        <div>
                                                            <h4>
                                                                Check-in
                                                            </h4>
                                                            <p style={{ marginTop: -12 }}>
                                                                {a.check_in}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <h4>
                                                                Check-out
                                                            </h4>
                                                            <p style={{ marginTop: -12 }}>
                                                                {a.check_out}
                                                            </p>
                                                        </div>
                                                    </Col>
                                                    <Col>
                                                        <div>
                                                            <h4>
                                                                Amenities
                                                            </h4>
                                                            <p style={{ marginTop: -12 }}>
                                                                {a.property?.Amenities}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <h4>
                                                                Type of Rent
                                                            </h4>
                                                            <p style={{ marginTop: -12 }}>
                                                                {a.property?.type_of_rent}
                                                            </p>
                                                        </div>
                                                    </Col>
                                                    <Col xs={2}>
                                                        <div>
                                                            <img src="/image/Nota.svg" alt="" />
                                                            <Button
                                                                type="submit"
                                                                //onSubmit={handleChangePhoto}
                                                                className="position-relative p-0 m-0"
                                                                style={{ backgroundColor: "#5A57AB", width: "140px" }}
                                                            >
                                                                <input
                                                                    className="d-block position-absolute h-100 w-100"
                                                                    id="formFile"
                                                                    type="file"
                                                                    name="image"
                                                                    //         onChange={handleChangePhoto}
                                                                    style={{ cursor: "pointer", opacity: 0 }}
                                                                />
                                                                <span className="d-block py-2 px-3">
                                                                    Upload Image
                                                                </span>
                                                            </Button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Table className="alltable">
                                                        <thead>
                                                            <tr>
                                                                <th>No</th>
                                                                <th>Full Name</th>
                                                                <th>Gender</th>
                                                                <th>Phone</th>
                                                                <th></th>
                                                                <th></th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>{a.id}</td>
                                                                <td>{a.user?.full_name}</td>
                                                                <td>{a.user?.gender}</td>
                                                                <td>{a.user?.phone}</td>
                                                                <td></td>
                                                                <td>Long time rent</td>
                                                                <td>: {a.property?.type_of_rent}</td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan={5}>
                                                                    Total
                                                                </td>
                                                                <td></td>
                                                                <td>
                                                                    : <FormatRupiah value={a.property?.price} />
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </Row>
                                                <div style={{ display: "flex", justifyContent: "end" }}>
                                                    <Button style={{ backgroundColor: "red", border: "0px", width: 120, marginRight: "15px" }}>
                                                        Cancel
                                                    </Button>
                                                    <Button style={{ backgroundColor: "green", border: "0px", width: 120 }}>
                                                        Approve
                                                    </Button>
                                                </div>
                                            </Container>
                                        </Modal>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    )
                })}


            </div>
        </Container>
    );
}
export default IndexOwner;
