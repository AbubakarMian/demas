import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./../styles/home.css";
import Carousel from "react-bootstrap/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightArrowLeft,
  faUsers,
  faSuitcaseRolling,
} from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Collapse from "react-bootstrap/Collapse";
import InputGroup from "react-bootstrap/InputGroup";
import Nav_bar_area from "./NavBar";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ContextApiContext } from "../context/ContextApi";
import { Alert } from "react-bootstrap";
import { Constant } from "../common/Constants";
import { SendRequest } from "../common/Common";

export default function Package_style() {
  const [showPickup, setShowPickup] = useState(false);
  const [showDropOff, setShowDropoff] = useState(false);
  const navigate = useNavigate();

  const navigateToPath = (path, props) => {
    navigate(path, { state: props });
  };
  const { contextState, updateContextState } = useContext(ContextApiContext);
  const [activeTab, setActiveTab] = useState(0);
  const [openComment, setopenComment] = useState(false);
  const [showPickupExtraInfo, setShowPickupExtraInfo] = useState(false);
  const [showDropoffExtraInfo, setShowDropoffExtraInfo] = useState(false);
  const [placeholderPickupExtraInfo, setPlaceholderPickupExtraInfo] =
    useState("");
  const [placeholderDropoffExtraInfo, setPlaceholderDropoffExtraInfo] =
    useState("");
  const [pickExtrainfo, setPickExtrainfo] = useState("");
  const [dropoffExtrainfo, setDropoffExtrainfo] = useState("");
  const [locations, setLocations] = useState([]);
  const [selectPickup, setselectPickup] = useState({});
  const [selectDropoff, setselectDropoff] = useState({});
  const [pickupTime, setpickupTime] = useState(0);
  const [comments, setComments] = useState("");

  const [transportTypeList, setTransportTypeList] = useState([]);

  const handleProceedToNext = async () => {
    if (!selectPickup.id || !selectDropoff.id || !pickupTime) {
      updateContextState("All fields required", "error_msg");

      return;
    }

    try {
      let verify_journey_url = `${Constant.journey_verify}?pickup_id=${selectPickup.id}&dropoff_id=${selectDropoff.id}`;
      const res = await SendRequest( "GET", verify_journey_url);
      if (res.status) {
        let booking_obj = {
          type: "single",
          details: [
            {
              pickup_id: selectPickup.id,
              pick_extrainfo: pickExtrainfo,
              dropoff_id: selectDropoff.id,
              dropoff_extrainfo: dropoffExtrainfo,
              pickupdate_time: pickupTime,
              comment: comments,
              transport_id: 0,
              transport_type_id: 0,
            },
          ],
        };
        navigateToPath("/availablecars", { booking_obj });
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
  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Loop through the slides
    speed: 500, // Transition speed in milliseconds
    slidesToShow: 3, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at a time
  };

  useEffect(() => {
    getLocations();
    getCarTypes();
  }, []);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const getCarTypes = async () => {
    try {
      let cs = contextState;
      cs.user.access_token = Constant.basic_token;
      const res = await SendRequest("GET", Constant.get_cars_by_types);
      if (res.status) {
        let res_list = res.response;
        setTransportTypeList(res_list);
      } else {
        updateContextState("Unable to get Car types", "error_msg");
      }
    } catch (error) {
      console.error("Error during login:", error);

      updateContextState("Unable to get Car types", "error_msg");
    }
  };

  const getLocations = async () => {
    try {
      const res = await SendRequest( "GET", Constant.get_locations);
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

  const changeLocationPoints = (e, point, location) => {
    let new_val = {};
    let location_type = location.location_type.name;
    let placeholder = location?.location_type?.placeholder;

    if (e.target.checked) {
      new_val = location;
    }
    if (point == "pickup") {
      setPlaceholderPickupExtraInfo(placeholder);
      setShowPickupExtraInfo(placeholder.length);
      if (location_type == "Airport") {
        // setShowPickupExtraInfo(true);
      } else {
        // setShowPickupExtraInfo(false);
        // setPickExtrainfo("");
      }
      setselectPickup(new_val);
    } else {
      // dropoff
      setPlaceholderDropoffExtraInfo(placeholder);
      setShowDropoffExtraInfo(placeholder.length);

      if (location_type == "Airport") {
        // setShowDropoffExtraInfo(true);
      } else {
        // setShowDropoffExtraInfo(false);
        // setDropoffExtrainfo("");
      }

      setselectDropoff(new_val);
    }
    setShowPickup(false);
    setShowDropoff(false);
  };

  const handleDateTimeChange = (dateString) => {
    const timestamp = Math.floor(new Date(dateString).getTime() / 1000);
    setpickupTime(timestamp);
  };
  return (
    <div>
      <Nav_bar_area />
      <div className="homeslider">
        <Home_crousel />
      </div>
      <section className="back_banner">
        <Container fluid>
          <div className="big_screen_adj">
            <div className="big_screen_adj_back">
              <Row>
                <Col>
                  <Button variant="primary" className="singtripbtn">
                    Single Trip{" "}
                    <FontAwesomeIcon
                      className="icon_btn"
                      icon={faLocationDot}
                    />
                  </Button>
                </Col>
                <Col>
                  <Button
                    href="./packages"
                    variant="primary"
                    className="singtripbtn"
                  >
                    Packages{" "}
                    <FontAwesomeIcon
                      className="icon_btn"
                      icon={faArrowRightArrowLeft}
                    />
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col md={1}></Col>
                <Col md={10}>
                  <h3 className="headin">PICKUP</h3>
                </Col>
                <Col md={1}></Col>
              </Row>
              <Row>
                <Col md={1}></Col>
                <Col md={10}>
                  <Button
                    className="pic_btn_modal"
                    onClick={() => setShowPickup(true)}
                  >
                    <FontAwesomeIcon
                      className="icon_btn"
                      icon={faLocationDot}
                    />{" "}
                    {selectPickup.name ?? " Select PickUp Location"}
                    <div className="caret_down">
                      <FontAwesomeIcon icon={faAngleDown} />
                    </div>
                  </Button>
                  <Collapse in={showPickupExtraInfo}>
                    <div id="">
                      <InputGroup>
                        <Form.Control
                          type="text"
                          placeholder={placeholderPickupExtraInfo}
                          onChange={(e) => {
                            setPickExtrainfo(e.target.value);
                          }}
                          value={pickExtrainfo}
                        />
                      </InputGroup>
                    </div>
                  </Collapse>
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
                </Col>
                <Col md={1}></Col>
              </Row>
              <Row>
                <Col md={1}></Col>
                <Col md={10}>
                  <h3 className="headin">DROP OFF</h3>
                </Col>
                <Col md={1}></Col>
              </Row>
              <Row>
                <Col md={1}></Col>
                <Col md={10}>
                  <Button
                    className="pic_btn_modal"
                    onClick={() => setShowDropoff(true)}
                  >
                    <FontAwesomeIcon
                      className="icon_btn"
                      icon={faLocationDot}
                    />{" "}
                    {selectDropoff.name ?? " Select Drop Off Location"}
                    <div className="caret_down">
                      <FontAwesomeIcon icon={faAngleDown} />
                    </div>
                  </Button>
                  <Collapse in={showDropoffExtraInfo}>
                    <div id="">
                      <InputGroup>
                        <Form.Control
                          type="text"
                          placeholder={placeholderDropoffExtraInfo}
                          onChange={(e) => {
                            setDropoffExtrainfo(e.target.value);
                          }}
                          value={dropoffExtrainfo}
                        />
                      </InputGroup>
                    </div>
                  </Collapse>
                  <Modal
                    show={showDropOff}
                    onHide={() => setShowDropoff(false)}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="example-custom-modal-styling-title">
                        Select Drop Off Location
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form className="asdasd">
                        {locations.map((location) => {
                          if (location.id != selectPickup.id) {
                            return (
                              <Form.Check
                                onClick={(e) => {
                                  changeLocationPoints(e, "dropoff", location);
                                }}
                                label={location.name}
                                name="group2"
                                type="radio"
                                value={location.id}
                                id={location.id}
                              />
                            );
                          }
                        })}
                      </Form>
                    </Modal.Body>
                  </Modal>
                </Col>
                <Col md={1}></Col>
              </Row>
              <Row>
                <Col md={1}></Col>
                <Col md={10}>
                  <h3 className="headin">PICKUP DATE & TIME</h3>
                </Col>
                <Col md={1}></Col>
              </Row>
              <Row>
                <Col md={1}></Col>
                <Col md={10}>
                  {/* <Input_area_time /> */}
                  <Form.Control
                    type="datetime-local"
                    id="input5"
                    aria-describedby="passwordHelpBlock"
                    placeholder="Select Pickup Date & Time"
                    className="input_bx"
                    onChange={(e) => {
                      handleDateTimeChange(e.target.value);
                    }}
                  />
                </Col>
                <Col md={1}></Col>
              </Row>
              <Row>
                <Col md={1}></Col>
                <Col md={10}>
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
                </Col>
                <Col md={1}></Col>
              </Row>
              <Row>
                <Col md={1}></Col>
                <Col md={10}>
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleProceedToNext();
                      // navigate("/availablecars");
                    }}
                    className="Proceed_button"
                  >
                    PROCEED TO NEXT
                  </Button>
                </Col>
                <Col md={1}></Col>
              </Row>
            </div>
          </div>
        </Container>
      </section>
      <section className="back_vehicles_section">
        <div>
          <section className="back_banner">
            {/* ... Rest of your code ... */}
          </section>
          <Container>
            <section className="tab_area_bt">
              <h2>Vehicles to Ride</h2>
              <div className="tab_center">
                <div className="tab-buttons">
                  {transportTypeList.map((transportType, index) => {
                    // console.log("transportTypeList", transportTypeList);
                    return (
                      <button
                        key={index}
                        // key={transportType.id}
                        onClick={() => handleTabClick(index)}
                        className={index === activeTab ? "active" : ""}
                      >
                        {transportType.name}
                      </button>
                    );
                  })}
                </div>
                <div className="tab-content">
                  <div className="product-slide">
                    <Slider
                      dots={true} // Show navigation dots
                      infinite={true} // Loop through the slides
                      speed={500} // Transition speed in milliseconds
                      slidesToShow={transportTypeList.length && transportTypeList[activeTab].transports.length < 3 ?
                        transportTypeList[activeTab].transports.length : 3
                      } // Number of slides to show at once
                      slidesToScroll={1} // Number of slides to scroll at a time}
                    >
                      {!transportTypeList.length
                        ? null
                        : transportTypeList[activeTab].transports.map(
                            (transport_detail, index) => {
                              console.log("index", index);
                              return (
                                <div key={transport_detail.id}>
                                  {/* <div key={transport_detail.id}> */}
                                  <img
                                    src={transport_detail.images[0]}
                                    alt={transport_detail.name}
                                  />
                                  <h3>{transport_detail.name}</h3>
                                  <p>
                                    <div className="disc_info">
                                      <FontAwesomeIcon
                                        className="info_icn"
                                        icon={faUsers}
                                      />{" "}
                                      {transport_detail.seats}
                                      <FontAwesomeIcon
                                        className="info_icn"
                                        icon={faSuitcaseRolling}
                                      />
                                      {transport_detail.luggage}
                                    </div>
                                  </p>
                                </div>
                              );
                            }
                          )}
                    </Slider>
                  </div>
                </div>
              </div>
            </section>
          </Container>
        </div>
      </section>
    </div>
  );
}

const Home_crousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100 img-responsive" src="./images/1.jpg" alt="First slide" />
        <Carousel.Caption>
          {/* <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 img-responsive"
          src="./images/4.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          {/* <h3>Second slide label</h3>
          <p> 4 Passengers 2 Luggages</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100 img-responsive" src="./images/5.jpg" alt="Third slide" />

        <Carousel.Caption>
          {/* <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100 img-responsive" src="./images/6.jpg" alt="Third slide" />

        <Carousel.Caption>
          {/* <h3>Fourth slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100 img-responsive" src="./images/7.jpg" alt="Third slide" />

        <Carousel.Caption>
          {/* <h3>Fifth slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100 img-responsive" src="./images/8.jpg" alt="Third slide" />

        <Carousel.Caption>
          {/* <h3>Sixth slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};
