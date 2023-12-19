import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
// import './home.css';
import Carousel from "react-bootstrap/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

export default function PaymentModal() {
  const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [activeTab, setActiveTab] = useState("card"); // To track the active tab

  const handleClose = () => {
    setShow(false);
    setActiveTab("card"); // Reset active tab when closing
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Button className="mange_btn" onClick={handleShow}>
        Pay Now
      </Button>

      <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Payment Options</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "card" ? "active" : ""}`}
                onClick={() => handleTabChange("card")}
              >
                Card Payment
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "wallet" ? "active" : ""}`}
                onClick={() => handleTabChange("wallet")}
              >
                Cash Payment
              </button>
            </li>
          </ul>

          <div className="tab-content">
            {activeTab === "card" && (
              <div
                className={`tab-pane ${activeTab === "card" ? "active" : ""}`}
              >
                <h4>Card Payment</h4>
                <Form>
                  <Form.Group className="mb-3" controlId="cardNumber">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control type="text" placeholder="Card Number" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="expiryDate">
                    <Form.Label>Expiry Date</Form.Label>
                    <Form.Control type="text" placeholder="MM/YYYY" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="securityCode">
                    <Form.Label>Security Code (CVC)</Form.Label>
                    <Form.Control type="text" placeholder="CVC" />
                  </Form.Group>
                </Form>
              </div>
            )}

            {activeTab === "wallet" && (
              <div
                className={`tab-pane ${activeTab === "wallet" ? "active" : ""}`}
              >
                <h4>Cash Payment</h4>
                {/* <p>Collect SAR 500 from User</p> */}
                <p>
                  Subject: Immediate Payment Request:{" "}
                  <span className="money">SAR 500</span> for Your Recent Trip
                </p>
                <Button className="conf_btn" variant="primary" onClick={handleClose}>
                  Confirm Collection SAR 500
                </Button>
                {/* <Form>
                    <Form.Group className="mb-3" controlId="walletAmount">
                      <Form.Label>Enter Amount</Form.Label>
                      <Form.Control type="text" placeholder="Amount" />
                    </Form.Group>
                  </Form> */}
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            PROCEED
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
