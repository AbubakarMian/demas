import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./../styles/managebookings.css";
import Carousel from "react-bootstrap/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSliders,
  faArrowRightArrowLeft,
  faLocationDot,
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

export default function Manage_Bookings() {
  const navigate = useNavigate();

  const navigateToPath = (path) => {
    navigate(path);
  };
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Row className="back_row">
        <Col>
          <Button
            className="back_btn"
            onClick={() => {
              navigate(-1);
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} /> MANAGE BOOKINGS
          </Button>
        </Col>
      </Row>
      <Container fluid>
        <Row className="det_box">
          <Col>
            <div className="det_area">
              <h4>DETAIL</h4>
              <p>Jeddah Airport to Jeddah Airport</p>
              <Button
                onClick={() => {
                  navigate("/bookinginfosingle");
                }}
              >
                SINGLE TRIP{" "}
                <FontAwesomeIcon
                  className="icon_btn"
                  icon={faLocationDot}
                  beat
                />
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="det_box">
          <Col>
            <div className="det_area">
              <h4>DETAIL</h4>
              <p>Jeddah Airport to Jeddah Airport</p>
              <Button
                onClick={() => {
                  navigate("/bookinginfopackages");
                }}
              >
                Packages{" "}
                <FontAwesomeIcon
                  className="icon_btn"
                  icon={faArrowRightArrowLeft}
                />
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const Sedan_crousel = () => {
  return (
    <Carousel className="slider_bdr">
      <Carousel.Item>
        <img className="d-block w-100" src="./images/a.jpg" alt="First slide" />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./images/h.jpg"
          alt="Second slide"
        />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="./images/g.jpg" alt="Third slide" />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};
