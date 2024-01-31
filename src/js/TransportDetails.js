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
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

export default function TransportDetails(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { contextState, updateContextState } = useContext(ContextApiContext);

  const [transportDetail, setTransportDetail] = useState(null);
  const [booking_obj, setBooking_obj] = useState({});
  const [current_booking, setCurrent_booking] = useState({});
  const [user, setUser_obj] = useState({});

  const [car_feature, setcar_featureOpen] = useState(false);
  const [book, setbookOpen] = useState(false);
  const [customer_name, setCustomerName] = useState("");
  const [ticketImage, setTicketImage] = useState("");
  const [customer_whatsapp_number, setCustomerWhatsappNumber] = useState("");
  const [customer_phone_number, setCustomerPhoneNumber] = useState("");
  const [customer_collection_price, setCustomerCollectionPrice] = useState(0);
  const [showPriceInUserInvoice, setShowPriceInUserInvoice] = useState(false);

  // const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [open, setOpen] = useState(false);
  // const [showPaymentOptionsModal, setShowPaymentOptionsModal] = useState(false);
  const [paymentSuccessModalsShow, setPaymentSuccessModalsShow] =
    useState(false);

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

  useEffect(() => {
    const user = contextState.user;
    setUser_obj(user);
  }, [contextState.user.access_token]);

  const init_state_variables = () => {
    let booking_obj = location.state.booking_obj;
    let current_booking_obj =
      booking_obj.details[booking_obj.details.length - 1];
    setCurrent_booking(current_booking_obj);
    const user = contextState.user;
    setBooking_obj(booking_obj);
    console.log("user", user);
    setUser_obj(user);
  };

  const set_transport_details = () => {
    const transport_detail = location.state.transport;
    console.log("transport detail props ", transport_detail);
    setTransportDetail(transport_detail);
  };
  const handleBookCar = () => {
    if (user.is_loggedin) {
      // let booking_obj = location.state.booking_obj;
      console.log("bookin handle", booking_obj);
      console.log("bookin hantransportDetaille", transportDetail);
      console.log("bookin current_booking", current_booking);
      console.log(
        "bookin current_booking.booking_price",
        current_booking.booking_price
      );
      console.log(
        "btransportDetail.booking_price",
        transportDetail.booking_price
      );
      console.log("customer_collection_pricece", customer_collection_price);
      console.log(
        "chk",
        parseInt(transportDetail.booking_price) <
          parseInt(customer_collection_price)
      );
      if (user.role_id == 5 || user.role_id == 1) {
        updateContextState("Driver can not create order", "error_msg");
        navigateToPath("/managebookings");
        return;
      }

      if (
        user.role_id != 2 &&
        (customer_collection_price == "" ||
          parseInt(transportDetail.booking_price) >
            parseInt(customer_collection_price))
      ) {
        updateContextState(
          "Collection price cannot be smaller than booking price",
          "error_msg"
        );
        return;
      }
      booking_obj.details[
        booking_obj.details.length - 1
      ].customer_collection_price = customer_collection_price;

      // setBookingDetails({ ...location.state.booking_obj, booking_obj });

      // console.log('passed');
      // return;
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
    console.log("bookin", booking_obj);

    console.log("contextState", contextState);
    console.log("contextState user", contextState.user);
    if ([3, 4].includes(user.role_id)) {
      // 4 is travel agent
      if (
        customer_name == "" ||
        customer_whatsapp_number == "" ||
        customer_phone_number == ""
      ) {
        updateContextState("All fields required", "error_msg");
        return;
      }
    }

    let bookingObj = booking_obj;
    bookingObj.ticketImage = ticketImage;
    bookingObj.customer_name = customer_name;
    bookingObj.customer_whatsapp_number = customer_whatsapp_number;
    bookingObj.customer_phone_number = customer_phone_number;
    bookingObj.show_price_in_user_invoice = showPriceInUserInvoice;
    // this is added in booking details
    // bookingObj.customer_collection_price = customer_collection_price;

    let obj = {
      booking_details: bookingObj,
    };
    const res = await SendRequestContetType(
      "post",
      Constant.order_create,
      JSON.stringify(obj),
      true
    );

    if (res.status) {
      setPaymentSuccessModalsShow(true);
    } else {
      if (res.error.custom_code == 403) {
        updateContextState(true, "show_login_modal");
        updateContextState("Please Login and try again", "error_msg");
        // navigateToPath(-1);
      }
      // updateContextState("Booking unavalible contact admin", "error_msg");
      updateContextState(res.error?.message[0], "error_msg");
    }
  };

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
            <div className="rates">
              <div className="style-1 divine">
                {transportDetail.apply_discount ? (
                  <>
                    <p className="pd">
                      <span className="bef">BEFORE</span>
                      <del className="sps">
                        {transportDetail.booking_price} SAR
                      </del>
                    </p>
                    <span className="nw">NOW </span>
                    {transportDetail.discounted_price} SAR
                  </>
                ) : (
                  transportDetail.booking_price
                )}{" "}
                SAR
              </div>
            </div>
          </Col>
        </Row>

        <Row className="const_padding"></Row>
      </Container>
      <Row className="const_padding">
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
          <div className="const_paddingw">
            <div className="car_card ">
              <Row className="car_c_btn">
                <Col>
                  <Button
                    aria-controls="example-collapse-text"
                    aria-expanded={true}
                    className="car_fea"
                  >
                    <FontAwesomeIcon className="car_icn1" icon={faCircleInfo} />
                    Info <FontAwesomeIcon icon={faBars} />
                  </Button>
                </Col>
              </Row>
              <Row>
                <Collapse in={true}>
                  <div id="example-collapse-text" className="coll_2">
                    <p className="para_sedan">
                      {booking_obj.type == "package" ? null : (
                        <>
                          <Form.Label htmlFor="basic-url">
                          Upload Ticket (Optional)
                          </Form.Label>
                          <InputGroup className="mb-3">
                            {/* <InputGroup.Text id="basic-addon3">
                              https://example.com/users/
                            </InputGroup.Text> */}
                            <Form.Control
                            type="file"
                              id="basic-url"
                              aria-describedby="basic-addon3"
                              onChange={(e) => setTicketImage(e.target.value)}

                            />
                          </InputGroup>
                          
                          
                          
                        </>
                      )}

                     
                    </p>
                  </div>
                </Collapse>
              </Row>
            </div>
          </div>
          {[3, 4].includes(user.role_id) ? (
            <div className="const_paddingw">
              <div className="car_card ">
                <Row className="car_c_btn">
                  <Col>
                    <Button
                      aria-controls="example-collapse-text"
                      aria-expanded={true}
                      className="car_fea"
                    >
                      <FontAwesomeIcon className="car_icn1" icon={faUser} />
                      Customer Info <FontAwesomeIcon icon={faBars} />
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Collapse in={true}>
                    <div id="example-collapse-text" className="coll_2">
                      <p className="para_sedan">
                        {booking_obj.type == "package" ? null : (
                          <>
                            <Form.Group
                              className="mb-3"
                              controlId="exampleForm.ControlInput1"
                            >
                              <Form.Control
                                type="text"
                                aria-label="With textarea"
                                className="comnt_tsxt"
                                placeholder="Name"
                                onChange={(e) =>
                                  setCustomerName(e.target.value)
                                }
                              />
                            </Form.Group>
                            <Form.Group
                              className="mb-3"
                              controlId="exampleForm.ControlInput1"
                            >
                              <div className="ip_bxphn">
                                <PhoneInput
                                  placeholder="Whatsapp Number"
                                  defaultCountry="sa"
                                  onChange={(txt) => {
                                    console.log("chk num", txt);
                                    setCustomerWhatsappNumber(txt);
                                  }}
                                />
                              </div>
                            </Form.Group>
                            <Form.Group
                              className="mb-3"
                              controlId="exampleForm.ControlInput1"
                            >
                              <PhoneInput
                                placeholder="Phone Number"
                                defaultCountry="SA"
                                // onChange={setValue}
                                onChange={(txt) => {
                                  console.log("chk num", txt);
                                  setCustomerPhoneNumber(txt);
                                }}
                              />
                              {/* <Form.Control
                                type="text"
                                aria-label="With textarea"
                                className="comnt_tsxt"
                                placeholder="Phone Number"
                                onChange={(e) =>
                                  setCustomerPhoneNumber(e.target.value)
                                }
                              /> */}
                            </Form.Group>
                          </>
                        )}

                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Control
                            type="number"
                            aria-label="With textarea"
                            className="comnt_tsxt"
                            placeholder="Collection Price"
                            onChange={(e) =>
                              setCustomerCollectionPrice(e.target.value)
                            }
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Check // prettier-ignore
                            type="switch"
                            id="custom-switch"
                            label="Show price in user Invoice"
                            onChange={(e) => {
                              setShowPriceInUserInvoice(e.target.checked);
                            }}
                          />
                        </Form.Group>
                      </p>
                    </div>
                  </Collapse>
                </Row>
              </div>
            </div>
          ) : null}
        </div>

        <Row className="const_padding">
          <Col>
            <Button className="book_btn" onClick={handleBookCar}>
              <div className="style-1 divine_det">
                {transportDetail.apply_discount ? (
                  <>
                    <p className="pd">
                      <span className="bef">BEFORE</span>
                      <del>
                        <span className="amount">
                          {transportDetail.booking_price} SAR
                        </span>
                      </del>
                    </p>
                    <ins>
                      <span className="nw">NOW</span>
                      <span className="amount">
                        {transportDetail.discounted_price} SAR
                      </span>
                    </ins>
                  </>
                ) : (
                  <>
                    Total
                    <span className="amount">
                      {" " + transportDetail.booking_price} SAR
                    </span>
                  </>
                )}
              </div>
            </Button>

            <div className="modal_plac">
              <div className="mdl_btn">
                {/* <PaymentOptions
                  showPaymentOptionsModal={showPaymentOptionsModal}
                  setShowPaymentOptionsModal={setShowPaymentOptionsModal}
                /> */}
                {/* <CreatePaymentModal
                  setHandleOtpPaymentModalsShow={setHandleOtpPaymentModalsShow}
                  handleOtpPaymentModals={handleOtpPaymentModals}
                /> */}
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
