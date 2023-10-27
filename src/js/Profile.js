import React, { useContext,useEffect } from "react";
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
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import InputGroup from "react-bootstrap/InputGroup";
import Nav_bar_area from "./NavBar";
import { useNavigate } from "react-router-dom";
import { ContextApiContext } from "../context/ContextApi";

export default function Profile() {
  const { contextState, updateContextState } = useContext(ContextApiContext);

  const navigate = useNavigate();

  const navigateToPath = (path) => {
    navigate(path);
  };
  const [user, setUser] = useState({});
  useEffect(()=>{
    let user_obj =contextState.user;
    let role = '';
    if(user_obj.role_id == 2){
      role = 'user';
    }
    else if(user_obj.role_id == 3){
      role = 'Sale Agent';
    }
    else if(user_obj.role_id == 4){
      role = 'Travel Agent';
    }
    else if(user_obj.role_id == 5){
      role = 'Driver';
    }
    user_obj.role_name = role;
    setUser(user_obj);
  })

  return (
    <div>
       <Container fluid>
        <Row>
          <div className="login_head">
            <div className="backicon"><Button className="bcbtn" onClick={() => {
              navigate(-1);
            }} ><FontAwesomeIcon icon={faArrowLeft} /></Button></div> <h3 className="top_heading_page">Profile</h3>
          </div>
        </Row>
      </Container>
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
                    value={user.name}
                    className="inp_bx"
                    readOnly
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
                    value={user.email}
                    className="inp_bx"
                    readOnly
                  />
                </InputGroup>{" "}
              </Col>
            </Row>
            <Row className="">
              <Col>
                <Form.Label htmlFor="basic-url">Mobile NO</Form.Label>
                <InputGroup className="mb-3">
                  
                  <Form.Control
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    value={user.phone_no}
                    className="inp_bx"
                    readOnly
                  />
                </InputGroup>{" "}
              </Col>
            </Row>
          </div>
        </div>
      </Container>
      </div>
    </div>
  );
}
