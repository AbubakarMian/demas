import React from "react";
import Row from "react-bootstrap/Row";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Home_crousel from "./../js/home_crousel";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./../styles/single_trip.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import Nav_bar_area from "./NavBar";
import Table from "react-bootstrap/Table";


function get_trip() {
  return [
    {
      from_address: "Makka Hotel",
      to_address: "Madina Hotel",
      date_time: "15-12-2023",
    },
    {
      from_address: "Maddina Hotel",
      to_address: "Makka Hotel",
      date_time: "01-01-2024",
    },
  ];
}

export default function Home_page_style(props) {
  let trips = get_trip();
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [show, setShow] = useState(false);

  const handleOtpClose = () => {
    setShowOtpModal(false);
  };
  const handleOtpOpen = () => {
    setShowOtpModal(true);
  };
  const handleShow = () => setShow(true);

  const bookingClose = () => setShow(false);
  const bookingShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div>
      <Nav_bar_area />

        <Home_crousel />
      <Container>
        <Row>
          <Col>
            <Button
              href="./home"
              variant="primary"
              className="singtripbtn"
            >
              Single Trip{" "}
              <FontAwesomeIcon className="icon_btn" icon={faLocationDot} beat />
            </Button>
          </Col>
          <Col>
            <Button variant="primary" className="singtripbtn">
              Packages{" "}
              <FontAwesomeIcon
                className="icon_btn"
                icon={faArrowRightArrowLeft}
              />
            </Button>
          </Col>
        </Row>
        <div className="for_large_scrasdeen">
          <Row>

            <Col>
              <div className="singletrip_card ">
                <div className="smallcasdfrd">
                  <Table className="package_table" striped bordered hover>
                    <tbody>
                      <tr className="border">
                        <td>
                          <div className="lociconarea_new">
                            <img src="./images/listicon.png" />
                          </div>
                        </td>
                        <td>
                          <div className="cardtxtarea">
                            <p>Jeddah Airport to Jeddah Airport</p>
                            <p>Jeddah Airport - Makkah Hote</p>
                          </div>
                        </td>
                        <td className="crossareatable">
                          {" "}
                          <div className="">
                            <Button className="cross_btn">X</Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <div className="smallcasdfrd">
                  <Table className="package_table" striped bordered hover>
                    <tbody>
                      <tr className="border">
                        <td>
                          <div className="lociconarea_new">
                            <img src="./images/listicon.png" />
                          </div>
                        </td>
                        <td>
                          <div className="cardtxtarea">
                            <p>Jeddah Airport to Jeddah Airport</p>
                            <p>Jeddah Airport - Makkah Hote</p>
                          </div>
                        </td>
                        <td className="crossareatable">
                          {" "}
                          <div className="">
                            <Button className="cross_btn">X</Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>


                <div className="add_btn_card">
<Button onClick={handleShow}>ADD</Button>

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                      <div>
                        <h4>PICKUP</h4>
                        <Button className="pick_drop">
                          <FontAwesomeIcon
                            className="icon_btn_loc"
                            icon={faLocationDot}
                          />
                          Select Pickup location
                        </Button>
                        <h4>DROP OFF</h4>
                        <Button className="pick_drop">
                          <FontAwesomeIcon
                            className="icon_btn_loc"
                            icon={faLocationDot}
                          />
                          Select Pickup location
                        </Button>
                        <h4>PICKUP DATE & TIME</h4>
                        <Form.Control
                          type="datetime-local"
                          id="input5"
                          aria-describedby="passwordHelpBlock"
                          placeholder="Select Pickup Date & Time"
                          className="input_bx"
                        />{" "}
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" className="procced_btn" onClick={handleClose}>
                        PROCEED TO NEXT
                      </Button>
                    </Modal.Footer>
                  </Modal>                </div>
              </div>
              </Col>

          </Row>
        </div>

        <div className="for_small_screen">
          <Row>
            <Col md={1}></Col>
            <Col md={10}>
              <div className="singletrip_card">
                {/* {trips.map((item) => {
                  return (
                    <div className="smallcard">
                      <Row>
                        <div className="lociconarea">
                          <img src="./images/listicon.png" />
                        </div>
                        <div className="cardtxtarea">
                          <p>{item.from_address}</p>
                          <p>{item.to_address}</p>
                          <p>{item.date_time}</p>
                        </div>
                        <div className="crossarea">
                          <Button>X</Button>
                        </div>
                      </Row>
                    </div>
                  );
                })} */}

                <div className="add_btn_card">
                  
                </div>
              </div>
            </Col>
            <Col md={1}></Col>
          </Row>
        </div>
        <Row>
          <Col md={1}></Col>
          <Col md={10}>
            <Button
              variant="primary"
              onClick={handleOtpOpen}
              className="bookbtn"
            >
              Book
            </Button>

            <div className="modal_plac">
              <Modal
                show={showOtpModal}
                onHide={handleOtpClose}
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>Enter Otp to Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Label htmlFor="basic-url">Mobile Number</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon3">
                      <div className="img_flag">
                        <img src="./images/saudi-arabia.png" />
                      </div>
                    </InputGroup.Text>
                    <Form.Control
                      id="basic-url"
                      aria-describedby="basic-addon3"
                      placeholder="01234567"
                    />
                  </InputGroup>

                  <Form.Label htmlFor="basic-url">OTP</Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      id="basic-url"
                      aria-describedby="basic-addon3"
                      placeholder="otp"
                    />
                  </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                  <CreatePaymentModal closeOtp={handleOtpClose} />
                  {/* <Button variant="primary" className="bookbtn" onClick={handleClose}>
                                        Book
                                    </Button> */}
                  {/* <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button> */}
                </Modal.Footer>
              </Modal>
            </div>
          </Col>
          <Col md={1}></Col>
        </Row>
      </Container>
    </div>
  );
}

const CreatePaymentModal = (props) => {
  const [paymentModalShow, setPaymentModalShow] = useState(false);
  const navigate = useNavigate();

  const navigateToPath = (path) => {
    navigate(path);
  };
  const paymentOptionDone = () => {
    props.closeOtp();
    setPaymentModalShow(true);
  };

  return (
    <>
      {/* <Button className="modal_btn" onClick={() => setShow(true)}>
          {" "}
          collaboration
        </Button> */}
      <Button variant="primary" className="bookbtn" onClick={paymentOptionDone}>
        Book
      </Button>
      <Modal
        show={paymentModalShow}
        onHide={() => setPaymentModalShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Payment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <Form.Label htmlFor="basic-url">Card Number</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Card No"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
                  <InputGroup.Text id="basic-addon2">
                    {" "}
                    <div className="img_flag">
                      <img src="./images/visa.png" />
                    </div>
                  </InputGroup.Text>
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label htmlFor="basic-url">Expiry</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Date"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
                </InputGroup>
              </Col>
              <Col>
                <Form.Label htmlFor="basic-url">Security</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="CVC"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Button
                variant="primary"
                className="bookbtn"
                onClick={() => {
                  navigate("/");
                }}
              >
                Pay 250SAR
              </Button>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};
