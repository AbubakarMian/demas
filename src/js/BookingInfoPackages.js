import React, { useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./../styles/bookinginfo.css";
import Carousel from "react-bootstrap/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSliders,
  faUser,
  faSuitcaseRolling,
  faDoorOpen,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import InputGroup from "react-bootstrap/InputGroup";
import Nav_bar_area from "./NavBar";
import { useNavigate, useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";
import {
  SendRequest,
  capitalizeFirstLetter,
  get_formated_dateime,
} from "../common/Common";
import { ContextApiContext } from "../context/ContextApi";
import { Constant } from "../common/Constants";
import PaymentOptions from "./Components/PaymentOptions";

export default function Booking_info_pack() {
  const navigate = useNavigate();
  const location = useLocation();
  const { contextState, updateContextState } = useContext(ContextApiContext);

  const [booking, setBooking] = useState({ user_obj: {}, order_details: [] });
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentOrder, setPaymentOrderModal] = useState({});
  const [cancelmodalShow, setCancelModalShow] = React.useState(false);
  const [paymentOrderType, setPaymentOrderType] = useState({});

  const navigateToPath = (path, props) => {
    navigate(path, props);
  };

  useEffect(() => {
    if (location.state == null) {
      return navigateToPath("/home");
    }
    const booking_obj = location.state.booking_details;
    setBooking(booking_obj);
  }, [location.state]);
  console.log("booking.order_details", booking);

  const checkshowPaymentModal = () => {
    if (contextState.user.role_id == 5 && !booking.is_paid) {
      //its driver
      setShowPaymentConfirmation(true);
    }
  };
  
  const setPaymentOrder = (order)=>{
    setShowPaymentModal(true);
    setPaymentOrderModal(order);
  }

  const setPaymentOrderForModal=(order_type,order)=>{
                    
    setPaymentOrder(order);
    setPaymentOrderType(order_type)
  }
  return (
    
    <div>
      <Container fluid>
        <Row>
          <div className="login_head">
            <div className="backicon">
              <Button
                className="bcbtn"
                onClick={() => {
                  navigate(-1);
                }}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </Button>
            </div>{" "}
            <h3 className="top_heading_page">BOOKING INFO</h3>
          </div>
        </Row>
      </Container>
      <Container fluid>
        <div className="whole_bx">
          <Row>
            <Col>
              <Form.Label htmlFor="basic-url">User</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="-"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={booking.user_obj.name}
                  className="inputboxes"
                  readOnly
                />
              </InputGroup>
            </Col>
          </Row>
          <Row className="">
            <Col>
              <Form.Label htmlFor="basic-url">Booking ID</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="-"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={booking.order_id}
                  className="inputboxes"
                  readOnly
                />
              </InputGroup>
            </Col>
            <Col>
              <Form.Label htmlFor="basic-url">Booking Status</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="-"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={capitalizeFirstLetter(booking.status)}
                  className="inputboxes"
                  readOnly
                />
              </InputGroup>
            </Col>
          </Row>
          <Row className="">
            <Col>
              <Form.Label htmlFor="basic-url">Whatsapp</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="-"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={capitalizeFirstLetter(booking.whatsapp_number)}
                  className="inputboxes"
                  readOnly
                />
              </InputGroup>
            </Col>
            <Col>
              <Form.Label htmlFor="basic-url">Phone Number</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="-"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={booking.user_obj.phone_no}
                  className="inputboxes"
                  readOnly
                />
              </InputGroup>
            </Col>
          </Row>
          {booking.order_details.map((booking_detail) => {
            return (
              <div className="inpup_box">
                <Row className="">
                  <Col>
                    <Form.Label htmlFor="basic-url">Booking ID</Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Control
                        placeholder="-"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        value={booking.order_id}
                        className="inputboxes"
                        readOnly
                      />
                    </InputGroup>
                  </Col>
                  <Col>
                    <Form.Label htmlFor="basic-url">Booking Status</Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Control
                        placeholder="-"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        value={capitalizeFirstLetter(booking.status)}
                        className="inputboxes"
                        readOnly
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className="">
                  <Col>
                    <Form.Label htmlFor="basic-url">Driver Name</Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Control
                        placeholder="-"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        value={booking_detail?.driver?.user_obj?.name}
                        className="inputboxes"
                        readOnly
                      />
                    </InputGroup>
                  </Col>
                  <Col>
                    <Form.Label htmlFor="basic-url">Driver Whatsapp</Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Control
                        placeholder="-"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        value={
                          booking_detail?.driver?.user_obj?.whatsapp_number
                        }
                        className="inputboxes"
                        readOnly
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className="">
                  <Col>
                    <Form.Label htmlFor="basic-url">Vehicle</Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Control
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        value={booking_detail.transport_type.name}
                        className="inputboxes"
                        readOnly
                      />
                    </InputGroup>
                  </Col>
                  <Col>
                    <Form.Label htmlFor="basic-url">Price</Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Control
                        placeholder="Price"
                        aria-label="Price"
                        aria-describedby="basic-addon1"
                        value={booking_detail.final_price}
                        className="inputboxes"
                        readOnly
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Table responsive="sm" striped bordered hover>
                      <thead>
                        <tr>
                          <th>Pickup</th>
                          <th>Dropoff</th>
                          <th>Date&Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            {booking_detail.journey.pickup.name +
                              " " +
                              booking_detail.pick_extrainfo ?? ""}
                          </td>
                          <td>
                            {booking_detail.journey.pickup.name +
                              " " +
                              booking_detail.dropoff_extrainfo ?? ""}
                          </td>
                          <td>
                            {
                              get_formated_dateime(
                                booking_detail.pick_up_date_time
                              ).date_time
                            }
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
                <Row>

                  <Col>
                  <Button className="mange_btn" onClick={()=>{
                    setPaymentOrderForModal("order_detail",booking_detail)
                  
                  }}>
                      Pay Now 
                    </Button>
                   
                  </Col>
                  <Col>
                  
                    <Button
                      variant="primary"
                      onClick={() => setCancelModalShow(true)}
                      className="mange_btn btn btn-primary"
                    >
                      Cancel
                    </Button>

                    <MyVerticallyCenteredModal
                      show={cancelmodalShow}
                      onHide={() => setCancelModalShow(false)}
                    />
                  </Col>
                </Row>
              </div>
            );
          })}
          <Row>
          <PaymentOptions order={paymentOrder} payObjType={paymentOrderType} showPaymentModal={showPaymentModal}
                      setShowPaymentModal={setShowPaymentModal}
                    />
            <Col>
            <Button onClick={() => {
                    setPaymentOrderForModal("order",booking)
            }} className="bill_btn">
                  Pay All
                </Button>

              {booking.is_paid == "1" ? (
                <Button className="paid">Paid {booking.final_price} SAR</Button>
              ) : (
                <Button onClick={() => checkshowPaymentModal()} className="bill_btn">
                  {contextState.user.role_id == 5 ? "Collect " : "Total Price "}
                  {booking.final_price} SAR
                </Button>
              )}
            </Col>
          </Row>
        </div>
      </Container>
      <Modal
        show={showPaymentConfirmation}
        onHide={() => setShowPaymentConfirmation(false)}
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
            <div className="cent">
              <Row>
                <Col>
                  <p className="succ">Customer Paid {booking.price} SAR </p>
                </Col>
              </Row>
            </div>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={() => order_paid()}>Confirm</Button> */}

          {/* <Button>Close</Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        "Cancel Request"
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <h4>Centered Modal</h4> */}
        <p>
        Are you sure you want to cancel?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-warning" onClick={props.onHide}>Cancel Booking</Button>
        <Button onClick={props.onHide}>Go Back</Button>
      </Modal.Footer>
    </Modal>
  );
}
