import React, { useState, useEffect, useContext } from "react";
import Row from "react-bootstrap/Row";
// import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Home_crousel from "./Home_crousel";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import "./../styles/single_trip.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightArrowLeft,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import { useNavigate, useLocation } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import Nav_bar_area from "./NavBar";
import Collapse from "react-bootstrap/Collapse";
import Table from "react-bootstrap/Table";
import { ContextApiContext } from "../context/ContextApi";
import { Constant } from "../common/Constants";
import { SendRequest, get_formated_dateime } from "../common/Common";
import TripCreatedSuccessModal from "./Components/TripCreatedSuccessModal";

export default function Packages(props) {
  const location = useLocation();

  const { contextState, updateContextState } = useContext(ContextApiContext);

  const [showPickup, setShowPickup] = useState(false);
  const [showDropOff, setShowDropoff] = useState(false);

  const [openComment, setopenComment] = useState(false);
  const [package_details, setPackage_details] = useState([]);
  const [bookingObj, setBookingObj] = useState({ details: [] });
  const [locations, setLocations] = useState([]);
  const [selectPickup, setselectPickup] = useState({});
  const [selectDropoff, setselectDropoff] = useState({});
  const [pickupTime, setpickupTime] = useState(0);
  const [comments, setComments] = useState("");
  const [paymentSuccessModalsShow, setPaymentSuccessModalsShow] =
    useState(false);

  useEffect(() => {
    getLocations();
    initializeConstants();
  }, []);

  const initializeConstants = () => {
    let booking_obj = location.state?.booking_obj;

    if (typeof booking_obj === "undefined" || booking_obj === null) {
      booking_obj = {
        type: "package",
        details: [], //package_details_arr
      };
    }
    setPackage_details(booking_obj.details);
    setBookingObj(booking_obj);
  };
  const getLocations = async () => {
    console.log("get locations");
    try {
      let cs = contextState;
      cs.user.access_token = Constant.basic_token;
      const res = await SendRequest(cs, "GET", Constant.get_locations);
      if (res.status) {
        let locations_list = res.response;
        setLocations(locations_list);
      } else {
        updateContextState(
          "Unable to get avalible pickup and dropodd points",
          "error_msg"
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
      updateContextState(
        "Unable to get avalible pickup and dropodd points",
        "error_msg"
      );
    }
  };

  const handleProceedToNext = async () => {
    console.log("bookin_obj", bookingObj);

    if (!selectPickup.id || !selectDropoff.id || !pickupTime) {
      updateContextState("All fields required", "error_msg");
      return;
    }

    try {
      let cs = contextState;
      let verify_journey_url = `${Constant.journey_verify}?pickup_id=${selectPickup.id}&dropoff_id=${selectDropoff.id}`;
      const res = await SendRequest(cs, "GET", verify_journey_url);
      if (res.status) {
        let package_details_arr = bookingObj.details;
        console.log("selectPickup ", selectPickup);
        package_details_arr.push({
          pickup_id: selectPickup.id,
          pickup: selectPickup,
          pick_extrainfo: "ticket_number",
          dropoff_id: selectDropoff.id,
          dropoff: selectDropoff,
          dropoff_extrainfo: "ticket_number",
          pickupdate_time: pickupTime,
          formatted_pickupdate_time: get_formated_dateime(pickupTime).date_time,
          comment: comments,
          transport_id: 0,
          transport_type_id: 0,
          transport_type: "",
        });
        let newBookingObj = bookingObj;
        newBookingObj.details = package_details_arr;
        setBookingObj({ ...bookingObj, newBookingObj });
        navigateToPath("/availablecars", { booking_obj: bookingObj });
      } else {
        updateContextState(res.error?.message[0], "error_msg");
      }
    } catch (error) {
      console.error("Error during login:", error);

      updateContextState(
        "Transport List unavalible contact admin.",
        "error_msg"
      );
    }
  };

  const changeLocationPoints = (e, point, location) => {
    let new_val = {};
    if (e.target.checked) {
      new_val = location;
    }
    if (point == "pickup") {
      console.log("pick up location point ", point, new_val);
      console.log(location.id);
      console.log(location.name);

      setselectPickup(new_val);
    } else {
      // dropoff
      console.log("dropoff location point ", point, new_val);

      setselectDropoff(new_val);
    }
    setShowPickup(false);
    setShowDropoff(false);
  };

  const handleDateTimeChange = (dateString) => {
    console.log("dateString ", dateString);
    const timestamp = Math.floor(new Date(dateString).getTime() / 1000);
    console.log("datetime ", timestamp);
    setpickupTime(timestamp);
  };

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [show, setShow] = useState(false);

  const handleOtpClose = () => {
    setShowOtpModal(false);
  };
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleBookPackage = () => {
    const user = contextState.user;
    if (user.is_loggedin) {
      createOrder();
    } else {
      updateContextState(true, "show_login_modal");
    }
  };

  const createOrder = async () => {
    let formData = new FormData();
    console.log("bookin", bookingObj);
    let obj = {
      booking_details: bookingObj,
    };
    formData.append(
      "booking_details",
      JSON.stringify(location.state.booking_obj)
    );
    const res = await SendRequest(
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
  const navigate = useNavigate();

  const navigateToPath = (path, props) => {
    navigate(path, { state: props });
  };

  const removeTrip = (index) => {
    let newBookingObj = bookingObj;
    console.log("remove index ", index);
    console.log("check remove index ", bookingObj.details);
    let details = bookingObj.details.filter((item, i) => i !== index);
    newBookingObj.details = details;
    console.log("remove index ", index);
    console.log("check remove index ", newBookingObj);
    setBookingObj({ ...bookingObj, details });
  };

  return (
    <div>
      <Nav_bar_area />

      <Home_crousel />
      <Container>
        <Row>
          <Col>
            <Button href="./home" variant="primary" className="singtripbtn">
              Single Trip{" "}
              <FontAwesomeIcon className="icon_btn" icon={faLocationDot} />
            </Button>
          </Col>
          <Col>
            <Button variant="primary" className="singtripbtn">
              Packages{" "}
              <FontAwesomeIcon
                className="icon_btn"
                icon={faArrowRightArrowLeft}
              />
            </Button>
          </Col>
        </Row>
        <div className="for_large_scrasdeen">
          <Row>
            <Col>
              <div className="singletrip_card ">
                {bookingObj.details.map((item, index) => {
                  console.log("itrrate item", index, item);
                  return (
                    <div className="smallcasdfrd">
                      <Table className="package_table" striped bordered hover>
                        <tbody>
                          <tr className="border">
                            <td>
                              <div className="lociconarea_new">
                                <img src="./images/listicon.png" />
                              </div>
                            </td>
                            <td>
                              <div className="cardtxtarea">
                                <p>{item.formatted_pickupdate_time}</p>
                                <p>{item.pickup.name}</p>
                                <p>to {item.dropoff.name}</p>
                                <p>{item.transport_type_name}</p>
                              </div>
                            </td>
                            <td className="crossareatable">
                              {" "}
                              <div className="">
                                <Button
                                  className="cross_btn"
                                  onClick={() => {
                                    removeTrip(index);
                                  }}
                                >
                                  X
                                </Button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  );
                })}

                <div className="add_btn_card">
                  <Button onClick={handleShow}>ADD</Button>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                      <div>
                        <h5 className="md_head">PICKUP</h5>
                        <Button
                          className="pick_drop"
                          onClick={() => setShowPickup(true)}
                        >
                          <FontAwesomeIcon
                            className="icon_btn_loc"
                            icon={faLocationDot}
                          />
                          {selectPickup.name ?? " Select Pickup location"}
                        </Button>
                        <h5 className="md_head">Dropoff</h5>
                        <Button
                          className="pick_drop"
                          onClick={() => setShowDropoff(true)}
                        >
                          <FontAwesomeIcon
                            className="icon_btn_loc"
                            icon={faLocationDot}
                          />
                          {selectDropoff.name ?? " Select Dropoff location"}
                        </Button>
                        <h5 className="md_head">PICKUP DATE & TIME</h5>
                        <Form.Control
                          type="datetime-local"
                          id="input5"
                          aria-describedby="passwordHelpBlock"
                          placeholder="Select Pickup Date & Time"
                          className="input_bx"
                          onChange={(e) => {
                            handleDateTimeChange(e.target.value);
                          }}
                        />{" "}
                        {/* <Comment /> */}
                        <Button
                          onClick={() => setopenComment(!openComment)}
                          aria-controls="example-collapse-text"
                          aria-expanded={openComment}
                          className="commentsbtn"
                        >
                          Comment
                        </Button>
                        <Collapse in={openComment}>
                          <div id="example-collapse-text">
                            <InputGroup>
                              <Form.Control
                                as="textarea"
                                aria-label="With textarea"
                                className="comnt_txt"
                                onChange={(e) => {
                                  setComments(e.target.value);
                                }}
                              />
                            </InputGroup>
                          </div>
                        </Collapse>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        className="procced_btn"
                        onClick={() => handleProceedToNext()}
                      >
                        PROCEED TO NEXT
                      </Button>
                    </Modal.Footer>
                  </Modal>{" "}
                  <TripCreatedSuccessModal
                    setPaymentSuccessModalsShow={setPaymentSuccessModalsShow}
                    paymentSuccessModalsShow={paymentSuccessModalsShow}
                  />
                  <Modal
                    show={showPickup}
                    onHide={() => setShowPickup(false)}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="example-custom-modal-styling-title">
                        Select Pickup location
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form className="asdasd">
                        {/* <div className="mb-3"> */}
                        {locations.map((location) => {
                          if (location.id != selectDropoff.id) {
                            return (
                              <Form.Check
                                onClick={(e) => {
                                  changeLocationPoints(e, "pickup", location);
                                }}
                                label={location.name}
                                value={location}
                                name="group1"
                                type="radio"
                                id={location.id}
                              />
                            );
                          }
                        })}
                        {/* </div> */}
                      </Form>
                    </Modal.Body>
                  </Modal>
                  <Modal
                    show={showDropOff}
                    onHide={() => setShowDropoff(false)}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="example-custom-modal-styling-title">
                        Select Dropoff location
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form className="asdasd">
                        {/* <div className="mb-3"> */}
                        {locations.map((location) => {
                          if (location.id != selectPickup.id) {
                            return (
                              <Form.Check
                                onClick={(e) => {
                                  changeLocationPoints(e, "dropoff", location);
                                }}
                                label={location.name}
                                value={location}
                                name="group1"
                                type="radio"
                                id={location.id}
                              />
                            );
                          }
                        })}
                        {/* </div> */}
                      </Form>
                    </Modal.Body>
                  </Modal>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <div className="for_small_screen">
          <Row>
            <Col md={1}></Col>
            <Col md={10}>
              <div className="singletrip_card">
                <div className="add_btn_card"></div>
              </div>
            </Col>
            <Col md={1}></Col>
          </Row>
        </div>
        <Row>
          <Col md={1}></Col>
          <Col md={10}>
            <Button
              variant="primary"
              onClick={() => {
                handleBookPackage();
              }}
              // onClick={handleOtpOpen}
              className="bookbtn"
            >
              Book
            </Button>

            <div className="modal_plac">
              <Modal
                show={showOtpModal}
                onHide={handleOtpClose}
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
                  {/* <CreatePaymentModal closeOtp={handleOtpClose} /> */}
                  <CreatePaymentModal
                    onClick={() => {
                      navigate("/availablecars");
                    }}
                  />
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
          <Col md={1}></Col>
        </Row>
      </Container>
    </div>
  );
}

const CreatePaymentModal = (props) => {
  const [paymentModalShow, setPaymentModalShow] = useState(false);
  const navigate = useNavigate();

  const navigateToPath = (path) => {
    navigate(path);
  };
  // const paymentOptionDone = () => {
  //   props.closeOtp();
  //   setPaymentModalShow(true);
  // };

  return (
    <>
      {/* <Button className="modal_btn" onClick={() => setShow(true)}>
          {" "}
          collaboration
        </Button> */}
      {/* <Button variant="primary" className="bookbtn" onClick={paymentOptionDone}> */}
      <Button
        variant="primary"
        className="bookbtn"
        onClick={() => {
          navigate("/availablecars");
        }}
      >
        Book
      </Button>
      <Modal
        show={paymentModalShow}
        onHide={() => setPaymentModalShow(false)}
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
              <Button
                variant="primary"
                className="bookbtn"
                onClick={() => {
                  navigate("/");
                }}
              >
                Pay 250SAR
              </Button>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};
