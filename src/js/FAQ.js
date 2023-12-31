import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./../styles/faq.css";
import Carousel from "react-bootstrap/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSliders,
  faUser,
  faSuitcaseRolling,
  faDoorquest1,
  faCaretDown,
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

export default function Faqs() {
  const navigate = useNavigate();

  const navigateToPath = (path) => {
    navigate(path);
  };
  const [quest1, setquest1] = useState(false);
  const [quest2, setquest2] = useState(false);
  const [quest3, setquest3] = useState(false);
  const [quest4, setquest4] = useState(false);
  const [quest5, setquest5] = useState(false);
  const [quest6, setquest6] = useState(false);
  const [quest7, setquest7] = useState(false);
  const [quest8, setquest8] = useState(false);
  const [quest9, setquest9] = useState(false);

  return (
    <div>
      <Container fluid>
        <Row>
          <div className="login_head">
            <div className="backicon"><Button className="bcbtn" onClick={() => {
              navigate(-1);
            }} ><FontAwesomeIcon icon={faArrowLeft} /></Button></div> <h3 className="top_heading_page">FAQ's</h3>
          </div>
        </Row>
      </Container>
      <Container fluid>
        <div className="top_mar">
          <Row className="">
            <Col>
              <Button
                onClick={() => setquest1(!quest1)}
                aria-controls="example-collapse-text"
                aria-expanded={quest1}
                className="collap_btn"
              >
                <div className="fqa-box">
                  <div className="faq_txt"  >
                    Why Demas Taxi?
                  </div>
                  <div className="faq_icn">
                    <FontAwesomeIcon
                      className="drp_dn"
                      icon={faCaretDown}
                    />
                  </div>
                </div>

              </Button>

              <Collapse in={quest1}>
                <div id="example-collapse-text">

                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. Nihil anim keffiyeh
                  helvetica, craft beer labore wes anderson cred nesciunt
                  sapiente ea proident.
                </div>
              </Collapse>
            </Col>
          </Row>
          <Row className="">
            <Col>
              <Button
                onClick={() => setquest2(!quest2)}
                aria-controls="example-collapse-text"
                aria-expanded={quest2}
                className="collap_btn"
              >

                <div className="fqa-box">
                  <div className="faq_txt"  >
                    How I can book myself?
                  </div>
                  <div className="faq_icn">
                    <FontAwesomeIcon
                      className="drp_dn"
                      icon={faCaretDown}
                    />
                  </div>
                </div>

              </Button>

              <Collapse in={quest2}>
                <div id="example-collapse-text">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. Nihil anim keffiyeh
                  helvetica, craft beer labore wes anderson cred nesciunt
                  sapiente ea proident.
                </div>
              </Collapse>
            </Col>
          </Row>
          <Row className="">
            <Col>
              <Button
                onClick={() => setquest3(!quest3)}
                aria-controls="example-collapse-text"
                aria-expanded={quest3}
                className="collap_btn"
              >

                <div className="fqa-box">
                  <div className="faq_txt"  >
                    How might I find my driver?
                  </div>
                  <div className="faq_icn">
                    <FontAwesomeIcon
                      className="drp_dn"
                      icon={faCaretDown}
                    />
                  </div>
                </div>

              </Button>
              <Collapse in={quest3}>
                <div id="example-collapse-text">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. Nihil anim keffiyeh
                  helvetica, craft beer labore wes anderson cred nesciunt
                  sapiente ea proident.
                </div>
              </Collapse>
            </Col>
          </Row>
          <Row className="">
            <Col>
              <Button
                onClick={() => setquest4(!quest4)}
                aria-controls="example-collapse-text"
                aria-expanded={quest4}
                className="collap_btn"
              >


                <div className="fqa-box">
                  <div className="faq_txt"  >
                    How Do I modify my booking?
                  </div>
                  <div className="faq_icn">
                    <FontAwesomeIcon
                      className="drp_dn"
                      icon={faCaretDown}
                    />
                  </div>
                </div>

              </Button>
              <Collapse in={quest4}>
                <div id="example-collapse-text">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. Nihil anim keffiyeh
                  helvetica, craft beer labore wes anderson cred nesciunt
                  sapiente ea proident.
                </div>
              </Collapse>
            </Col>
          </Row>
          <Row className="">
            <Col>
              <Button
                onClick={() => setquest5(!quest5)}
                aria-controls="example-collapse-text"
                aria-expanded={quest5}
                className="collap_btn"
              >


                <div className="fqa-box">
                  <div className="faq_txt"  >
                    What if I have bulky luggage?
                  </div>
                  <div className="faq_icn">
                    <FontAwesomeIcon
                      className="drp_dn"
                      icon={faCaretDown}
                    />
                  </div>
                </div>

              </Button>
              <Collapse in={quest5}>
                <div id="example-collapse-text">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. Nihil anim keffiyeh
                  helvetica, craft beer labore wes anderson cred nesciunt
                  sapiente ea proident.
                </div>
              </Collapse>
            </Col>
          </Row>
          <Row className="">
            <Col>
              <Button
                onClick={() => setquest6(!quest6)}
                aria-controls="example-collapse-text"
                aria-expanded={quest6}
                className="collap_btn"
              >


                <div className="fqa-box">
                  <div className="faq_txt"  >
                    Through what medium I can cancel my booking?
                  </div>
                  <div className="faq_icn">
                    <FontAwesomeIcon
                      className="drp_dn"
                      icon={faCaretDown}
                    />
                  </div>
                </div>

              </Button>

              <Collapse in={quest6}>
                <div id="example-collapse-text">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. Nihil anim keffiyeh
                  helvetica, craft beer labore wes anderson cred nesciunt
                  sapiente ea proident.
                </div>
              </Collapse>
            </Col>
          </Row>
          <Row className="">
            <Col>
              <Button
                onClick={() => setquest7(!quest7)}
                aria-controls="example-collapse-text"
                aria-expanded={quest7}
                className="collap_btn"
              >


              <div className="fqa-box">
                <div className="faq_txt"  >
                Why Local sim is necessery for airport terminal pickup?
                </div>
                <div className="faq_icn">
                  <FontAwesomeIcon
                    className="drp_dn"
                    icon={faCaretDown}
                  />
                </div>
              </div>

            </Button>
              <Collapse in={quest7}>
                <div id="example-collapse-text">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. Nihil anim keffiyeh
                  helvetica, craft beer labore wes anderson cred nesciunt
                  sapiente ea proident.
                </div>
              </Collapse>
            </Col>
          </Row>
          <Row className="">
            <Col>
              <Button
                onClick={() => setquest8(!quest8)}
                aria-controls="example-collapse-text"
                aria-expanded={quest8}
                className="collap_btn"
              >


              <div className="fqa-box">
                <div className="faq_txt"  >
                Circumstances of flight delayed or cancellation?
                </div>
                <div className="faq_icn">
                  <FontAwesomeIcon
                    className="drp_dn"
                    icon={faCaretDown}
                  />
                </div>
              </div>

            </Button>
                
              <Collapse in={quest8}>
                <div id="example-collapse-text">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. Nihil anim keffiyeh
                  helvetica, craft beer labore wes anderson cred nesciunt
                  sapiente ea proident.
                </div>
              </Collapse>
            </Col>
          </Row>
          <Row className="">
            <Col>
              <Button
                onClick={() => setquest9(!quest9)}
                aria-controls="example-collapse-text"
                aria-expanded={quest9}
                className="collap_btn"
              >


              <div className="fqa-box">
                <div className="faq_txt"  >
                How might I find my driver?
                </div>
                <div className="faq_icn">
                  <FontAwesomeIcon
                    className="drp_dn"
                    icon={faCaretDown}
                  />
                </div>
              </div>

            </Button>
              <Collapse in={quest9}>
                <div id="example-collapse-text">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. Nihil anim keffiyeh
                  helvetica, craft beer labore wes anderson cred nesciunt
                  sapiente ea proident.
                </div>
              </Collapse>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
