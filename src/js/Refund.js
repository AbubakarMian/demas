import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./../styles/privacy.css";
import Carousel from "react-bootstrap/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

export default function Refunds() {
  const navigate = useNavigate();

  const navigateToPath = (path) => {
    navigate(path);
  };
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Container fluid>
        
        <Row>
        <div className="login_head">
          <div className="backicon"><Button className="bcbtn" onClick={() => {
              navigate(-1);
            }} ><FontAwesomeIcon icon={faArrowLeft} /></Button></div> <h1>REFUND POLICY</h1>
        </div>
      </Row>
       
      </Container>
      <Container fluid>
        <div className="policy_area">
          <Row className="">
            <Col>
              <h4>Apply for Refund</h4>
              <p>
                DEMAS Offers Sedan shape vehical that is greate for a small
                family of 2-3 People. It comes with the standard host of safely
                features and Impressive features of sharp steering,confident
                cornering, a large trunk, and premium cabin. The excellent and
                astounding choice for the explorer who needs an economy vehicle
                with maximizing space for luggage and themselves.
              </p>
              <h4>Cancellation</h4>

              <p>
                DEMAS Offers Sedan shape vehical that is greate for a small
                family of 2-3 People. It comes with the standard host of safely
                features and Impressive features of sharp steering,confident
                cornering, a large trunk, and premium cabin. The excellent and
                astounding choice for the explorer who needs an economy vehicle
                with maximizing space for luggage and themselves
              </p>
              <p>
                DEMAS Offers Sedan shape vehical that is greate for a small
                family of 2-3 People. It comes with the standard host of safely
                features and Impressive features of sharp steering,confident
                cornering, a large trunk, and premium cabin. The excellent and
                astounding choice for the explorer who needs an economy vehicle
                with maximizing space for luggage and themselves
              </p>
              <p>
                DEMAS Offers Sedan shape vehical that is greate for a small
                family of 2-3 People. It comes with the standard host of safely
                features and Impressive features of sharp steering,confident
                cornering, a large trunk, and premium cabin. The excellent and
                astounding choice for the explorer who needs an economy vehicle
                with maximizing space for luggage and themselves
              </p>
              <p>
                DEMAS Offers Sedan shape vehical that is greate for a small
                family of 2-3 People. It comes with the standard host of safely
                features and Impressive features of sharp steering,confident
                cornering, a large trunk, and premium cabin. The excellent and
                astounding choice for the explorer who needs an economy vehicle
                with maximizing space for luggage and themselves
              </p>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
