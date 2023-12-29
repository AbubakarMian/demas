import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./../styles/login_page.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import { Constant } from "../common/Constants";
import { ContextApiContext } from "../context/ContextApi";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Common, { googleTranslate, is_driver, SendRequest } from "../common/Common";

export default function Login_page_style() {
  const navigate = useNavigate();

  const navigateToPath = (path) => {
    navigate(path);
  };
  const [show, setShow] = useState(false);
  const { contextState, updateContextState } = useContext(ContextApiContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone_no, setPhoneNo] = useState("");
  const [whatsapp_no, setWhatsapp] = useState("");
  const [OTPShow, setOTPShow] = useState(false);
  const [otp, setOtp] = useState("");
  const [user, setUser] = useState({});

  const attempt_login = async () => {
    try {
      // Create the formData and append the email and password
      console.log("test login 111");
      var formData = new FormData();
      formData.append("email", email);
      // formData.append("phone_no", phone_no);
      formData.append("whatsapp_no", whatsapp_no);
      console.log("email", email);
      console.log("phone_no", phone_no);

      const res = await SendRequest(
        "POST",
        Constant.register_or_login,
        formData
      );
      console.log("test res", res);

      if (res.status) {
        let user = res.response;
        setOTPShow(true);
        setUser(user);
        // user.is_loggedin = true;
        // updateContextState(user,'update_user');
        // navigateToPath("/home");
      } else {
        updateContextState(res.error.message[0],"error_msg");
      }
    } catch (error) {
      console.error("Error during login:", error);
      updateContextState("An error occurred while logging in. Please try again.","error_msg");
    }
  };
  const [open, setOpen] = useState(false);

  const validateOtp = async () => {
    if (!otp) {
      updateContextState("Enter OTP","error_msg");

      return;
    }
    let formData = new FormData();
    formData.append("otp", otp);
    console.log('otp',otp);
    console.log('access_token',user.access_token);
    formData.append("access_token", user.access_token);
    const res = await SendRequest(
      "post",
      Constant.validate_otp,
      formData
    );
    
    if (res.status) {
      res.response.is_loggedin = true;
      updateContextState(res.response, "update_user");
      if(is_driver()){
        navigateToPath('/managebookings')            
      }
      else{
        navigateToPath('/home')
      }
      // navigateToPath('/home');
    } else {
      if (res.error && res.error.message) {
        updateContextState(res.error.message[0],"error_msg");
      } else {
      updateContextState(
        "Somthing went wrong contact admin",
        "error_msg"
      );
      }
    }
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
            <h3 className="top_heading_page">LOGIN</h3>
          </div>
        </Row>
      </Container>
      <div className="login_back">
        <Container>
          <div className="whl_login">
            <Row>
              <div className="input_area">
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                  <Form.Control
                    placeholder="Email Address"
                    aria-label="Email"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email} // Bind the email state to the input value
                  />
                </InputGroup>
                {/* <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">#</InputGroup.Text>
                  <Form.Control
                    placeholder="Phone Number"
                    aria-label="Whatsapp"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setPhoneNo(e.target.value)}
                    value={phone_no} // Bind the password state to the input value
                  />
                </InputGroup>{" "} */}
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">#</InputGroup.Text>
                  <Form.Control
                    placeholder="Whatsapp Number"
                    aria-label="Whatsapp"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setWhatsapp(e.target.value)}
                    value={whatsapp_no} // Bind the password state to the input value
                  />
                </InputGroup>{" "}
              </div>
            </Row>
            <Row>
              <div className="otp_bt_area">
                <Button className="otpbtn" onClick={() => attempt_login()}>
                  SEND OTP
                </Button>
                <Modal
                  show={OTPShow}
                  onHide={() => setOTPShow(false)}
                  dialogClassName="modal-90w"
                  aria-labelledby="example-custom-modal-styling-title"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                      OTP
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">#</InputGroup.Text>
                      <Form.Control
                        placeholder="Enter OTP"
                        aria-label="otp"
                        aria-describedby="basic-addon1"
                        type="number"
                        onChange={(e)=>setOtp(e.target.value)}
                      />
                    </InputGroup>
                    <Button
                      onClick={() => validateOtp()}
                      variant="primary"
                      className="otpbtn"
                    >
                      Login
                    </Button>
                  </Modal.Body>
                </Modal>
              </div>
            </Row>
          </div>
        </Container>
      </div>
    </div>
  );
}
