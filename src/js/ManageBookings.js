import React, { useEffect, useContext } from "react";
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
  faMagnifyingGlass,
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
import { Constant } from "../common/Constants";
import { ContextApiContext } from "../context/ContextApi";
import {
  get_formated_dateime,
  googleTranslate,
  SendRequest,
} from "../common/Common";
import PaymentOptions from "./Components/PaymentOptions";
import Dropdown from "react-bootstrap/Dropdown";

export default function Manage_Bookings() {
  const navigate = useNavigate();
  const { contextState, updateContextState } = useContext(ContextApiContext);

  const navigateToPath = (path, props) => {
    navigate(path, props);
  };

  useEffect(() => {
    get_orders();
  }, []);

  const [bookingslist, setBookingslist] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentOrder, setPaymentOrderModal] = useState({});

  const get_orders = async () => {
    try {
      const res = await SendRequest("GET", Constant.orders, null, true);
      if (res.status) {
        console.log("orders list ", res.response);
        setBookingslist(res.response);
      } else {
        console.log("resss", res);
        if (res.error.custom_code == 403) {
          updateContextState(true, "show_login_modal");
          updateContextState("Please Login and try again", "error_msg");

          // navigateToPath(-1);
        }
        updateContextState(res.error?.message[0], "error_msg");
      }
    } catch (error) {
      console.error("Error get orders :", error);

      updateContextState("No Bookings avalible.", "error_msg");
    }
  };
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  // const [openFilter, setOpenFilter] = useState(true);

  const setPaymentOrder = (order) => {
    setShowPaymentModal(true);
    setPaymentOrderModal(order);
  };

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
            <h3 className="top_heading_page">MANAGE BOOKINGS</h3>
          </div>
        </Row>
      </Container>
      <Container fluid>
        <Row>
          <Col>
            {/* <Button
        onClick={() => setOpenFilter(!openFilter)}
        aria-controls="filter-collapse-content"
        aria-expanded={openFilter}
        className="sett_btn"
      >
        <FontAwesomeIcon icon={faSliders} />
      </Button> */}
          </Col>
        </Row>
        {/* <Row>
    <Col className="">
      <Collapse in={openFilter}>
        <div id="filter-collapse-content">
          <Row>
          <Col xs={4} md={2}>
          <Dropdown className="ml-2"> 
            <Dropdown.Toggle
              className="dp_btn"
              variant="success"
              id="dropdown-basic"
            >
              All
            </Dropdown.Toggle>
            <Dropdown.Menu className="dp_men">
              <Dropdown.Item >Completed</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Pending</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Bookings</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Processing</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Cancelled</Dropdown.Item>
              <Dropdown.Item href="#/action-3">On Hold</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Refunded</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </Col>
         
          
          </Row>
        </div>
      </Collapse>
    </Col>
  </Row> */}
      </Container>
      <Container fluid>
        {bookingslist.map((booking) => {
          return (
            <div className="det_area">
              <Row>
                <Col>
                  {" "}
                  <div className="bx_head">
                    <h4>DETAILS</h4>
                  </div>
                </Col>
                <Col>
                  <div className="bx_head">
                    {" "}
                    <h4 className="bk_id">{booking.order_id}</h4>
                  </div>
                </Col>
              </Row>
              <div className="det_box">
                <div className="det_area">
                  <Row className="">
                    <Col>
                      {booking.order_details.map((booking_details) => {
                        return (
                          <p>{`${booking_details.journey.name} ${
                            get_formated_dateime(
                              booking_details.pick_up_date_time
                            ).date
                          }`}</p>
                        );
                      })}
                    </Col>
                  </Row>
                  <Row className="">
                    <Col>
                      <Button
                        className="mange_btn"
                        onClick={() => {
                          navigateToPath("/bookinginfopackages", {
                            //bookinginfosingle
                            state: { booking: booking },
                            // state: { booking_details: booking },
                          });
                        }}
                      >
                        {booking.trip_type == "single" ? (
                          <>
                            {/* SINGLE TRIP{" "}
                            <FontAwesomeIcon
                              className="icon_btn"
                              icon={faLocationDot}
                              beat
                            /> */}
                          </>
                        ) : (
                          <>
                            {/* Package{" "}
                          <FontAwesomeIcon
                            className="icon_btn"
                            icon={faArrowRightArrowLeft}
                          /> */}
                            VIEW
                          </>
                        )}
                      </Button>
                    </Col>
                    <Col>
                      {booking.ispayable ? (
                        <Button
                          className="mange_btn"
                          onClick={() => setPaymentOrder(booking)}
                        >
                          Pay Now
                        </Button>
                      ) : null}
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          );
        })}
        <Col>
          <PaymentOptions
            order={paymentOrder}
            payObjType={"order"}
            showPaymentModal={showPaymentModal}
            setShowPaymentModal={setShowPaymentModal}
            successFunction={get_orders}
          />
        </Col>
      </Container>
    </div>
  );
}
