import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./../../styles/availblecar.css";
import "./../../styles/transport_details.css";
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
import Nav_bar_area from "../NavBar";
import { ContextApiContext } from "../../context/ContextApi";
import { SendRequest } from "../../common/Common";
import { Constant } from "../../common/Constants";
import { Alert } from "react-bootstrap";

export default function LoginModal(props) {
  const { contextState, updateContextState } = useContext(ContextApiContext);

  // const [showLoginModal, setShowLoginModal] = props;
  // const {showLoginModal, setShowLoginModal} = props;
  const { showLoginModal, setShowLoginModal } = props;

  // const [showLoginModal, setShowLoginModal] = useState(false);

  const [showSendOtp, setShowSendOtp] = useState(true);
  const [showValidateOtp, setshowValidateOtp] = useState(false);
  const [phone_no, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  console.log("props create otpnew modal ", props);

  useEffect(() => {
    console.log("props create contextState", contextState);
    const user = contextState.user;
    // if (user.is_loggedin) {
    //   setShowLoginModal(false);
    // } else {
    //   setShowLoginModal(true);
    // }
  }, [contextState.user]);

  const getOtp = async () => {
    console.log("get otp");
    try {
      let formData = new FormData();
      formData.append("phone_no", phone_no);
      const res = await SendRequest(contextState, "post", Constant.sendotp, formData);
      
      if (res.status) {
        updateContextState(res.response,'update_user');
        // let cars_list = res.response;
        // setTransportList(cars_list);
        // console.log("get cars list ", cars_list);
      } else {
        setError("Login failed. Please check your credentials.");
      }

      setShowSendOtp(false);
      setshowValidateOtp(true);
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred while logging in. Please try again.");
    }
  };
  const validateOtp = () => {};

  const handleCloseOtp = () => {
    setShowLoginModal(false);
    // console.log("handle close otpfalse ", props.handleOtpPaymentModals);
  };

  return !showLoginModal ? (
    <></>
  ) : (
    <>
      <div className="modal_plac">
      {error && (
        <div className="error-message">
          <Alert variant="danger">{error}</Alert>
        </div>
      )}
        <Modal
          // backdrop="static"
          show={showLoginModal}
          // show={showSendOtp}
          onHide={handleCloseOtp}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Enter Otp to Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {!showSendOtp ? null : (
              <>
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
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </InputGroup>
                <Button onClick={() => getOtp()}>Send OTP</Button>
              </>
            )}

            {!showValidateOtp ? null : (
              <>
                <Form.Label htmlFor="basic-url">Enter OTP</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    placeholder="OTP"
                  />
                </InputGroup>
                <Button onClick={() => validateOtp()}>Login</Button>
              </>
            )}
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
