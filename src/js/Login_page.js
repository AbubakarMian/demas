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
import Common, { googleTranslate, SendRequest } from "../common/Common";

export default function Login_page_style() {
  const navigate = useNavigate();

  const navigateToPath = (path) => {
    navigate(path);
  };
  const [show, setShow] = useState(false);
  const { contextState, updateContextState } = useContext(ContextApiContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const attempt_login = async () => {
    try {
      // Create the formData and append the email and password
      var formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      // Call SendRequest with the necessary parameters
      let cs = contextState;
      cs.user.access_token = Constant.basic_token;
      const res = await SendRequest(cs, "POST", Constant.login, formData);

      if (res.status) {
        updateContextState(res.response, "update_user");

        let role_id = res.response.role_id;
        if (role_id === 2) {
          try {
            const access_token = contextState.user.access_token;
            const user = contextState.user.id;
            const headers = {
              Accept: "application/json",
              Authorization: access_token,
              "Authorization-secure": access_token,
              "client-id": "demas-app-mobile",
            };

            const response = await fetch(`${Constant.login}/${user}`, {
              method: "GET",
              headers: headers,
            });

            const data = await response.json();
            console.log("datadd", data);

            if (response.ok) {
              if (data.response == "available") {
                navigateToPath("/home");
              } else {
                console.error("NO AVAILABLE ORDERS.");
              }
            } else {
              console.error("NO AVAILABLE ORDERS.");
            }
          } catch (error) {
            console.error("Error checking available orders:", error);
          }
        } else if (role_id === 3) {
          navigateToPath("/orderlist");
        }
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred while logging in. Please try again.");
    }
  };
  const [open, setOpen] = useState(false);

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
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">#</InputGroup.Text>
                <Form.Control
                  placeholder="Whatsapp Number"
                  aria-label="Whatsapp"
                  aria-describedby="basic-addon1"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password} // Bind the password state to the input value
                />
              </InputGroup>{" "}
            </div>
          </Row>
          <Row>
            <div className="otp_bt_area">
              <Button className="otpbtn" onClick={() => attempt_login()}>
                SEND OTP
              </Button>
              {/* <Button className="otpbtn" onClick={() => setShow(true)}>
      SEND OTP 
      </Button> */}
              <Modal
                show={show}
                onHide={() => setShow(false)}
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
                      placeholder="Enter OTp"
                      aria-label="otp"
                      aria-describedby="basic-addon1"
                      type="number"
                    />
                  </InputGroup>
                  <Button href="/home" variant="primary" className="otpbtn">
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

// const Otp_button = () => {
//   return (

//     <Button  href="/" variant="primary" className="otpbtn">SEND OTP</Button>
//   );
// }
