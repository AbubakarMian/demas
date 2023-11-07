import React, { useEffect, useContext } from "react";
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
import Alert from "react-bootstrap/Alert";

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
import { useNavigate, useLocation } from "react-router-dom";
import { Constant } from "../common/Constants";
import { ContextApiContext } from "../context/ContextApi";
import Common, { googleTranslate, SendRequest } from "../common/Common";

export default function AvailableCars() {
  const navigate = useNavigate();
  const location = useLocation();
  const { contextState, updateContextState } = useContext(ContextApiContext);
  const [transportlist, setTransportList] = useState([]);
  const [bookingDetails, setBookingDetails] = useState([]);
  const [applyDiscount, setApplyDiscount] = useState(false);
  const [error, setError] = useState(null);

  const navigateToPath = (path, props) => {
    navigate(path, { state: props });
  };

  useEffect(() => {
    console.log("props from previous screen ", location.state);
    get_transport();
    init_state_variables();
  }, []);

  const init_state_variables = () =>{
    let booking_obj = location.state?.booking_obj;

    if (typeof booking_obj !== "undefined" && booking_obj !== null) {
      if(booking_obj.details.length!=0 && booking_obj.details.length % 3 === 0 ){
        setApplyDiscount(true);
      }
    }
    else{
      setApplyDiscount(false);
    }
  }

  const get_transport = async () => {
    try {
      let cs = contextState;
      cs.user.access_token = Constant.basic_token;
      let booking_obj = location.state?.booking_obj;
      console.log("booking_obj", booking_obj);
      let current_booking = {};
      let booking_filters = "";
      if (typeof booking_obj !== "undefined" && booking_obj !== null) {
        current_booking = booking_obj.details[booking_obj.details.length - 1];
        booking_filters = `?pickup_id=${current_booking.pickup_id}&dropoff_id=${current_booking.dropoff_id}&pickupdate_time=${current_booking.pickupdate_time}`;
        console.log("res", current_booking);
      }

      let get_car_url = `${Constant.get_cars}` + booking_filters;
      const res = await SendRequest(cs, "GET", get_car_url);

      if (res.status) {
        let cars_list = res.response.data;
        setTransportList(cars_list);
        console.log("get cars list ", cars_list);
      } else {
        setError("Transport List unavalible contact admin");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Transport List unavalible contact admin.");
    }
  };

  const selectTransport = (transport) => {
    let transport_id = transport.id;
    transport.apply_discount = applyDiscount;
    console.log("my transport", transport);
    if (location.state) {
      let booking_obj = location.state.booking_obj;
      booking_obj.details[booking_obj.details.length - 1].transport_id =
        transport_id;
      booking_obj.details[booking_obj.details.length - 1].transport_type_id =
        transport.transport_type_id;
      booking_obj.details[booking_obj.details.length - 1].transport_type_name =
      transport.transport_type.name;
      booking_obj.details[booking_obj.details.length - 1].apply_discount =applyDiscount;
      
      setBookingDetails({ ...location.state.booking_obj, booking_obj });
      navigateToPath("/transport_details", { transport, booking_obj });
    } else {
      navigateToPath("/home");
    }
  };

  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="alert-fixed">
        <Alert
          className=""
          show={error}
          dismissible={true}
          onClose={() => setError("")}
          variant="danger"
        >
          {error}
        </Alert>
      </div>
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
            <h3 className="top_heading_page">Available Cars</h3>
          </div>
        </Row>
      </Container>
      <div className="cont_type">
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
        </Container>
        <div
          className="asdas const_paddingaa"
          onClick={() => {
            // navigate("/transport_details");
          }}
        >
          {/* <Sedan_crousel /> */}
        </div>
        <div>
          {/* start map*/}
          {transportlist.map((item) => {
            return (
              <div>
                <Row className="const_padding">
                  <Col>
                    <div className="car_typ">
                      Type - {item.transport_type.name}
                    </div>
                  </Col>
                  <Col>
                    <div className="rates">{item.booking_price} SAR <span className="top_headn">(per trip)</span></div>
                </Col>
                {applyDiscount ?  
                 <Col>
                 <div className="rates"> {item.discounted_price} SAR <span className="top_headn">(Discounted Fare)</span></div>
               </Col>
               :null}
                 
                </Row>
                <Row className="const_padding">
                  <Col>
                    <div className="car_nme">
                      {item.transport_type.name} or Similar
                    </div>
                  </Col>
                  <Col>
                    <div className="similr">(or Similar)</div>
                  </Col>
                </Row>
                <Row className="asdas const_paddingaa">
                  <div
                    className="slider-section"
                    onClick={() => {
                      selectTransport(item);
                    }}
                  >
                    <Carousel className="slider_bdr slide_availcars">
                      {item.images.map((image) => {
                        return (
                          <Carousel.Item>
                            <img
                              className="d-block w-100"
                              src={image}
                            />
                            <Carousel.Caption></Carousel.Caption>
                          </Carousel.Item>
                        );
                      })}
                    </Carousel>
                  </div>
                </Row>
                <Row className="icn_ara">
                  <Col>
                    <FontAwesomeIcon className="detail_icn" icon={faUser} />
                    <span>{item.transport_type.seats}</span>
                  </Col>
                  <Col>
                    <FontAwesomeIcon
                      className="detail_icn"
                      icon={faSuitcaseRolling}
                    />
                    <span>{item.transport_type.luggage}</span>
                  </Col>
                  <Col>
                    <FontAwesomeIcon className="detail_icn" icon={faDoorOpen} />
                    <span>{item.transport_type.doors}</span>
                  </Col>
                </Row>
              </div>
            );
          })}
          {/* end map */}
        </div>
        {/* </Container> */}
      </div>
    </div>
  );
}