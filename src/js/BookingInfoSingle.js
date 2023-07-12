import React from "react";
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
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';


export default function Booking_info_Single() {
  const navigate = useNavigate();

  const navigateToPath = (path) => {
    navigate(path);
  };
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Container fluid>
        <Row className="back_row">
          <Col>
            <Button
              className="back_btn"
              onClick={() => {
                navigate(-1);
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} /> BOOKING INFO
            </Button>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row className="">
          <Col>
            <Form.Label htmlFor="basic-url">Booking ID</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value="21206"
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
                value="Confirmed"
                className="inputboxes"
                readOnly
              />
            </InputGroup>
          </Col>
        </Row>
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
        </div>
        
        <Row>
            <Col>
            <Button className="bill_btn">Total Price 250 SAR</Button>
            </Col>
        </Row>
      </Container>
    </div>
  );
}
