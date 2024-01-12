import React, { useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./../styles/profile.css";
import Carousel from "react-bootstrap/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// node_modules/.cache/default-development/6.pack
import {
  faSliders,
  faUser,
  faSuitcaseRolling,
  faDoorOpen,
  faBars,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import { Alert } from "react-bootstrap";
import { useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import InputGroup from "react-bootstrap/InputGroup";
import Nav_bar_area from "./NavBar";
import { useNavigate } from "react-router-dom";
import { ContextApiContext } from "../context/ContextApi";
import { Constant } from "../common/Constants";
import { SendRequest, SendRequestContetType } from "../common/Common";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import LanguageTranslator from "./Components/LanguageTranslate";

export default function Profile() {
  const { contextState, updateContextState } = useContext(ContextApiContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userphone_no, setUserPhone_no] = useState("");
  const [userwhatsapp_number, setUserWhatsapp_number] = useState("");

  const [successModal, setSuccessModal] = useState(false);

  useEffect(() => {
    initFunction();
  }, [contextState.user]); // Add dependency array to useEffect

  const initFunction = () => {
    let user_obj = contextState.user;
    let role = "";
    if (user_obj.role_id == 2) {
      role = "user";
    } else if (user_obj.role_id == 3) {
      role = "Sale Agent";
    } else if (user_obj.role_id == 4) {
      role = "Travel Agent";
    } else if (user_obj.role_id == 5) {
      role = "Driver";
    }
    user_obj.role_name = role;
    setUser(user_obj);
    setUserName(user_obj.name);
    setUserEmail(user_obj.email);
    setUserPhone_no(user_obj.phone_no);
    setUserWhatsapp_number(user_obj.whatsapp_number);
  };

  const handleUpdate = async () => {
    try {
      let user_update_profile = Constant.user_update_profile;
      // let w_num = userwhatsapp_number.replace("+", "");
      // let p_num = userphone_no.replace("+", "");

      let obj = {
        name: userName,
        email: userEmail,
        phone_no: userphone_no,
        whatsapp_number: userwhatsapp_number,
      };

      const res = await SendRequestContetType(
        "put",
        user_update_profile,
        JSON.stringify(obj),
        true
      );

      console.log("response  ", res);

      if (res.status) {
        // show success modal
        setSuccessModal();
      } else {
        if (res.error.custom_code == 403) {
          updateContextState(true, "show_login_modal");
          updateContextState("Please Login and try again", "error_msg");
          // navigateToPath(-1);
        }
        // updateContextState(res.error?.message[0], "error_msg");
        else {
          updateContextState(
            "Profile can not be updated contact admin",
            "error_msg"
          );
          console.log("profile  api", res.error?.message[0]);
        }
      }
    } catch (error) {
      updateContextState(
        "Transport List unavalible contact admin",
        "error_msg"
      );
      console.error("Error during login:", error);
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
            <h3 className="top_heading_page">Profile</h3>
          </div>
        </Row>
      </Container>
      <Alert
        variant="success"
        show={successModal}
        dismissible={true}
        onClose={() => {}}
      >
        Success
      </Alert>

      <div className="profile_back">
        <Container fluid>
          <div className="agnt_prof">
            <Row className="">
              <Col>
                <div className="img_area">
                  <img src="./images/profile.png" />
                </div>
              </Col>
            </Row>
            <div className="info_area_bx">
              <Row className="">
                <Col>
                  <h4>{user.role_name}</h4>
                </Col>
              </Row>

              <Row className="">
                <Col>
                  <Form.Label htmlFor="basic-url">Name</Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      id="basic-url"
                      aria-describedby="basic-addon3"
                      value={userName}
                      className="inp_bx"
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </InputGroup>{" "}
                </Col>
              </Row>

              <Row className="">
                <Col>
                  <Form.Label htmlFor="basic-url">Email</Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      id="basic-url"
                      aria-describedby="basic-addon3"
                      value={userEmail}
                      className="inp_bx"
                      onChange={(e) => setUserEmail(e.target.value)}
                    />
                  </InputGroup>{" "}
                </Col>
              </Row>

              <Row className="">
                <Col>
                  <Form.Label htmlFor="basic-url">Mobile</Form.Label>
                  <div className="ip_bxphn">
                    <PhoneInput
                      defaultCountry="sa"
                      placeholder="Phone Number"
                      value={userphone_no}
                      // onChange={setValue}
                      onChange={(txt) => {
                        console.log("chk num", txt);
                        setUserPhone_no(txt);
                      }}
                    />
                  </div>
                  {/* <InputGroup className="mb-3">
                    <Form.Control
                      id="basic-url"
                      aria-describedby="basic-addon3"
                      value={userphone_no}
                      className="inp_bx"
                      onChange={(e) => setUserPhone_no(e.target.value)}
                    />
                  </InputGroup>{" "} */}
                </Col>
              </Row>

              <Row className="">
                <Col>
                  <Form.Label htmlFor="basic-url">Whatsapp</Form.Label>
                  <PhoneInput
                    defaultCountry="SA"
                    placeholder="Whatsapp Number"
                    value={userwhatsapp_number}
                    // onChange={setValue}
                    onChange={(txt) => {
                      console.log("chk num", txt);
                      setUserWhatsapp_number(txt);
                    }}
                  />
                  {/* <InputGroup className="mb-3">
                    <Form.Control
                      id="basic-url"
                      aria-describedby="basic-addon3"
                      className="inp_bx"
                      value={userwhatsapp_number}
                      onChange={(e) => setUserWhatsapp_number(e.target.value)}
                    />
                  </InputGroup>{" "} */}
                </Col>
              </Row>

              {[2].includes(user.role_id) ? (
                <Row>
                  <Col className="btn_center">
                    <Button className="btn_update" onClick={handleUpdate}>
                      Update
                    </Button>
                  </Col>
                </Row>
              ) : null}
            </div>
          </div>
        </Container>
        <Container>
          <Row className="cnt">
            <Col>
              <div className="lng_bg">
                <LanguageTranslator />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
