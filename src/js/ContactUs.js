import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./../styles/contactus.css";
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

export default function Contact_Us() {
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
              <FontAwesomeIcon icon={faArrowLeft} /> Contact Us
            </Button>
          </Col>
        </Row>
      </Container>
      <Container fluid>
      <div className="inp_area">

        <Row className="input_row">
          <Col>
            <Form.Label htmlFor="basic-url">Full Name</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control  className="input_txt" id="basic-url" aria-describedby="basic-addon3" />
            </InputGroup>
          </Col>
        </Row>
        <Row className="input_row">
          <Col>
            <Form.Label htmlFor="basic-url">Email Address</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control  className="input_txt" id="basic-url" aria-describedby="basic-addon3" />
            </InputGroup>
          </Col>
        </Row>
        <Row className="input_row">
          <Col>
            <Form.Label htmlFor="basic-url">Whatsapp Number</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control  className="input_txt" id="basic-url" aria-describedby="basic-addon3" />
            </InputGroup>
          </Col>
        </Row>
        <Row className="input_row">
          <Col>
            <Form.Label htmlFor="basic-url">Message</Form.Label>
            <InputGroup className="mb-3">
            <Form.Control  className="input_txt" as="textarea" aria-label="With textarea" />
            </InputGroup>
          </Col>
        </Row>
        <Row className="input_row">
          <Col>
            <Button className="sub_btn">SUBMIT</Button>
          </Col>
        </Row>
        </div>
      </Container>
    </div>
  );
}

const Filters = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        className="sett_btn"
      >
        <FontAwesomeIcon icon={faSliders} />
      </Button>
      <Collapse in={open}>
        <div id="example-collapse-text">
          <Container>
            <Row>
              <Col>
                <h3>CAR TYPE</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button>Sedan</Button>
                <Button>Mini-Bus</Button>
                <Button>SUV</Button>
              </Col>
            </Row>
          </Container>
        </div>
      </Collapse>
    </>
  );
};
