import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./../styles/availblecar.css";
import "./../styles/transport_details.css";
import Carousel from "react-bootstrap/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useLocation } from "react-router-dom";

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
import Collapse from "react-bootstrap/Collapse";
import InputGroup from "react-bootstrap/InputGroup";
import Nav_bar_area from "./NavBar";
import { ContextApiContext } from "../context/ContextApi";

export default function TransportDetails(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { contextState, updateContextState } = useContext(ContextApiContext);

  const [transportDetail, setTransportDetail] = useState(null);
  // const [transportDetail, setTransportDetail] = useState({transport_type:{},
  //   images:[],
  //   features:[],
  //   booking:[],
  //   dontforget:[],
  // });

  const navigateToPath = (path) => {
    navigate(path);
  };

  useEffect(() => {
    console.log(
      "props from previous screen Transport details ",
      location.state
    );
    set_transport_details();
  }, [location.state]);

  const set_transport_details = () => {
    const transport_detail = location.state.transport;
    setTransportDetail(transport_detail);
  };
  const [car_feature, setcar_featureOpen] = useState(false);
  const [book, setbookOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const [handleOtpPaymentModals, setHandleOtpPaymentModalsShow] = useState({
    otp_step: false,
    payment_step: false,
    payment_success:false
  });

  const [showOtp, setShowotp] = useState(false);
  const [showOTPPaymentOptions, setShowOTPPaymentOptions] = useState(false);
  const handleBookCar = () => {
    setShowOTPPaymentOptions(true);
    const user = contextState.user.id;
    console.log("logged in user data", contextState);
    // if (!user.is_loggedin) {
    let otpPayment = handleOtpPaymentModals;
    otpPayment.otp_step = true;
    // let otp = { otp_step: true };
    setHandleOtpPaymentModalsShow({ ...handleOtpPaymentModals, otpPayment });
    // }
  };

  const HandleShowOTPPaymentOptions = () => {
    setShowOTPPaymentOptions(true);
  };
  const HandleHideOTPPaymentOptions = () => {
    setShowOTPPaymentOptions(false);
  };
  // const handleShow = () => setShow(true);
  if (!transportDetail) {
    return null;
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
            <h3 className="top_heading_page">{transportDetail.name}</h3>
          </div>
        </Row>
      </Container>

      <Container fluid>
        <Row className="const_padding">
          <Col>
            <div className="car_typ">
              Type - {transportDetail.transport_type.name}
            </div>
          </Col>
          <Col>
            <div className="rates">250 SAR (per trip)</div>
          </Col>
        </Row>
        <Row className="const_padding">
          <Col>
            <div className="car_nme">
              {transportDetail.transport_type.name} Type or Similar
            </div>
          </Col>
          {/* <Col>
            <div className="similr">(or Similar)</div>
          </Col> */}
        </Row>
      </Container>
      <Row className="const_padding">
        {/*  */}
        <Carousel className="slider_bdr">
          {transportDetail.images.map((image) => {
            return (
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={image}
                  // alt="First slide"
                />
                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
        {/*  */}
      </Row>

      <Container fluid>
        <Row className="icn_ara_sedan const_padding">
          <Col>
            <FontAwesomeIcon className="detail_icn" icon={faUser} />
            {transportDetail.transport_type.seats}
          </Col>
          <Col>
            <FontAwesomeIcon className="detail_icn" icon={faSuitcaseRolling} />
            {transportDetail.transport_type.luggage}
          </Col>
          <Col>
            <FontAwesomeIcon className="detail_icn" icon={faDoorOpen} />
            {transportDetail.transport_type.doors}
          </Col>
        </Row>
        <Row className="const_padding">
          <p className="car_details ">{transportDetail.details}</p>
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
                  {transportDetail.features.map((txt) => {
                    return (
                      <p className="para_sedan">
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className="arr_icn"
                        />
                        {txt}
                      </p>
                    );
                  })}
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
                  {transportDetail.booking.map((txt) => {
                    return (
                      <p className="para_sedan">
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className="arr_icn"
                        />
                        {txt}
                      </p>
                    );
                  })}
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
                  {transportDetail.dontforget.map((txt) => {
                    return (
                      <p className="para_sedan">
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className="arr_icn"
                        />
                        {txt}
                      </p>
                    );
                  })}
                </div>
              </Collapse>
            </Row>
          </div>
        </div>
        <Row className="const_padding">
          <Col>
            <Button
              className="book_btn"
              onClick={
                () => {
                  handleBookCar();
                }
                // handleShow
              }
            >
              BOOK CAR
            </Button>

            <div className="modal_plac">
              <div className="mdl_btn">
                <CreatePaymentModal
                  setHandleOtpPaymentModalsShow={setHandleOtpPaymentModalsShow}
                  handleOtpPaymentModals={handleOtpPaymentModals}
                />
                <CreateOTPModal
                  setHandleOtpPaymentModalsShow={setHandleOtpPaymentModalsShow}
                  handleOtpPaymentModals={handleOtpPaymentModals}
                />
                <CreatePaymentSuccessModal setHandleOtpPaymentModalsShow={setHandleOtpPaymentModalsShow}
                  handleOtpPaymentModals={handleOtpPaymentModals}
                  />
              </div>

              <Modal
                show={false}
                // show={showOTPPaymentOptions}
                onHide={HandleHideOTPPaymentOptions}
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>Payment Options</Modal.Title>
                </Modal.Header>
                <Modal.Body></Modal.Body>
                <Modal.Footer></Modal.Footer>
              </Modal>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const Car_crousel = () => {
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
  const [showValidateOtp, setshowValidateOtp] = useState(false);
  const navigate = useNavigate();
  console.log("props create otp", props);
  const navigateToPath = (path, props) => {
    navigate(path, { state: { props } });
  };

  const getOtp = () => {
    setshowValidateOtp(true);
  };
  const validateOtp = () => {
    let otp = { otp_step: false, payment_step: true ,payment_success:false};
    props.setHandleOtpPaymentModalsShow(otp);
  };

  const handleCloseOtp = () => {
    let otp = { otp_step: false, payment_step: false ,payment_success:false};
    props.setHandleOtpPaymentModalsShow(otp);
    console.log("handle close otpfalse ", props.handleOtpPaymentModals);
  };

  return (
    <>
      <div className="modal_plac">
        <Modal
          show={props.handleOtpPaymentModals.otp_step}
          // show={props.handleOtpPaymentModals.otp_step}
          // show={showOtp}
          onHide={handleCloseOtp}
          // {...props}
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

            <Button onClick={() => getOtp()}>GetOtp</Button>
            {!showValidateOtp ? null : (
              <>
                <Form.Label htmlFor="basic-url">OTP</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    placeholder="otp"
                  />
                </InputGroup>
                <Button onClick={() => validateOtp()}>Login</Button>
              </>
            )}
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

const CreatePaymentModal = (props) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClosePayment = () => {
    let otp = { otp_step: false, payment_step: false ,payment_success:false};
    props.setHandleOtpPaymentModalsShow(otp);
    console.log("handle close otpfalse ", props.handleOtpPaymentModals);
  };
  const handlePayment = () => {
    let otp = { otp_step: false, payment_step: false ,payment_success:true};
    props.setHandleOtpPaymentModalsShow(otp);
    console.log("handle close otpfalse ", props.handleOtpPaymentModals);
  };

  const navigateToPath = (path) => {
    navigate(path);
  };
  return (
    <>
      <Modal
        show={props.handleOtpPaymentModals.payment_step}
        onHide={handleClosePayment}
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
              {/* <CreatePaymentSuccessModal /> */}
              <Button 
                onClick={handlePayment}
              >Pay</Button>
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

const CreatePaymentSuccessModal = (props) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const navigateToPath = (path) => {
    navigate(path);
  };
  const handleClosePaymentSuccess = () => {
    let otp = { otp_step: false, payment_step: false ,payment_success:false};
    props.setHandleOtpPaymentModalsShow(otp);
    console.log("handle close otpfalse ", props.handleOtpPaymentModals);
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
        show={props.handleOtpPaymentModals.payment_success}
        // show={show}
        onHide={handleClosePaymentSuccess}
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
