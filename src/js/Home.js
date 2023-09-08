import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./../styles/home.css";
import Carousel from "react-bootstrap/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft,
  faUsers,
  faSuitcaseRolling } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import InputGroup from "react-bootstrap/InputGroup";
import Nav_bar_area from "./NavBar";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Package_style() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const navigateToPath = (path) => {
    navigate(path);
  };
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Loop through the slides
    speed: 500, // Transition speed in milliseconds
    slidesToShow: 3, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at a time
  };

  return (
    <div>
      <Nav_bar_area />

      <div className="homeslider">
        <Home_crousel />
      </div>
      <section className="back_banner">
        <Container fluid>
          <div className="big_screen_adj">
            <div className="big_screen_adj_back">
              <Row>
                <Col>
                  <Button variant="primary" className="singtripbtn">
                    Single Trip{" "}
                    <FontAwesomeIcon
                      className="icon_btn"
                      icon={faLocationDot}
                    />
                  </Button>
                </Col>
                <Col>
                  <Button
                    href="./packages"
                    variant="primary"
                    className="singtripbtn"
                  >
                    Packages{" "}
                    <FontAwesomeIcon
                      className="icon_btn"
                      icon={faArrowRightArrowLeft}
                    />
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col md={1}></Col>
                <Col md={10}>
                  <h3 className="headin">PICKUP</h3>
                </Col>
                <Col md={1}></Col>
              </Row>
              <Row>
                <Col md={1}></Col>
                <Col md={10}>
                  <Button
                    className="pic_btn_modal"
                    onClick={() => setShow(true)}
                  >
                    <FontAwesomeIcon
                      className="icon_btn"
                      icon={faLocationDot}
                    />{" "}
                    Select PickUp Location{" "}
                    <div className="caret_down">
                      <FontAwesomeIcon icon={faAngleDown} />
                    </div>
                  </Button>
                  <Modal
                    show={show}
                    onHide={() => setShow(false)}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="example-custom-modal-styling-title">
                        Select Pickup location
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form className="asdasd">
                        {["radio"].map((type) => (
                          <div key={`reverse-${type}`} className="mb-3">
                            <Form.Check
                              label="Madina Hotel"
                              name="group1"
                              type={type}
                              id={`reverse-${type}-1`}
                            />
                            <Form.Check
                              label="Madina AirPort"
                              name="group1"
                              type={type}
                              id={`reverse-${type}-2`}
                            />
                            <Form.Check
                              label="Jaddah AirPort"
                              name="group1"
                              type={type}
                              id={`reverse-${type}-3`}
                            />{" "}
                            <Form.Check
                              label="Jaddah Hotel"
                              name="group1"
                              type={type}
                              id={`reverse-${type}-4`}
                            />
                            <Form.Check
                              label="Makkah Hotel"
                              name="group1"
                              type={type}
                              id={`reverse-${type}-5`}
                            />
                            <Form.Check
                              label="Train Station"
                              name="group1"
                              type={type}
                              id={`reverse-${type}-6`}
                            />
                          </div>
                        ))}
                      </Form>
                    </Modal.Body>
                  </Modal>
                </Col>
                <Col md={1}></Col>
              </Row>
              <Row>
                <Col md={1}></Col>
                <Col md={10}>
                  <h3 className="headin">DROP OFF</h3>
                </Col>
                <Col md={1}></Col>
              </Row>
              <Row>
                <Col md={1}></Col>
                <Col md={10}>
                  <Button
                    className="pic_btn_modal"
                    onClick={() => setShow(true)}
                  >
                    <FontAwesomeIcon
                      className="icon_btn"
                      icon={faLocationDot}
                    />{" "}
                    Select Drop Off Location
                    <div className="caret_down">
                      <FontAwesomeIcon icon={faAngleDown} />
                    </div>
                  </Button>
                  <Modal
                    show={show}
                    onHide={() => setShow(false)}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="example-custom-modal-styling-title">
                        Select Drop Off Location
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form className="asdasd">
                        {["radio"].map((type) => (
                          <div key={`reverse-${type}`} className="mb-3">
                            <Form.Check
                              label="Madina Hotel"
                              name="group1"
                              type={type}
                              id={`reverse-${type}-1`}
                            />
                            <Form.Check
                              label="Madina AirPort"
                              name="group1"
                              type={type}
                              id={`reverse-${type}-2`}
                            />
                            <Form.Check
                              label="Jaddah AirPort"
                              name="group1"
                              type={type}
                              id={`reverse-${type}-3`}
                            />{" "}
                            <Form.Check
                              label="Jaddah Hotel"
                              name="group1"
                              type={type}
                              id={`reverse-${type}-4`}
                            />
                            <Form.Check
                              label="Makkah Hotel"
                              name="group1"
                              type={type}
                              id={`reverse-${type}-5`}
                            />
                            <Form.Check
                              label="Train Station"
                              name="group1"
                              type={type}
                              id={`reverse-${type}-6`}
                            />
                          </div>
                        ))}
                      </Form>
                    </Modal.Body>
                  </Modal>
                </Col>
                <Col md={1}></Col>
              </Row>
              <Row>
                <Col md={1}></Col>
                <Col md={10}>
                  <h3 className="headin">PICKUP DATE & TIME</h3>
                </Col>
                <Col md={1}></Col>
              </Row>
              <Row>
                <Col md={1}></Col>
                <Col md={10}>
                  <Input_area_time />
                </Col>
                <Col md={1}></Col>
              </Row>
              <Row>
                <Col md={1}></Col>
                <Col md={10}>
                  <Comment />
                </Col>
                <Col md={1}></Col>
              </Row>
              <Row>
                <Col md={1}></Col>
                <Col md={10}>
                  <Button
                    variant="primary"
                    onClick={() => {
                      navigate("/availablecars");
                    }}
                    className="Proceed_button"
                  >
                    PROCEED TO NEXT
                  </Button>
                </Col>
                <Col md={1}></Col>
              </Row>
            </div>
          </div>
        </Container>
      </section>
      <section className="back_vehicles_section">
        <div>
          <section className="back_banner">
            {/* ... Rest of your code ... */}
          </section>
          <Container>
            <section className="tab_area_bt">
              <h2>Vehicles to Ride</h2>
              <div className="tab_center">
                <div className="tab-buttons">
                  {tabs.map((tab, index) => (
                    <button
                      key={index}
                      onClick={() => handleTabClick(index)}
                      className={index === activeTab ? "active" : ""}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <div className="tab-content">{tabs[activeTab].content}</div>
              </div>
            </section>
          </Container>
        </div>
      </section>
    </div>
  );
}

const Home_crousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src="./images/1.jpg" alt="First slide" />
        <Carousel.Caption>
          {/* <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./images/4.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          {/* <h3>Second slide label</h3>
          <p> 4 Passengers 2 Luggages</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="./images/5.jpg" alt="Third slide" />

        <Carousel.Caption>
          {/* <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="./images/6.jpg" alt="Third slide" />

        <Carousel.Caption>
          {/* <h3>Fourth slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="./images/7.jpg" alt="Third slide" />

        <Carousel.Caption>
          {/* <h3>Fifth slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="./images/8.jpg" alt="Third slide" />

        <Carousel.Caption>
          {/* <h3>Sixth slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

const Input_area_time = () => {
  return (
    <>
      <Form.Control
        type="datetime-local"
        id="input5"
        aria-describedby="passwordHelpBlock"
        placeholder="Select Pickup Date & Time"
        className="input_bx"
      />
      {/* <Form.Text id="passwordHelpBlock" muted>
        Your password must be 8-20 characters long, contain letters and numbers,
        and must not contain spaces, special characters, or emoji.
      </Form.Text> */}
    </>
  );
};
const settings = {
  dots: true, // Show navigation dots
  infinite: true, // Loop through the slides
  speed: 500, // Transition speed in milliseconds
  slidesToShow: 3, // Number of slides to show at once
  slidesToScroll: 1, // Number of slides to scroll at a time
};

const suv = [
  {
    id: 1,
    name: "Acura",
    description: <div className="disc_info"><FontAwesomeIcon className="info_icn" icon={faUsers} /> 4
    <FontAwesomeIcon className="info_icn" icon={faSuitcaseRolling} />3
    </div>,
    price: 49.99,
    image: "./images/acura.jpg", // Replace with the actual image URL
  },
  {
    id: 2,
    name: "BRV",
    description: <div className="disc_info"><FontAwesomeIcon className="info_icn" icon={faUsers} /> 4
    <FontAwesomeIcon className="info_icn" icon={faSuitcaseRolling} />3
    </div>,
     price: 59.99,
    image: "./images/brv.jpg", 
  },
  {
    id: 3,
    name: "CRV",
    description: <div className="disc_info"><FontAwesomeIcon className="info_icn" icon={faUsers} /> 4
    <FontAwesomeIcon className="info_icn" icon={faSuitcaseRolling} />3
    </div>,
    price: 59.99,
    image: "./images/crv.jpg",
    },
  {
    id: 4,
    name: "RAV4",
    description: <div className="disc_info"><FontAwesomeIcon className="info_icn" icon={faUsers} /> 4
    <FontAwesomeIcon className="info_icn" icon={faSuitcaseRolling} />3
    </div>,
    price: 59.99,
    image: "./images/rav4.jpg", // Replace with the actual image URL
    },
  // Add more products as needed
];

const sedan = [
  {
    id: 1,
    name: "Civic",
    description: <div className="disc_info"><FontAwesomeIcon className="info_icn" icon={faUsers} /> 4
    <FontAwesomeIcon className="info_icn" icon={faSuitcaseRolling} />3
    </div>,
    price: 49.99,
    image: "./images/a.jpg", // Replace with the actual image URL
  },
  {
    id: 2,
    name: "Corolla",
    description: <div className="disc_info"><FontAwesomeIcon className="info_icn" icon={faUsers} /> 4
    <FontAwesomeIcon className="info_icn" icon={faSuitcaseRolling} />3
    </div>,
    price: 59.99,
    image: "./images/corolla.jpg", 
    },
  {
    id: 3,
    name: "Elantra",
    description: <div className="disc_info"><FontAwesomeIcon className="info_icn" icon={faUsers} /> 4
    <FontAwesomeIcon className="info_icn" icon={faSuitcaseRolling} />3
    </div>,
    price: 59.99,
    image: "./images/elantra.jpg",
    },
  {
    id: 4,
    name: "Sonata",
    description: <div className="disc_info"><FontAwesomeIcon className="info_icn" icon={faUsers} /> 4
    <FontAwesomeIcon className="info_icn" icon={faSuitcaseRolling} />3
    </div>,
    price: 59.99,
    image: "./images/sonata.jpg", // Replace with the actual image URL

  },
  // Add more products as needed
];

const coaster = [
  {
    id: 1,
    name: "Toyota",
    description: <div className="disc_info"><FontAwesomeIcon className="info_icn" icon={faUsers} /> 29
    <FontAwesomeIcon className="info_icn" icon={faSuitcaseRolling} />10
    </div>,
    price: 49.99,
    image: "./images/toyocoaster.jpg", // Replace with the actual image URL
  },
  {
    id: 2,
    name: "Coaster",
    description: <div className="disc_info"><FontAwesomeIcon className="info_icn" icon={faUsers} /> 35
    <FontAwesomeIcon className="info_icn" icon={faSuitcaseRolling} />20
    </div>,
    price: 59.99,
    image: "./images/coaster.jpg", 
  },
  {
    id: 3,
    name: "Saloon",
    description: <div className="disc_info"><FontAwesomeIcon className="info_icn" icon={faUsers} /> 4
    <FontAwesomeIcon className="info_icn" icon={faSuitcaseRolling} />3
    </div>,
    price: 59.99,
    image: "./images/coastersaloon.jpg", // Replace with the actual image URL
  },
  {
    id: 4,
    name: "Coaster",
    description: <div className="disc_info"><FontAwesomeIcon className="info_icn" icon={faUsers} /> 4
    <FontAwesomeIcon className="info_icn" icon={faSuitcaseRolling} />3
    </div>,
    price: 59.99,
    image: "./images/csss.jpeg", // Replace with the actual image URL
  },
  // Add more products as needed
];

const tabs = [
  {
    label: "SEDAN",
    content: (
      <div className="slid">
        <div className="product-slider">
          <Slider {...settings}>
            {sedan.map((product) => (
              <div key={product.id} className="product-slide">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <span>${product.price}</span>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    ),
  },
  {
    label: "SUV",
    content: (
      <div className="slid">
        <div className="product-slider">
          <Slider {...settings}>
            {suv.map((product) => (
              <div key={product.id} className="product-slide">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <span>${product.price}</span>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    ),
  },
  {
    label: "COASTER",
    content: (
      <div className="slid">
        <div className="product-slider">
          <Slider {...settings}>
            {coaster.map((product) => (
              <div key={product.id} className="product-slide">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <span>${product.price}</span>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    ),
  },
  // Add more tabs as needed
];

const Comment = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        className="commentsbtn"
      >
        Comment
      </Button>
      <Collapse in={open}>
        <div id="example-collapse-text">
          <InputGroup>
            <Form.Control as="textarea" aria-label="With textarea" className="comnt_txt"/>
          </InputGroup>
        </div>
      </Collapse>
    </>
  );
};
