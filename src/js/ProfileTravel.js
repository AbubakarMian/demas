import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./../styles/profile.css";
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

export default function Profile() {
  const navigate = useNavigate();

  const navigateToPath = (path) => {
    navigate(path);
  };
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Container fluid>
      <Row>
        <div className="login_head">
          <div className="backicon"><Button className="bcbtn" onClick={() => {
              navigate(-1);
            }} ><FontAwesomeIcon icon={faArrowLeft} /></Button></div> <h1> Profile</h1>
        </div>
      </Row>
       
      </Container>
      <Container fluid>
        <div className="">
          <Row className="">
            <Col>
              <div className="img_area">
                <img src="./images/profile.png" />
              </div>
            </Col>
          </Row>
          <div className="info_area_bx">
            <Row className="">
              <Col>
                <h4>TRAVEL AGENT</h4>
              </Col>
            </Row>
            <Row className="">
              <Col>
                <Form.Label htmlFor="basic-url">Name</Form.Label>
                <InputGroup className="mb-3">
                  
                  <Form.Control
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    value={"Jhon"}
                    className="inp_bx"
                    readOnly
                  />
                </InputGroup>{" "}
              </Col>
            </Row>
            <Row className="">
              <Col>
                <Form.Label htmlFor="basic-url">Email</Form.Label>
                <InputGroup className="mb-3">
                  
                  <Form.Control
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    value={"infa@example.com"}
                    className="inp_bx"
                    readOnly
                  />
                </InputGroup>{" "}
              </Col>
            </Row>
            <Row className="">
              <Col>
                <Form.Label htmlFor="basic-url">Mobile NO</Form.Label>
                <InputGroup className="mb-3">
                  
                  <Form.Control
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    value={"123-345-5675"}
                    className="inp_bx"
                    readOnly
                  />
                </InputGroup>{" "}
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
}
