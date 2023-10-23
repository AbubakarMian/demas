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

export default function Booking_info_pack() {
  const navigate = useNavigate();
  const location = useLocation();
  const { contextState, updateContextState } = useContext(ContextApiContext);

  const [booking, setBooking] = useState({ order_details: [] });
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);

  const navigateToPath = (path, props) => {
    navigate(path, props);
  };

  useEffect(() => {
    if(location.state == null){
      return navigateToPath('/home');
    }
    const booking_obj = location.state.booking_details;
    setBooking(booking_obj);
  }, [location.state]);
  console.log("booking.order_details", booking);

  const showPaymentModal = () => {
    if (contextState.user.role_id == 5 && !booking.is_paid) {
      //its driver
      setShowPaymentConfirmation(true);
    }
  };

  const order_paid = async () => {
    const res = await SendRequest(
      contextState,
      "post",
      Constant.order_pay + "/" + booking.id,
      null,
      true
    );

    if (res.status) {
      let booking_obj = booking;
      booking_obj.is_paid = true;
      setBooking({ ...booking, booking_obj });
      setShowPaymentConfirmation(false);

    } else {
      updateContextState("Payment failed", "error_msg");
    }
  };

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
          <Row className="">
            <Col>
              <Form.Label htmlFor="basic-url">Booking ID</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Username"
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
                  placeholder="hi"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={capitalizeFirstLetter(booking.status)}
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
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        value={booking_detail.price}
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
              </div>
            );
          })}
          <Row>
            <Col>
              {booking.is_paid ? (
                <Button className="paid">
                  Paid {booking.price} SAR
                </Button>
              ) : (
                <Button onClick={() => showPaymentModal()} className="bill_btn">
                  Total Price {booking.price} SAR
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
          <Button onClick={() => order_paid()}>Confirm</Button>
          {/* <Button>Close</Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
