import { FormatRupiah } from "@arismun/format-rupiah"
import moment from "moment"
import { useEffect, useState } from "react"
import { Table, Container, Button } from "react-bootstrap"
import { useQuery } from "react-query"
import { API } from "../config/api"

function MyBookingApprove() {
    let { data: Users } = useQuery("ProfileUserBooking", async () => {
        const response = await API.get("profile")
        return response.data.data
    })
    // console.log(Users)

    let { data: transaction, refetch} = useQuery("user", async () => {
        const response = await API.get("user-transactions/" + Users?.id)//localStorage.getItem("token"))
        return response.data.data
    })
    refetch()

    return (
        <div style={{ padding: "100px 80px 0px 80px" }}>
            <Container>
                {transaction?.map((a, b) => {
                    return (
                        <div style={{ boxShadow: "0px 0px 1px", borderRadius: 10, padding: "20px 30px 10px 30px", marginTop: 40 }}>
                            <div className="d-flex" style={{ justifyContent: "space-between" }}>
                                <div >
                                    <img src="/image/LogoHousy.png" alt="" />
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <h2>Booking</h2>
                                    <h5>{moment(a.check_in).format('DD MMMM YYYY')}</h5>
                                </div>
                            </div>
                            <div className="d-flex" style={{ justifyContent: "space-between" }}>
                                <div>
                                    <h3>House Astina</h3>
                                    <p>{a.property?.name_property}</p>
                                    <p style={{ width: 300 }}>{a.property?.address_property}</p>

                                    {(() => {
                                        if (a.status_payment === "success") {
                                            return (
                                                <p className="text-success bg-success bg-gradient border-0 bg-opacity-25 fw-regular px-4 py-2 rounded-3 btn-sm"
                                                    style={{
                                                        textAlign: "center",
                                                        borderRadius: 20,
                                                        width: 120
                                                    }}
                                                >
                                                    Success
                                                </p>
                                            )
                                        } else if (a.status_payment === "pending") {
                                            return (
                                                <p className="text-warning bg-warning bg-gradient border-0 bg-opacity-25 fw-regular px-4 py-2 rounded-3 btn-sm"
                                                    style={{
                                                        textAlign: "center",
                                                        borderRadius: 20,
                                                        width: 120
                                                    }}
                                                >
                                                    Pending
                                                </p>
                                            )
                                        } else {
                                            return (
                                                <p className="text-danger bg-danger bg-gradient border-0 bg-opacity-25 fw-regular px-4 py-2 rounded-3 btn-sm"
                                                    style={{
                                                        textAlign: "center",
                                                        borderRadius: 20,
                                                        width: 120
                                                    }}
                                                >
                                                    Failed
                                                </p>
                                            )
                                        }
                                    })()}
                                </div>
                                <div style={{ marginRight: -80, marginTop: 10 }}>
                                    <img src="/image/Group 256.svg" alt="" />
                                </div>
                                <div>
                                    <div>
                                        <h5>Check-in</h5>
                                        <p>{moment(a.check_in).format('DD MMMM YYYY')}</p>
                                    </div>
                                    <div>
                                        <h5>Check-Out</h5>
                                        <p>{moment(a.check_out).format('DD MMMM YYYY')}</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <h5>Amenities</h5>
                                        <p>{a.property?.Amenities}</p>
                                    </div>
                                    <div>
                                        <h5>Type of Rent</h5>
                                        <p>{a.property?.type_of_rent}</p>
                                    </div>
                                </div>
                                <div className="d-flex" style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                    <img src="/image/Barkod.svg" alt="" style={{ width: 150, height: "auto" }} />
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
                            <Table style={{ marginTop: 20 }}>
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
                                        <td>{a.user?.full_name}</td>
                                        <td>{a.user?.gender}</td>
                                        <td>{a.user?.phone}</td>
                                        {(() => {
                                            if (a.status_payment === "success") {
                                                return (

                                                    <td style={{ fontWeight: "bold", color: "green" }}>Long Time rent</td>
                                                )

                                            } else if (a.status_payment === "pending") {
                                                return (
                                                    <td style={{ fontWeight: "bold", color: "rgb(255, 193, 7)" }}>Long Time rent</td>
                                                )
                                            } else {
                                                return (
                                                    <td style={{ fontWeight: "bold", color: "red" }}>Long Time rent</td>
                                                )
                                            }
                                        })()}
                                        <td>:</td>
                                        {(() => {
                                            if (a.status_payment === "success") {
                                                return (

                                                    <td style={{ fontWeight: "bold", color: "green" }}>Per {a.property?.type_of_rent}</td>
                                                )

                                            } else if (a.status_payment === "pending") {
                                                return (
                                                    <td style={{ fontWeight: "bold", color: "rgb(255, 193, 7)" }}>Per {a.property?.type_of_rent}</td>
                                                )
                                            } else {
                                                return (
                                                    <td style={{ fontWeight: "bold", color: "red" }}>Per {a.property?.type_of_rent}</td>
                                                )
                                            }
                                        })()}
                                    </tr>
                                    <tr>
                                        <td colSpan={5} style={{ fontWeight: "bold" }}>
                                            Total
                                        </td>
                                        <td>:</td>
                                        {(() => {
                                            if (a.status_payment === "success") {
                                                return (

                                                    <td style={{ fontWeight: "bold", color: "green" }}><FormatRupiah value={a.property?.price} /></td>
                                                )

                                            } else if (a.status_payment === "pending") {
                                                return (
                                                    <td style={{ fontWeight: "bold", color: "rgb(255, 193, 7)" }}><FormatRupiah value={a.property?.price} /></td>
                                                )
                                            } else {
                                                return (
                                                    <td style={{ fontWeight: "bold", color: "red" }}><FormatRupiah value={a.property?.price} /></td>
                                                )
                                            }
                                        })()}
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    )
                })}
            </Container>
        </div>
    );
}
export default MyBookingApprove;
