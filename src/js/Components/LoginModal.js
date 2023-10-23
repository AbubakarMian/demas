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

  // const {showLoginModal, setShowLoginModal} = props;

  // const { showLoginModal, setShowLoginModalArea } = useState(true);

  // const [showLoginModal, setShowLoginModal] = useState(false);

  // const [showLoginModal, setShowLoginModalArea] = useState(!contextState.user.is_loggedin);
  const [showLoginModal, setShowLoginModalArea] = useState(
    contextState.show_login_modal
  );
  const [showSendOtp, setShowSendOtp] = useState(true);
  const [showValidateOtp, setshowValidateOtp] = useState(false);
  const [phone_no, setPhoneNumber] = useState("");
  const [whatsapp_no, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});

  const navigate = useNavigate();
  console.log("props create otpnew modal ", props);


  const getOtp = async () => {
    console.log("get otp");
    try {
      if (!phone_no || !email) {
        return;
      }
      let formData = new FormData();
      formData.append("phone_no", phone_no);
      formData.append("email", email);
      formData.append("whatsapp_no", whatsapp_no);
      const res = await SendRequest(
        contextState,
        "post",
        Constant.register_or_login,
        formData
      );

      if (res.status) {
        let user = res.response;
        user.is_loggedin = true;
        setUser(user);
        // updateContextState(user,'update_user');
        // updateContextState(res.response,'update_user');
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
  const validateOtp = async () => {
    if (!otp) {
      return;
    }
    let formData = new FormData();
    formData.append("otp", otp);
    formData.append("access_token", user.access_token);
    const res = await SendRequest(
      contextState,
      "post",
      Constant.validate_otp,
      formData
    );

    if (res.status) {
      res.response.is_loggedin = true;
      updateContextState(res.response, "update_user");
      updateContextState(false, "show_login_modal");
    } else {
      if (res.error && res.error.message) {
        setError(res.error.message[0]);
      } else {
        setError("Somthing went wrong contact admin.");
      }
    }
  };

  const handleCloseOtp = () => {
    setShowLoginModalArea(false);
    updateContextState(false, "show_login_modal");
    // console.log("handle close otpfalse ", props.handleOtpPaymentModals);
  };

  return (
    <>
      <div className="modal_plac">
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
        <Modal
          // backdrop="static"
          // show={showLoginModal}
          show={contextState.show_login_modal}
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
                <Form.Label htmlFor="basic-url">Whatsapp Number</Form.Label>
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
                    onChange={(e) => setWhatsapp(e.target.value)}
                  />
                </InputGroup>
                <Form.Label htmlFor="basic-url">Email</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon3">
                    <div className="img_flag">
                      <img src="./images/saudi-arabia.png" />
                    </div>
                  </InputGroup.Text>
                  <Form.Control
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    placeholder="name@example.com"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => {
                      setOtp(e.target.value);
                    }}
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
