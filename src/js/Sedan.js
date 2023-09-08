import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./../styles/availblecar.css";
import "./../styles/sedan.css";
import Carousel from "react-bootstrap/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faUser,
  faSuitcaseRolling,
  faCar,
  faDoorOpen,
  faCircleInfo,
  faFingerprint,
  faCheck,
  faBars,
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

export default function SedanCars(props) {
  const navigate = useNavigate();

  const navigateToPath = (path) => {
    navigate(path);
  };
  const [car_feature, setcar_featureOpen] = useState(false);
  const [book, setbookOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            <h3 className="top_heading_page">SEDAN</h3>
          </div>
        </Row>
      </Container>

      <Container fluid>
        <Row className="const_padding">
          <Col>
            <div className="car_typ">Type - Sedan</div>
          </Col>
          <Col>
            <div className="rates">250 SAR (per trip)</div>
          </Col>
        </Row>
        <Row className="const_padding">
          <Col>
            <div className="car_nme">Sedan Car or Similar</div>
          </Col>
          {/* <Col>
            <div className="similr">(or Similar)</div>
          </Col> */}
        </Row>
      </Container>
      <Row className="const_padding">
        <Sedan_crousel />
      </Row>

      <Container fluid>
        <Row className="icn_ara_sedan const_padding">
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
        <Row className="const_padding">
          <p className="car_details ">
            DEMAS Offers Sedan shape vehical that is greate for a small family
            of 2-3 People. It comes with the standard host of safely features
            and Impressive features of sharp steering,confident cornering, a
            large trunk, and premium cabin. The excellent and astounding choice
            for the explorer who needs an economy vehicle with maximizing space
            for luggage and themselves.
          </p>
        </Row>
        <div className="const_padding">
          <div className="car_card ">
            <Row className="car_c_btn">
              <Col>
                <Button
                  onClick={() => setcar_featureOpen(!car_feature)}
                  aria-controls="example-collapse-text"
                  aria-expanded={car_feature}
                  className="car_fea"
                >
                  <FontAwesomeIcon className="car_icn1" icon={faCar} />
                  CAR FEATURES <FontAwesomeIcon icon={faBars} />
                </Button>
              </Col>
            </Row>
            <Row>
              <Collapse in={car_feature}>
                <div id="example-collapse-text" className="coll_p">
                  <p className="para_sedan">
                    <FontAwesomeIcon icon={faArrowRight} className="arr_icn" />
                    Exterior parking camera rear
                  </p>
                  <p className="para_sedan">
                    <FontAwesomeIcon icon={faArrowRight} className="arr_icn" />
                    Heated door mirrors
                  </p>
                  <p className="para_sedan">
                    <FontAwesomeIcon icon={faArrowRight} className="arr_icn" />
                    Low tire pressure warning
                  </p>
                  <p className="para_sedan">
                    <FontAwesomeIcon icon={faArrowRight} className="arr_icn" />
                    Turn signal indicator mirrors
                  </p>
                </div>
              </Collapse>
            </Row>
          </div>
        </div>
        <div className="const_padding">
          <div className="car_card">
            <Row className="car_c_btn">
              <Col>
                <Button
                  onClick={() => setbookOpen(!book)}
                  aria-controls="example-collapse-text"
                  aria-expanded={book}
                  className="car_fea"
                >
                  <FontAwesomeIcon className="car_icn2" icon={faCircleInfo} />
                  Booking Includes
                  <FontAwesomeIcon icon={faBars} />
                </Button>
              </Col>
            </Row>
            <Row>
              <Collapse in={book}>
                <div id="example-collapse-text" className="coll_p">
                  <p className="para_sedan">
                    <FontAwesomeIcon icon={faArrowRight} className="arr_icn" />
                    Exterior parking camera rear
                  </p>
                  <p className="para_sedan">
                    <FontAwesomeIcon icon={faArrowRight} className="arr_icn" />
                    Heated door mirrors
                  </p>
                  <p className="para_sedan">
                    <FontAwesomeIcon icon={faArrowRight} className="arr_icn" />
                    Low tire pressure warning
                  </p>

                  <p className="para_sedan">
                    <FontAwesomeIcon icon={faArrowRight} className="arr_icn" />
                    Turn signal indicator mirrors
                  </p>
                </div>
              </Collapse>
            </Row>
          </div>
        </div>
        <div className="const_padding">
          <div className="car_card">
            <Row className="car_c_btn">
              <Col>
                <Button
                  onClick={() => setOpen(!open)}
                  aria-controls="example-collapse-text"
                  aria-expanded={open}
                  className="car_fea"
                >
                  <FontAwesomeIcon className="car_icn3" icon={faFingerprint} />
                  DON’T FORGOT
                  <FontAwesomeIcon icon={faBars} />
                </Button>
              </Col>
            </Row>
            <Row>
              <Collapse in={open}>
                <div id="example-collapse-text" className="coll_p">
                  <p className="para_sedan">
                    <FontAwesomeIcon icon={faArrowRight} className="arr_icn" />
                    Exterior parking camera rear
                  </p>
                  <p className="para_sedan">
                    <FontAwesomeIcon icon={faArrowRight} className="arr_icn" />
                    Heated door mirrors
                  </p>
                  <p className="para_sedan">
                    <FontAwesomeIcon icon={faArrowRight} className="arr_icn" />
                    Low tire pressure waring
                  </p>
                  <p className="para_sedan">
                    <FontAwesomeIcon icon={faArrowRight} className="arr_icn" />
                    Turn signal indicator mirrors
                  </p>
                </div>
              </Collapse>
            </Row>
          </div>
        </div>
        <Row className="const_padding">
          <Col>
            <Button className="book_btn" onClick={handleShow}>
              BOOK CAR
            </Button>

            <div className="modal_plac">
              <Modal
                show={show}
                onHide={handleClose}
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>Payment Options</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="mdl_btn">
                    {/* <CreatePaymentModal /> */}
                    <CreateOTPModal />
                    <CreateSuccessModal />
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  {/* <CreatePaymentModal /> */}
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

const CreateOTPModal = (props) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const navigateToPath = (path) => {
    navigate(path);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button className="pay_btn" onClick={handleShow}>
        Pay Now
      </Button>

      <div className="modal_plac">
        <Modal
          show={show}
          onHide={handleClose}
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
            <CreatePaymentModal />
            {/* <Button variant="primary" className="bookbtn" onClick={handleClose}>
                        Book
                    </Button> */}
            {/* <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button> */}
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

const CreatePaymentModal = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const navigateToPath = (path) => {
    navigate(path);
  };
  return (
    <>
      <Button className="pay_btn" onClick={() => setShow(true)}>
        Proceed To Payment
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
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
              <CreatePaymentSuccessModal />
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

const CreateSuccessModal = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const navigateToPath = (path) => {
    navigate(path);
  };
  return (
    <>
      <Button className="pay_btn" onClick={() => setShow(true)}>
        Pay Later
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          {/* <Modal.Title id="example-custom-modal-styling-title">
            Payment
          </Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <Container>
            <div className="cent">
              <Row>
                <Col>
                  <FontAwesomeIcon icon={faCheck} className="succ_icon" />
                </Col>
              </Row>
              <Row>
                <Col>
                  <p className="succ">Trip has been added</p>
                  <p className="succ">successfully</p>
                  <p className="succ">You will be notified with</p>
                  <p className="succ">confimation shortly.</p>
                </Col>
              </Row>
            </div>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

const CreatePaymentSuccessModal = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const navigateToPath = (path) => {
    navigate(path);
  };
  return (
    <>
      <Button
        variant="primary"
        className="bookbtn"
        onClick={() => setShow(true)}
      >
        Pay 250SAR
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          {/* <Modal.Title id="example-custom-modal-styling-title">
            Payment
          </Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <Container>
            <div className="cent">
              <Row>
                <Col>
                  <FontAwesomeIcon icon={faCheck} className="succ_icon" />
                </Col>
              </Row>
              <Row>
                <Col>
                  <p className="succ">Trip has been added</p>
                  <p className="succ">successfully</p>
                  <p className="succ">You will be notified with</p>
                  <p className="succ">confimation shortly.</p>
                </Col>
              </Row>
            </div>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};
