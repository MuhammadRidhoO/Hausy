import { Table, Container, Button, Modal, NavLink } from "react-bootstrap"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";
import { FormatRupiah } from "@arismun/format-rupiah";
import moment from 'moment'

function MyBooking({ checkHotel }) {
    const { id } = useParams()


    const Navigation = useNavigate()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [checkHotelInOut, setcheckHotelInOut] = useState(null)
    const [status_payment, setStatus_Payment] = useState("")
    let { data: propertys } = useQuery("Property", async () => {
        const response = await API.get("/property/" + id)
        return response.data.data
    })

    let { data: Users } = useQuery("ProfileUserBooking", async () => {
        const response = await API.get(`profile`)
        return response.data.data
    })
    console.log(Users)

    let { data: transactions } = useQuery("transactionCache", async () => {
        const response = await API.get("/transactions")
        setcheckHotelInOut(response.data.data)
        return response.data.data
    })
    const [property, setProperty] = useState({
        property_id: parseInt(id),
        user_id: parseInt(id),
        status_payment: "Pending",
        check_in: checkHotel.check_in,
        check_out: checkHotel.check_out,
    })
    console.log(property)

    const handleBooking = useMutation(async (e) => {
        try {
            e.preventDefault()
            // const formDataTransaction = new FormData()
            // formDataTransaction.append("check_in", checkHotel.check_in)
            // formDataTransaction.append("check_out", checkHotel.check_out)
            // formDataTransaction.append("property_id", parseInt(id))
            // formDataTransaction.append("status_payment", "pending")
            // formDataTransaction.append("user_id", parseInt(id))
            const response = await API.post("/transaction", property)
            // console.log(response.data.data, "Hallo Guys")

            window.snap.pay(response.data.data.token, {
                onSuccess: function (result) {
                    console.log(result, "Test test");
                    Navigation("/");
                    setStatus_Payment("success")
                },
                onPending: function (result) {
                    console.log(result);
                    Navigation("/");
                    setStatus_Payment("pending")
                },
                onError: function (result) {
                    console.log(result);
                    Navigation("/");
                    setStatus_Payment("failed")
                },
                onClose: function () {
                    alert("jangan kabur belum bayar lo! bayar dulu dek 😢");
                },
            })
        } catch (error) {

        }
    });
    useEffect(() => {
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        const myMidtransClientKey = "SB-Mid-client-uEsWsCCq1uRJ_gxm"

        let scriptTag = document.createElement("script")
        scriptTag.src = midtransScriptUrl

        scriptTag.setAttribute("data-client-key", myMidtransClientKey)
        document.body.appendChild(scriptTag)

        return () => {
            document.body.removeChild(scriptTag)
        }
    }, [])



    return (
        <Container style={{ padding: "120px 80px 0px 80px" }}>
            <div style={{ boxShadow: "0px 0px 1px", borderRadius: 10, padding: "20px 30px 0px 30px" }}>
                <div className="d-flex" style={{ justifyContent: "space-between" }}>
                    <div>
                        <img src="/image/LogoHousy.png" alt="" />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <h2>Booking</h2>
                        <h5>{moment(checkHotel.check_in).format('DD MMMM YYYY')}</h5>
                    </div>
                </div>
                <div className="d-flex" style={{ justifyContent: "space-between" }}>
                    <div style={{ width: 300 }}>
                        <h3>House Astina</h3>
                        <p>{propertys?.address_property}</p>
                        <p className="text-warning bg-warning bg-gradient border-0 bg-opacity-25 fw-regular px-4 py-2 rounded-3 btn-sm"
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                width: "150px"
                            }}>
                            {property.status_payment}
                        </p>
                    </div>
                    <div style={{ marginRight: -80, marginTop: 10 }}>
                        <img src="/image/Group 256.svg" alt="" />
                    </div>
                    <div>
                        <div>
                            <h5>Check-in</h5>
                            <p>{moment(checkHotel.check_in).format('DD MMMM YYYY')}</p>
                        </div>
                        <div>
                            <h5>Check-Out</h5>
                            <p>{moment(checkHotel.check_out).format('DD MMMM YYYY')}</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h5>Amenities</h5>
                            <p>{propertys?.Amenities}</p>
                        </div>
                        <div>
                            <h5>Type of Rent</h5>
                            <p>Year</p>
                        </div>
                    </div>
                    <div className="d-flex" style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <img src="/image/Nota.svg" alt="" style={{ width: 150, height: "auto" }} />
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
                </div>
                <Table>
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
                            <td>1</td>
                            <td>{Users?.full_name}</td>
                            <td>{Users?.gender}</td>
                            <td>{Users?.phone}</td>
                            <td
                                className="text-warning">Long Time rent</td>
                            <td>:</td>
                            <td className="text-warning">{propertys?.type_of_rent}</td>
                        </tr>
                        <tr>
                            <td colSpan={5}>
                                Total
                            </td>
                            <td>:</td>
                            <td style={{ fontWeight: "bold"}} className="text-warning"><FormatRupiah value={propertys?.price} /></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <div style={{ display: "flex", justifyContent: "end", alignItems: "center" }}>
                <Button style={{ width: 200 }}
                    onClick={handleShow}
                >
                    PAY
                </Button>
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Body>Pembayaran Anda Akan di Konfirmasi dalam 1 x 24 Jam
                        Untuk melihat pesanan <a href={"/"} onClick={(e) => handleBooking.mutate(e)} >Klik Disini</a > Terimakasih</Modal.Body>
                </Modal>
            </div>
        </Container>
    );
}
export default MyBooking;
