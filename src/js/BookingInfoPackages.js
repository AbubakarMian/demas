import React, { useEffect } from "react";
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

export default function Booking_info_pack() {
  const navigate = useNavigate();
  const location = useLocation();

  const [booking, setBooking] = useState({});

  const navigateToPath = (path, props) => {
    navigate(path, props);
  };

  useEffect(() => {
    const booking_obj = location.state.booking_details;
    setBooking(booking_obj);
  }, [location.state]);

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
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={booking.status}
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
                        placeholder="Username"
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
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        value={booking_detail?.driver?.user_obj?.whatsapp_number}
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
                            {booking_detail.journey.pickup.name +" "+ booking_detail.pick_extrainfo??"" }
                            Madinah Airport (30APR PK 743 KHI MED2200 0030)
                          </td>
                          <td>
                          {booking_detail.journey.pickup.name+" "+ booking_detail.dropoff_extrainfo??""}
                            Madina Hotel (Emmar Royal Madinah)</td>
                          <td>{booking_detail.pick_up_date_time}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </div>
            );
          })}
          {/* <div className="inpup_box">
            <Row className="">
              <Col>
                <Form.Label htmlFor="basic-url">Driver Name</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value="Ali"
                    className="inputboxes"
                    readOnly
                  />
                </InputGroup>
              </Col>
              <Col>
                <Form.Label htmlFor="basic-url">Driver Whatsapp</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value="123-456-790"
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
                    value="Sedan"
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
                    value="250 SAR"
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
                      <td>Madinah Airport (30APR PK 743 KHI MED2200 0030)</td>
                      <td>Madina Hotel (Emmar Royal Madinah)</td>
                      <td>06-06-2023 12:30 PM</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </div>
          <div className="inpup_box">
            <Row className="">
              <Col>
                <Form.Label htmlFor="basic-url">Driver Name</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value="Ali"
                    className="inputboxes"
                    readOnly
                  />
                </InputGroup>
              </Col>
              <Col>
                <Form.Label htmlFor="basic-url">Driver Whatsapp</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value="123-456-790"
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
                    value="Sedan"
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
                    value="250 SAR"
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
                      <td>Madinah Airport (30APR PK 743 KHI MED2200 0030)</td>
                      <td>Madina Hotel (Emmar Royal Madinah)</td>
                      <td>06-06-2023 12:30 PM</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </div> */}
          <Row>
            <Col>
              <Button className="bill_btn">Total Price 650 SAR</Button>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
