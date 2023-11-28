import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./../styles/contactus.css";
import Carousel from "react-bootstrap/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faComment,
  faUser,
  faSuitcaseRolling,
  faDoorOpen,
  faArrowLeft,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
// import {  } from "@fortawesome/free-solid-svg-icons";
import { FaWhatsapp } from "react-icons/fa";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import InputGroup from "react-bootstrap/InputGroup";
import Nav_bar_area from "./NavBar";
import { useNavigate } from "react-router-dom";
import { Constant } from "../common/Constants";
import { useContext } from "react";
import { ContextApiContext } from "../context/ContextApi";

export default function Contact_Us() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp_number, setWhatsappNumber] = useState("");
  const [message, setMessage] = useState("");
  const { contextState, updateContextState } = useContext(ContextApiContext);
  const [error, setContactusError] = useState(null);

  const navigateToPath = (path) => {
    navigate(path);
  };
  const [open, setOpen] = useState(false);

  const ContactUsApi = async () => {
    try {
      let access_token = Constant.basic_token;
      console.log("acces_token", access_token);
      const headers = {
        Accept: "application/json",
        Authorization: access_token,
        "Authorization-secure": access_token,
        "client-id": "demas-app-mobile",
      };
      console.log("headers", headers);
      let formData = new FormData();
      formData.append("name", name);
      formData.append("whatsapp_number", whatsapp_number);
      formData.append("email", email);
      formData.append("message", message);
      const response = await fetch(Constant.contactus, {
        method: "POST",
        headers: headers,
        body: formData,
      });

      const data = await response.json();
      console.log("res datadata", data);
      if (data.status) {
        updateContextState(data.response, "update_user");
        navigate("/categories");
      } else {
        if (
          typeof data.error.message[0] !== "undefined" &&
          data.error.message[0] !== null
        ) {
          setContactusError(data.error.message[0]); // Set the error message
        }
      }
      // setCategories(data.response);
    } catch (error) {
      console.error("Error fetching :", error);
      setContactusError("Error signing up. Please try again."); // Set the error message
      console.error("Error signing up:", error);
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
            <h3 className="top_heading_page">Contact Us</h3>
          </div>
        </Row>
      </Container>
      <div className="cont_back">
        <Container fluid className="cont_pading ">
          <div className="inp_area">
            <div className="inp_area_back">
              <Row className="input_row">
                <Col>
                  <Form.Label htmlFor="basic-url">Full Name</Form.Label>

                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                      <FontAwesomeIcon icon={faUser} />
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="Name"
                      aria-label="name"
                      aria-describedby="basic-addon1"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row className="input_row">
                <Col>
                  <Form.Label htmlFor="basic-url">Email Address</Form.Label>
                  {/* <InputGroup className="mb-3">
                    <Form.Control
                      className="input_txt"
                      id="basic-url"
                      aria-describedby="basic-addon3"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup> */}
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="Email Address"
                      aria-label="Email"
                      aria-describedby="basic-addon1"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row className="input_row">
                <Col>
                  <Form.Label htmlFor="basic-url">Whatsapp Number</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                      <FaWhatsapp className="icons" />
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="Whatsapp Number"
                      aria-label="Whatsapp"
                      aria-describedby="basic-addon1"
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                    />
                  </InputGroup>{" "}
                </Col>
              </Row>
              <Row className="input_row">
                <Col>
                  <Form.Label htmlFor="basic-url">Message</Form.Label>
                  <InputGroup className="mb-3">
                    {/* <InputGroup.Text id="basic-addon1">
                      <FontAwesomeIcon icon={faComment} />
                    </InputGroup.Text> */}
                    <Form.Control
                      className="input_txt"
                      as="textarea"
                      placeholder="Message"
                      aria-label="With textarea"
                      rows={4}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </InputGroup>
                  
                </Col>
              </Row>
              <Row className="input_row">
                <Col>
                  <Button className="sub_btn" onClick={() => ContactUsApi()}>
                    SUBMIT
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
