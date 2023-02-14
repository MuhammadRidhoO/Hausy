import { useState, setShow } from "react";
import { Button, Container, Form, Modal, Navbar, Table } from "react-bootstrap";

function IndexPoperty() {
  const [view, setView] = useState(false);

  const handleOnCloseView = () => setView(false);
  const handleOnShowView = () => setView(true);

  const [edit, setEdit] = useState(false);

  const handleOnCloseEdit = () => setEdit(false);
  const handleOnShowEdit = () => setEdit(true);
  return (
    <Container>
      <div className="listall">
        <div className="listhuman">
          <h3>List Transaksi</h3>
        </div>
        <Table striped size="sm" className="a123">
          <thead>
            <tr>
              <th className="py-3">No</th>
              <th className="py-3">Users</th>
              <th className="py-3">Tiket</th>
              <th className="py-3">Bukti Transaction</th>
              <th className="py-3">Status Payment</th>
              <th className="py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-3">1</td>
              <td className="py-3">Anto</td>
              <td className="py-3">Surabaya - Jakarta</td>
              <td className="py-3">bca.jpg</td>
              <td className="py-3 text-warning">Pending</td>
              <td className="py-3">
                <Button
                  to="#"
                  className="bg-light border-0"
                  onClick={handleOnShowView}
                >
                  <img src="Pencarian.png" alt=""></img>
                </Button>
                <Modal show={view} onHide={handleOnCloseView}>
                </Modal>
                <Button
                  className="ms-2 bg-light border-0"
                  onClick={handleOnShowEdit}
                >
                  <img src="Edit.png" alt=""></img>
                </Button>
                <Modal show={edit} onHide={handleOnCloseEdit} className="m-0">
                  <Modal.Header
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0px 0px 30px 0px",
                    }}
                  >
                    <img
                      src="logoTiket1.png"
                      alt=""
                      className="d-inline-flex"
                    />
                    <Button
                      className="m-0"
                      onClick={handleOnCloseEdit}
                      style={{ backgroundColor: "white", border: "0px" }}
                    >
                      <img src="X.png" alt="" />
                    </Button>
                  </Modal.Header>
                  <Modal.Body>
                    <Form style={{padding:"0px 10px 0px 10px"}}>
                      <Form.Group className="mb-3">
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="No"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="User"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="Tiket"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="Bukti Transaksi"
                        />
                      </Form.Group>
                      <Form.Select aria-label="Default select example">
                        <option>Status Payment</option>
                        <option value="1">Approved</option>
                        <option value="2">Pending</option>
                        <option value="3">Cancel</option>
                      </Form.Select>
                      <Modal.Footer
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        className="buttonlogin"
                      >
                        <Button
                          type="submit"
                          variant="primary"
                          className="buttonloginacc"
                          style={{
                            backgroundColor: "Green",
                            border: "0px",
                            width: 250,
                          }}
                        >
                          Save
                        </Button>
                      </Modal.Footer>
                    </Form>
                  </Modal.Body>
                </Modal>
                <Button className="ms-2 bg-light border-0">
                  <img src="Delete.png" alt=""></img>
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Container>
  );
}
export default IndexPoperty;
