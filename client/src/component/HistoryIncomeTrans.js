import { Table, Container, Button } from "react-bootstrap"

function HistoryIncomeTrans() {
    // const { id } = useParams()
    // const getData = JSON.parse(localStorage.getItem("Date"))
    // const getDataUser = JSON.parse(localStorage.getItem("SignUp"))
    // console.log(getData)
    return (
        <Container>
            {/* {props.hotel?.map((a, b) => {
                return (
                     */}

                    <div style={{ marginTop: 30, boxShadow: "0px 0px 1px", borderRadius: 10, padding: "0px 30px 0px 30px" }}>
                        <div className="d-flex" style={{ justifyContent: "space-between" }}>
                            <div>
                                <img src="/image/LogoHousy.png" alt="" />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <h2>Booking</h2>
                                <h5>{"getData?.check_in"}</h5>
                            </div>
                        </div>
                        <div className="d-flex" style={{ justifyContent: "space-between" }}>
                            <div>
                                <h3>House Astina</h3>
                                <p>{"a?.address"}</p>
                                <img src="/image/ApprovePayment.svg" alt="" />
                            </div>
                            <div style={{ marginRight: -80, marginTop: 10 }}>
                                <img src="/image/Group 256.svg" alt="" />
                            </div>
                            <div>
                                <div>
                                    <h5>Check-in</h5>
                                    <p>{"getData?.check_in"}</p>
                                </div>
                                <div>
                                    <h5>Check-Out</h5>
                                    <p>{"getData?.check_out"}</p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h5>Amenities</h5>
                                    <p>Furnished</p>
                                </div>
                                <div>
                                    <h5>Type of Rent</h5>
                                    <p>Year</p>
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
                                    <td>{"getDataUser?.full_name"}</td>
                                    <td>{"getDataUser?.gender"}</td>
                                    <td>{"getDataUser?.phone"}</td>
                                    <td style={{ fontWeight: "bold", color: "green" }}>Long Time rent</td>
                                    <td>:</td>
                                    <td style={{ fontWeight: "bold", color:"green" }}> Per {"a.TOR"}</td>
                                </tr>
                                <tr>
                                    <td colSpan={5} style={{ fontWeight: "bold" }}>
                                        Total
                                    </td>
                                    <td>:</td>
                                    <td style={{ fontWeight: "bold",color:"green" }}> Rp {"a.price"}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                {/* )
            })} */}
        </Container>
    );
}
export default HistoryIncomeTrans;
