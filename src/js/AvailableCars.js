import React, { useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./../styles/availblecar.css";
import Carousel from "react-bootstrap/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Alert from "react-bootstrap/Alert";

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
import { useNavigate, useLocation } from "react-router-dom";
import { Constant } from "../common/Constants";
import { ContextApiContext } from "../context/ContextApi";
import Common, { googleTranslate, SendRequest } from "../common/Common";

export default function AvailableCars() {
  const navigate = useNavigate();
  const location = useLocation();
  const { contextState, updateContextState } = useContext(ContextApiContext);
  const [transportlist, setTransportList] = useState([]);
  const [error, setError] = useState(null);

  const navigateToPath = (path, props) => {
    navigate(path, { state: props });
  };

  useEffect(() => {
    console.log("props from previous screen ", location.state);
    get_transport();
  }, []);

  const get_transport = async () => {
    try {
      let cs = contextState;
      cs.user.access_token = Constant.basic_token;
      const res = await SendRequest(cs, "GET", Constant.get_cars);

      if (res.status) {
        let cars_list = res.response;
        setTransportList(cars_list);
        console.log("get cars list ", cars_list);
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
      {error && (
        <div className="error-message">
          <Alert variant="danger">{error}</Alert>
        </div>
      )}
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
            <h3 className="top_heading_page">Available Cars</h3>
          </div>
        </Row>
      </Container>
      <div className="cont_type">
        <Container fluid>
          <Row className="bar_clr">
            <Col>
              <div className="car-head">5 Cars Ready</div>
            </Col>
            <Col>
              {/* <Filters /> */}
              <Button
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
                className="sett_btn"
              >
                <FontAwesomeIcon icon={faSliders} />
              </Button>
            </Col>
          </Row>
          <Row>
            <Collapse in={open}>
              <div id="example-collapse-text">
                <Container className="filter_area">
                  <Row>
                    <Col>
                      <h3 className="filter_hed">CAR TYPE</h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button className="filter_btn">Sedan</Button>
                      <Button className="filter_btn">Mini-Bus</Button>
                      <Button className="filter_btn">SUV</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button className="filter_btn">People Carrier Van</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h3 className="filter_hed">CAR SEATS</h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button className="filter_btn">4</Button>
                      <Button className="filter_btn">15</Button>
                      <Button className="filter_btn">5</Button>
                      <Button className="filter_btn">8</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h3 className="filter_hed">SUIT CASES</h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button className="filter_btn">6</Button>
                      <Button className="filter_btn">17</Button>
                      <Button className="filter_btn">7</Button>
                      <Button className="filter_btn">10</Button>
                    </Col>
                  </Row>
                </Container>
              </div>
            </Collapse>
          </Row>

          <Row className="const_padding">
            <Col>
              <div className="car_typ">Type - Sedan</div>
            </Col>
            <Col>
              <div className="rates">250 SAR (per trip)</div>
            </Col>
          </Row>
          <Row className="const_padding">
            <Col>
              <div className="car_nme">Sedan Car or Similar</div>
            </Col>
            <Col>
              <div className="similr">(or Similar)</div>
            </Col>
          </Row>
        </Container>
        <div
          className="asdas const_paddingaa"
          onClick={() => {
            navigate("/transport_details");
          }}
        >
          <Sedan_crousel />
        </div>
        {/* <Container fluid> */}

        <Row className="icn_ara ">
          <Col className="sss">
            <FontAwesomeIcon className="detail_icn align" icon={faUser} />
            <span>3</span>
          </Col>
          <Col className="sad">
            <FontAwesomeIcon
              className="detail_icn align"
              icon={faSuitcaseRolling}
            />
            <span>5</span>
          </Col>
          <Col className="aaa">
            <FontAwesomeIcon className="detail_icn align" icon={faDoorOpen} />
            <span>4</span>
          </Col>
        </Row>

        <div
          
        >
          {/* start map*/}
          {transportlist.map((item) => {
            return (
              <div>
                <Row className="const_padding">
                  <Col>
                    <div className="car_typ">
                      Type - {item.transport_type.name}
                    </div>
                  </Col>
                  <Col>
                    <div className="rates">250 SAR (per trip)</div>
                  </Col>
                </Row>
                <Row className="const_padding">
                  <Col>
                    <div className="car_nme">
                      {item.transport_type.name} or Similar
                    </div>
                  </Col>
                  <Col>
                    <div className="similr">(or Similar)</div>
                  </Col>
                </Row>
                <Row className="asdas const_paddingaa">
                  
    <div
      className="slider-section"
      onClick={() => {
        navigateToPath("/transport_details",{transport:item});
      }}
    >
      <Carousel className="slider_bdr slide_availcars">
        {item.images.map((image) => {
          return (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={image}
                // alt="First slide"
              />
              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
                </Row>
                <Row className="icn_ara">
                  <Col>
                    <FontAwesomeIcon className="detail_icn" icon={faUser} />
                    <span>{item.transport_type.seats}</span>
                  </Col>
                  <Col>
                    <FontAwesomeIcon
                      className="detail_icn"
                      icon={faSuitcaseRolling}
                    />
                    <span>{item.transport_type.luggage}</span>
                  </Col>
                  <Col>
                    <FontAwesomeIcon className="detail_icn" icon={faDoorOpen} />
                    <span>{item.transport_type.doors}</span>
                  </Col>
                </Row>
              </div>
            );
          })}
          {/* end map */}
          {/* <Row className="const_padding">
            <Col>
              <div className="car_typ">Type - Mini-Bus</div>
            </Col>
            <Col>
              <div className="rates">250 SAR (per trip)</div>
            </Col>
          </Row>
          <Row className="const_padding">
            <Col>
              <div className="car_nme">Coaster or Similar</div>
            </Col>
            <Col>
              <div className="similr">(or Similar)</div>
            </Col>
          </Row>
          <Row className="asdas const_paddingaa">
            <Coaster_crousel />
          </Row>
          <Row className="icn_ara">
            <Col>
              <FontAwesomeIcon className="detail_icn" icon={faUser} />
              <span>32</span>
            </Col>
            <Col>
              <FontAwesomeIcon
                className="detail_icn"
                icon={faSuitcaseRolling}
              />
              <span>25</span>
            </Col>
            <Col>
              <FontAwesomeIcon className="detail_icn" icon={faDoorOpen} />
              <span>3</span>
            </Col>
          </Row>
          <Row className="const_padding">
            <Col>
              <div className="car_typ">Type - SUV</div>
            </Col>
            <Col>
              <div className="rates">400 SAR (per trip)</div>
            </Col>
          </Row>
          <Row className="const_padding">
            <Col>
              <div className="car_nme">GMC or Similar</div>
            </Col>
            <Col>
              <div className="similr">(or Similar)</div>
            </Col>
          </Row>
          <Row className="asdas const_paddingaa">
            <Suv_crousel />
          </Row>
          <Row className="icn_ara">
            <Col>
              <FontAwesomeIcon className="detail_icn" icon={faUser} />
              <span>7</span>
            </Col>
            <Col>
              <FontAwesomeIcon
                className="detail_icn"
                icon={faSuitcaseRolling}
              />
              <span>4</span>
            </Col>
            <Col>
              <FontAwesomeIcon className="detail_icn" icon={faDoorOpen} />
              <span>5</span>
            </Col>
          </Row> */}
        </div>

        {/* </Container> */}
      </div>
    </div>
  );
}

const Sedan_crousel = () => {
  return (
    <Carousel className="slider_bdr slide_availcars">
      <Carousel.Item>
        <img className="d-block w-100" src="./images/a.jpg" alt="First slide" />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="">
        <img
          className="d-block w-100"
          src="./images/h.jpg"
          alt="Second slide"
        />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="./images/g.jpg" alt="Third slide" />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

const Transport_crousel = (props) => {
  let item = props.item;
  return (
    <div
      className="slider-section"
      onClick={() => {
        // navigateToPath("/transport_details",{item});
      }}
    >
      <Carousel className="slider_bdr slide_availcars">
        {item.images.map((image) => {
          return (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={image}
                // alt="First slide"
              />
              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};

const Coaster_crousel = () => {
  return (
    <div className="slider-section">
      <Carousel className="slider_bdr slide_availcars">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./images/b.jpg"
            alt="First slide"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./images/d.jpg"
            alt="Second slide"
          />

          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./images/f.jpg"
            alt="Third slide"
          />

          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

const Suv_crousel = () => {
  return (
    <Carousel className="slider_bdr slide_availcars">
      <Carousel.Item>
        <img className="d-block w-100" src="./images/c.jpg" alt="First slide" />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./images/e.jpg"
          alt="Second slide"
        />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="./images/i.jpg" alt="Third slide" />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

const Filters = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        className="sett_btn"
      >
        <FontAwesomeIcon icon={faSliders} />
      </Button>
      <Collapse in={open}>
        <div id="example-collapse-text">
          <Container>
            <Row>
              <Col>
                <h3>CAR TYPE</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button>Sedan</Button>
                <Button>Mini-Bus</Button>
                <Button>SUV</Button>
              </Col>
            </Row>
          </Container>
        </div>
      </Collapse>
    </>
  );
};
