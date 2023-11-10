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
import { Constant } from "../common/Constants";
import { ContextApiContext } from "../context/ContextApi";
import { googleTranslate, SendRequest } from "../common/Common";
import PaymentModal from './Components/PaymentOptions';


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

  const get_orders = async () => {
    try {
      let cs = contextState;
      const res = await SendRequest(cs, "GET", Constant.orders, null, true);
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
            <h3 className="top_heading_page">MANAGE BOOKINGS</h3>
          </div>
        </Row>
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
                {/* <Col>
                  <div className="top_hed_bt">
                    {" "}
                    <Button className="hed_btn">
                      <p className="cd_hd">Payment Type</p>Card
                    </Button>
                  </div>
                </Col> */}
                <Col>
                  <div className="top_hed_bt flx">
                    {" "}<p className="cd_hd">Status</p>
                    <Button className="hed_btn">
                      Pending
                    </Button>
                  </div>
                </Col>
              </Row>
              <div className="det_box">
                <div className="det_area">
                  <Row className="">
                    <Col>
                      {booking.order_details.map((booking_details) => {
                        return <p>{booking_details.journey.name}</p>;
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
                            state: { booking_details: booking },
                          });
                        }}
                      >
                        {booking.trip_type == "single" ? (
                          <>
                            SINGLE TRIP{" "}
                            <FontAwesomeIcon
                              className="icon_btn"
                              icon={faLocationDot}
                              beat
                            />
                          </>
                        ) : (
                          <>
                            {/* Packages{" "}
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
                      <PaymentModal />
                      {/* <Button className="mange_btn">Pay Now</Button> */}
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          );
        })}
        {/* <Row className="det_box">
          <Col>
            <div className="det_area">
              <h4>DETAIL</h4>
              <p>Jeddah Airport to Jeddah Airport</p>
              <Button
                className="mange_btn"
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
              <Button
                className="mange_btn"
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
        </Row> */}
      </Container>
    </div>
  );
}
const Payment_modal = () => {
  // const [show, setShow] = useState(false);

  // // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  // const [activeTab, setActiveTab] = useState("card"); // To track the active tab

  // const handleClose = () => {
  //   setShow(false);
  //   setActiveTab("card"); // Reset active tab when closing
  // };

  // const handleTabChange = (tab) => {
  //   setActiveTab(tab);
  // };

  // return (
  //   <>
  //     <Button className="mange_btn" onClick={handleShow}>
  //       Pay Now
  //     </Button>

  //     <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
  //       <Modal.Header closeButton>
  //         <Modal.Title>Payment Options</Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body>
  //         <ul className="nav nav-tabs">
  //           <li className="nav-item">
  //             <button
  //               className={`nav-link ${activeTab === "card" ? "active" : ""}`}
  //               onClick={() => handleTabChange("card")}
  //             >
  //               Card Payment
  //             </button>
  //           </li>
  //           <li className="nav-item">
  //             <button
  //               className={`nav-link ${activeTab === "wallet" ? "active" : ""}`}
  //               onClick={() => handleTabChange("wallet")}
  //             >
  //               Wallet
  //             </button>
  //           </li>
  //         </ul>

  //         <div className="tab-content">
  //           {activeTab === "card" && (
  //             <div
  //               className={`tab-pane ${activeTab === "card" ? "active" : ""}`}
  //             >
  //               <h4>Card Payment</h4>
  //               <Form>
  //                 <Form.Group className="mb-3" controlId="cardNumber">
  //                   <Form.Label>Card Number</Form.Label>
  //                   <Form.Control type="text" placeholder="Card Number" />
  //                 </Form.Group>

  //                 <Form.Group className="mb-3" controlId="expiryDate">
  //                   <Form.Label>Expiry Date</Form.Label>
  //                   <Form.Control type="text" placeholder="MM/YYYY" />
  //                 </Form.Group>

  //                 <Form.Group className="mb-3" controlId="securityCode">
  //                   <Form.Label>Security Code (CVC)</Form.Label>
  //                   <Form.Control type="text" placeholder="CVC" />
  //                 </Form.Group>
  //               </Form>
  //             </div>
  //           )}

  //           {activeTab === "wallet" && (
  //             <div
  //               className={`tab-pane ${activeTab === "wallet" ? "active" : ""}`}
  //             >
  //               <h4>Wallet Payment</h4>
  //               <p>Your available wallet balance: $100</p>
  //               <Form>
  //                 <Form.Group className="mb-3" controlId="walletAmount">
  //                   <Form.Label>Enter Amount</Form.Label>
  //                   <Form.Control type="text" placeholder="Amount" />
  //                 </Form.Group>
  //               </Form>
  //             </div>
  //           )}
  //         </div>
  //       </Modal.Body>
  //       <Modal.Footer>
  //         <Button variant="secondary" onClick={handleClose}>
  //           Close
  //         </Button>
  //         <Button variant="primary" onClick={handleClose}>
  //           PROCEED
  //         </Button>
  //       </Modal.Footer>
  //     </Modal>
  //   </>
  // );
};
