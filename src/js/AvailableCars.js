import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./../styles/availblecar.css";
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

export default function AvailableCars() {
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
            }} ><FontAwesomeIcon icon={faArrowLeft} /></Button></div> <h1>Available Cars</h1>
        </div>
      </Row>
      </Container>
      <Container fluid>
        <Row className="bar_clr">
          <Col>
            <div className="car-head">5 Cars Ready</div>
          </Col>
          <Col>
            {/* <Filters /> */}
            <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        className="sett_btn"
      >
        <FontAwesomeIcon icon={faSliders} />
      </Button>
      



          </Col>
        </Row>
        <Row>
        <Collapse in={open}>
        <div id="example-collapse-text">
          <Container className="filter_area">
            <Row>
              <Col>
                <h3 className="filter_hed">CAR TYPE</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button className="filter_btn">Sedan</Button>
                <Button className="filter_btn">Mini-Bus</Button>
                <Button className="filter_btn">SUV</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button className="filter_btn">People Carrier Van</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3 className="filter_hed">CAR SEATS</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button className="filter_btn">4</Button>
                <Button className="filter_btn">15</Button>
                <Button className="filter_btn">5</Button>
                <Button className="filter_btn">8</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3 className="filter_hed">SUIT CASES</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button className="filter_btn">6</Button>
                <Button className="filter_btn">17</Button>
                <Button className="filter_btn">7</Button>
                <Button className="filter_btn">10</Button>
              </Col>
            </Row>
            
          </Container>
        </div>
      </Collapse>
        </Row>
        <div onClick={() => {
                navigate("/sedan");
              }}>
        <Row className="">
          <Col>
            <div className="car_typ">Type - Sedan</div>
          </Col>
          <Col>
            <div className="rates">250 SAR (per trip)</div>
          </Col>
        </Row>
        <Row className="">
          <Col>
            <div className="car_nme">Sedan Car or Similar</div>
          </Col>
          <Col>
            <div className="similr">(or Similar)</div>
          </Col>
        </Row>
        <Row>
          <Sedan_crousel />
        </Row>
        <Row className="icn_ara">
          <Col>
            <FontAwesomeIcon className="detail_icn" icon={faUser} />3
          </Col>
          <Col>
            <FontAwesomeIcon className="detail_icn" icon={faSuitcaseRolling} />5
          </Col>
          <Col>
            <FontAwesomeIcon className="detail_icn" icon={faDoorOpen} />4
          </Col>
        </Row>
        </div>
        <div onClick={() => {
                navigate("/sedan");
              }}>
        <Row className="">
          <Col>
            <div className="car_typ">Type - Mini-Bus</div>
          </Col>
          <Col>
            <div className="rates">250 SAR (per trip)</div>
          </Col>
        </Row>
        <Row className="">
          <Col>
            <div className="car_nme">Coaster or Similar</div>
          </Col>
          <Col>
            <div className="similr">(or Similar)</div>
          </Col>
        </Row>
        <Row>
          <Coaster_crousel />
        </Row>
        <Row className="icn_ara">
          <Col>
            <FontAwesomeIcon className="detail_icn" icon={faUser} />3
          </Col>
          <Col>
            <FontAwesomeIcon className="detail_icn" icon={faSuitcaseRolling} />5
          </Col>
          <Col>
            <FontAwesomeIcon className="detail_icn" icon={faDoorOpen} />4
          </Col>
        </Row>
        <Row className="">
          <Col>
            <div className="car_typ">Type - SUV</div>
          </Col>
          <Col>
            <div className="rates">400 SAR (per trip)</div>
          </Col>
        </Row>
        <Row className="">
          <Col>
            <div className="car_nme">GMC or Similar</div>
          </Col>
          <Col>
            <div className="similr">(or Similar)</div>
          </Col>
        </Row>
        <Row>
          <Suv_crousel />
        </Row>
        <Row className="icn_ara">
          <Col>
            <FontAwesomeIcon className="detail_icn" icon={faUser} />3
          </Col>
          <Col>
            <FontAwesomeIcon className="detail_icn" icon={faSuitcaseRolling} />5
          </Col>
          <Col>
            <FontAwesomeIcon className="detail_icn" icon={faDoorOpen} />4
          </Col>
        </Row>
        </div>
      
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

const Coaster_crousel = () => {
  return (
    <Carousel className="slider_bdr">
      <Carousel.Item>
        <img className="d-block w-100" src="./images/b.jpg" alt="First slide" />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./images/d.jpg"
          alt="Second slide"
        />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="./images/f.jpg" alt="Third slide" />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

const Suv_crousel = () => {
  return (
    <Carousel className="slider_bdr">
      <Carousel.Item>
        <img className="d-block w-100" src="./images/c.jpg" alt="First slide" />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./images/e.jpg"
          alt="Second slide"
        />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="./images/i.jpg" alt="Third slide" />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

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
