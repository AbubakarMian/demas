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
import {
  faSliders,
  faCheck,
  faSuitcaseRolling,
  faDoorOpen,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
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
     
      console.log("props.sad", props.sad);
      console.log("props.order", props.order);
      console.log("props.payObj", props.payObjType);
      initFunction();
    }
  }, [props.order]);

  const initFunction=()=>{
    let orderobj = props.order;
    setOrder(props.order);
    setPayObjType(props.payObjType);
    console.log('order',props.order);
    let total = 0;
    // orderobj.map((item)=>{

    // });

  }

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
      updateContextState(setPaymentSuccessModalShow(true));
      // show payment success modal
    } else {
      updateContextState("Payment failed", "error_msg");
    }
  };
  const [modalPaymentSuccessShow, setPaymentSuccessModalShow] = React.useState(false);


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
        <>
      {/* <Button variant="primary" onClick={() => setPaymentSuccessModalShow(true)}>
       PaymentSuccessModal
      </Button> */}

      <PaymentSuccessModal
        show={modalPaymentSuccessShow}
        onHide={() => setPaymentSuccessModalShow(false)}
      />
    </>
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
                  Pay SAR {order.customer_collection_price}
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
                  <span className="money">SAR {order.customer_collection_price}</span><br></br>
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
function PaymentSuccessModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        </Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
      {/* <div class="modal-content"> */}


<div class="modal-succ">
    <div class="icon_tick_area">
    <FontAwesomeIcon icon={faCheck} class="icon_tick"/>
    </div>
    <div class="inite_Succ_hed">
       Success
    </div>
    <div class="inite_Succ_txt">
       Payment Successful.
    </div>
    <div class="mdl_btn">
    <Button onClick={props.onHide} className="btn btn-primary succ_mdl" data-dismiss="modal">OK</Button>
       
    </div>
{/* </div> */}



</div>
      </Modal.Body>
      
    </Modal>
  );
}
export default PaymentOptions;
