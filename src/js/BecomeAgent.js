import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./../styles/become_agent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FaWhatsapp } from "react-icons/fa";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faMobileScreenButton } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
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

export default function BecomeAgent() {
  const navigate = useNavigate();

  const navigateToPath = (path) => {
    navigate(path);
  };
  const { contextState, updateContextState } = useContext(ContextApiContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [password, setPassword] = useState("");
  const [phone_no, setPhoneNo] = useState("");
  const [whatsapp_no, setWhatsapp] = useState("");
  const [successModal, setSuccessModal] = useState(false);

  const CreateNewAgent = async () => {
    try {
      // Create the formData and append the email and password
      console.log("test login 111");
      var formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone", phone_no);
      formData.append("comment", comment);
      formData.append("whatsapp", whatsapp_no);
      console.log("email", email);
     
      console.log("phone_no", phone_no);

      let cs = contextState;
      cs.user.access_token = Constant.basic_token;
      const res = await SendRequest(
        cs,
        "POST",
        Constant.create_request_new_agent,
        formData
      );
      console.log("test res", res);

      if (res.status) {
        setSuccessModal(true);
      } else {
        updateContextState(res.error.message[0], "error_msg");

        // setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      updateContextState(
        "An error occurred while logging in. Please try again.",
        "error_msg"
      );

      // setError("An error occurred while logging in. Please try again.");
    }
  };

  const hideSuccessModal = async () => {
    setSuccessModal(false);
    navigateToPath('/home');
  };

  return (
    <div>
      <Container fluid>
        <Row>
          <div className="agent_head">
            <div className="backicons">
              <Button
                className="bcbtn"
                onClick={() => {
                  navigate(-1);
                }}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </Button>
            </div>{" "}
            <h3 className="agent_heading_page">AGENT</h3>
          </div>
        </Row>
      </Container>
      <div className="login_ba">
        <Container>
          <div className="whl_login">
            <Row>
              <div className="input_area">
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    <FontAwesomeIcon icon={faUser} />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Name"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setName(e.target.value)}
                    value={name} // Bind the email state to the input value
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    <FontAwesomeIcon icon={faPhone} />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Email Address"
                    aria-label="Email"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email} // Bind the email state to the input value
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    <FontAwesomeIcon icon={faMobileScreenButton} />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Phone Number"
                    aria-label="Whatsapp"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setPhoneNo(e.target.value)}
                    value={phone_no} // Bind the password state to the input value
                  />
                </InputGroup>{" "}
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                  <FaWhatsapp className="icons" />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Whatsapp Number"
                    aria-label="Whatsapp"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setWhatsapp(e.target.value)}
                    value={whatsapp_no} // Bind the password state to the input value
                  />
                </InputGroup>{" "}
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    <FontAwesomeIcon icon={faLock} />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="password"
                    aria-label="Whatsapp"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password} // Bind the password state to the input value
                  />
                </InputGroup>{" "}
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    <FontAwesomeIcon icon={faComment} />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Comment"
                    aria-label=""
                    aria-describedby="basic-addon1"
                    onChange={(e) => setComment(e.target.value)}
                    value={comment} // Bind the password state to the input value
                  />
                </InputGroup>{" "}
              </div>
            </Row>
            <Row>
              <div className="otp_bt_area">
                <Button className="otpbtn" onClick={() => CreateNewAgent()}>
                  Send
                </Button>
                <Modal
                  show={successModal}
                  onHide={() => hideSuccessModal()}
                  dialogClassName="modal-90w"
                  aria-labelledby="example-custom-modal-styling-title"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                      Success
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Request Sent Successfully
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
