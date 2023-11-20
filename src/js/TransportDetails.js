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
import LoginModal from "./Components/LoginModal";
import TripCreatedSuccessModal from "./Components/TripCreatedSuccessModal";
import { Constant } from "../common/Constants";
import { SendRequest, SendRequestContetType } from "../common/Common";

export default function TransportDetails(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { contextState, updateContextState } = useContext(ContextApiContext);

  const [transportDetail, setTransportDetail] = useState(null);
  const [booking_obj, setBooking_obj] = useState({});
  // const [transportDetail, setTransportDetail] = useState({transport_type:{},
  //   images:[],
  //   features:[],
  //   booking:[],
  //   dontforget:[],
  // });

  const navigateToPath = (path, props) => {
    navigate(path, { state: props });
  };

  useEffect(() => {
    console.log(
      "props from previous screen Transport details ",
      location.state
    );
    set_transport_details();
    init_state_variables();
  }, [location.state]);

  const init_state_variables = () => {
    let booking_obj = location.state.booking_obj;
    setBooking_obj(booking_obj);
  };
  const set_transport_details = () => {
    const transport_detail = location.state.transport;
    console.log("transport detail props ", transport_detail);
    setTransportDetail(transport_detail);
  };
  const [car_feature, setcar_featureOpen] = useState(false);
  const [book, setbookOpen] = useState(false);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [showPaymentOptionsModal, setShowPaymentOptionsModal] = useState(false);
  const [paymentSuccessModalsShow, setPaymentSuccessModalsShow] =
    useState(false);

  const [handleOtpPaymentModals, setHandleOtpPaymentModalsShow] = useState({
    otp_step: false,
    payment_step: false,
    payment_success: false,
  });
  const handleBookCar = () => {
    const user = contextState.user;
    if (user.is_loggedin) {
      let booking_obj = location.state.booking_obj;
      console.log("bookin handle", booking_obj);
      if (booking_obj.type == "package") {
        navigateToPath("/packages", { booking_obj });
      } else {
        createOrder();
      }
    } else {
      updateContextState(true, "show_login_modal");
    }
  };

  const createOrder = async () => {
    let formData = new FormData();
    console.log("bookin", location.state.booking_obj);
    let obj = {
      booking_details: location.state.booking_obj,
    };
    formData.append(
      "booking_details",
      JSON.stringify(location.state.booking_obj)
    );
    const res = await SendRequestContetType(
      contextState,
      "post",
      Constant.order_create,
      JSON.stringify(obj),
      true
    );

    if (res.status) {
      setPaymentSuccessModalsShow(true);
    } else {
    }
  };

  if (!transportDetail) {
    return null;
  }
  return (
    <div>
      {/* <LoginModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} /> */}
      {/* {
        showLoginModal ?<LoginModal  />:null 
      }
       */}
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
            <div className="car_nme">
              {transportDetail.transport_type.name} Type or Similar
            </div>
          </Col>
          <Col>
                    <div className="rates">
                      <div className="style-1 divine">
                        {transportDetail.apply_discount ? (
                          <>
                           <p className="pd"><span className="bef">BEFORE</span>
                            <del className="sps">{transportDetail.booking_price}  SAR</del></p>
                            <span className="nw">NOW</span>
                          </>
                        ) : null}
                        {transportDetail.discounted_price} SAR
                      </div>
                    </div>
                  </Col>
        </Row>
        
        
        <Row className="const_padding">
          
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
            <Row className="on_padding">
              
            <Collapse in={true}>
                    <div id="example-collapse-text">
                      <InputGroup>
                        <Form.Control
                          as="text"
                          aria-label="With textarea"
                          className="comnt_txt"
                          placeholder="Customer Name"
                        />
                      </InputGroup>
                      <InputGroup>
                        <Form.Control
                          as="text"
                          aria-label="With textarea"
                          className="comnt_txt"
                          placeholder="customer_number"
                        />
                      </InputGroup>
                      <InputGroup>
                        <Form.Control
                          as="text"
                          aria-label="With textarea"
                          className="comnt_txt"
                          placeholder="customer_collection_price"
                        />
                      </InputGroup>
                    </div>
                  </Collapse>
            </Row>
          </div>
        </div>
        <Row className="const_padding">
          <Col>
          <Button
      className="book_btn"
      onClick={handleBookCar}
    >
      <div className="style-1 divine_det">
        {transportDetail.apply_discount ? (
          <>
          <p className="pd"><span className="bef">BEFORE</span>
            <del>
              
              <span className="amount">
                {transportDetail.booking_price} SAR
              </span>
            </del></p>
            <ins>
            <span className="nw">NOW</span>
              <span className="amount">
                {transportDetail.discounted_price} SAR
              </span>
            </ins>
          </>
        ) : (
          <>
            Total Fare
            <span className="amount">
              {transportDetail.booking_price} SAR
            </span>
          </>
        )}
      </div>
    </Button>
            
            <div className="modal_plac">
              <div className="mdl_btn">
                <PaymentOptions
                  showPaymentOptionsModal={showPaymentOptionsModal}
                  setShowPaymentOptionsModal={setShowPaymentOptionsModal}
                />
                <CreatePaymentModal
                  setHandleOtpPaymentModalsShow={setHandleOtpPaymentModalsShow}
                  handleOtpPaymentModals={handleOtpPaymentModals}
                />
                <TripCreatedSuccessModal
                  setPaymentSuccessModalsShow={setPaymentSuccessModalsShow}
                  paymentSuccessModalsShow={paymentSuccessModalsShow}
                />
              </div>

              <Modal
                show={false}
                // show={showOTPPaymentOptions}
                // onHide={HandleHideOTPPaymentOptions}
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

const CreatePaymentModal = (props) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClosePayment = () => {
    let otp = { otp_step: false, payment_step: false, payment_success: false };
    props.setHandleOtpPaymentModalsShow(otp);
    console.log("handle close otpfalse ", props.handleOtpPaymentModals);
  };
  const handlePayment = () => {
    let otp = { otp_step: false, payment_step: false, payment_success: true };
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
              <Button onClick={handlePayment}>Pay</Button>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

const PayLater = () => {
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

const PaymentOptions = (props) => {
  const navigate = useNavigate();
  const { contextState, updateContextState } = useContext(ContextApiContext);
  const location = useLocation();

  const navigateToPath = (path) => {
    navigate(path);
  };
  const payLater = () => {
    props.setShowPaymentOptionsModal(false);
  };

  return (
    <>
      <Modal
        show={props.showPaymentOptionsModal}
        onHide={() => props.setShowPaymentOptionsModal(false)}
        dialogClassName="modal-90w"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="example-custom-modal-styling-title">
            Payment Options
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <div className="cent">
              <Row>
                <Col>
                  <Button className="pay_btn" onClick={() => payLater()}>
                    Pay Later
                  </Button>
                </Col>
                <Col>
                  <Button
                    className="pay_btn"
                    onClick={() => {
                      updateContextState(
                        "Online payment currently unavalible",
                        "error_msg"
                      );
                    }}
                  >
                    Pay Now
                  </Button>
                </Col>
              </Row>
            </div>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};
