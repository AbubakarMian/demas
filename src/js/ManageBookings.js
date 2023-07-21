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
      <Container fluid >

        <Row>
          <div className="login_head">
            <div className="backicon"><Button className="bcbtn" onClick={() => {
              navigate(-1);
            }} ><FontAwesomeIcon icon={faArrowLeft} /></Button></div> <h1> MANAGE BOOKINGS</h1>
          </div>
        </Row>
      </Container>
      <Container fluid>
        <Row className="det_box">
          <Col>
            <div className="det_area">
              <h4>DETAIL</h4>
              <p>Jeddah Airport to Jeddah Airport</p>
              <Button className="mange_btn"
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
              <div>
                <h4>DETAIL</h4>
                <p>Jeddah Airport to Jeddah Airport</p>
              </div>
              <Button className="mange_btn"
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
