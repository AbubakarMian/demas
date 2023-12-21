import React, { useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "../../styles/paymentoption.css";
import Carousel from "react-bootstrap/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

import { ContextApiContext } from "../../context/ContextApi";
import { SendRequest } from "../../common/Common";
import { Constant } from "../../common/Constants";
// import {
//   SendRequest
// } from "../common/Common";

const PaymentOptions = (props) => {
  
  const { contextState, updateContextState } = useContext(ContextApiContext);
  const [activeTab, setActiveTab] = useState("card"); // To track the active tab
  const [order, setOrder] = useState({}); // To track the active tab
  const [payObjType, setPayObjType] = useState(""); // To track the active tab

  const handleClose = () => {
    props.setShowPaymentModal(false);
    setActiveTab("card"); // Reset active tab when closing
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (props.order !== undefined) {
      setOrder(props.order);
      setPayObjType(props.payObjType);
      console.log("props.order_id", props.order);
      console.log("props.payObj", props.payObjType);
    }
  }, [props.order]);

  const collect_payment = async () => {
    
  let formData = new FormData();
  formData.append('order_type',payObjType);
    const res = await SendRequest(
      "post",
      Constant.collect_payment + "/" + order.id,
      formData,
      true
    );

    if (res.status) {
      console.log('paied ',res);
      updateContextState("show payment success modal", "error_msg");
      // show payment success modal
    } else {
      updateContextState("Payment failed", "error_msg");
    }
  };

  return (
    <>
      {/* <Button className="mange_btn" onClick={()=>props.setShowPaymentModal(true)}>
        Pay Now
      </Button> */}

      <Modal
        show={props.showPaymentModal}
        onHide={handleClose}
        dialogClassName="custom-modal"
      >
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
                <Button variant="primary" className="pay_bt" onClick={()=>{
                    updateContextState(
                      "Online payment currently not avalible ",
                      "error_msg"
                    );
                }}>
                  Pay
                </Button>
              </div>
            )}

            {activeTab === "wallet" && (
              <div
                className={`tab-pane ${activeTab === "wallet" ? "active" : ""}`}
              >
                <h4>Cash Payment</h4>
                <p className="cash_para">
                  Collect <br></br>
                  <span className="money">SAR 500</span><br></br>
                   Cash from User
                </p>
                <Button
                  className="conf_btn"
                  variant="primary"
                  onClick={()=>collect_payment()}
                >
                  Cash Collected
                </Button>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default PaymentOptions;
