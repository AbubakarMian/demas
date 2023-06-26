import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './../styles/home.css';
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';





export default function home_page_style() {
  return (
    <div>
      <Row>
        <Home_crousel />
      </Row>
      <Container fluid>
        <Row>
          <Col><SingleTrip_buttons /></Col>
          <Col><Packages_button /></Col>
        </Row>
        <Row>
          <Col md={1}></Col>
          <Col md={10}><h3 className="headin">PICKUP</h3></Col>
          <Col md={1}></Col>
        </Row>
        <Row>
          <Col md={1}></Col>
          <Col md={10}><Input_area_pick /></Col>
          <Col md={1}></Col>
        </Row>
        <Row>

          <Col md={1}></Col>
          <Col md={10}><h3 className="headin">DROP OFF</h3></Col>
          <Col md={1}></Col>
        </Row>
        <Row>
          <Col md={1}></Col>
          <Col md={10}><Input_area_drop /></Col>
          <Col md={1}></Col>
        </Row>
        <Row>
          <Col md={1}></Col>
          <Col md={10}><h3 className="headin">PICKUP DATE & TIME</h3></Col>
          <Col md={1}></Col>
        </Row>
        <Row>
          <Col md={1}></Col>
          <Col md={10}><Input_area_time /></Col>
          <Col md={1}></Col>
        </Row>
        <Row>
          <Col md={1}></Col>
          <Col md={10}><h5 className="comment">Comments</h5><Comment/></Col>
          <Col md={1}></Col>
        </Row>
        <Row>
          <Col md={1}></Col>
          <Col md={10}><Proceed_buttons /></Col>
          <Col md={1}></Col>
        </Row>

      </Container>
    </div>
  );
}


const Home_crousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./images/1.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./images/4.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./images/5.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./images/6.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Fourth slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./images/7.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Fifth slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./images/8.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Sixth slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>


  );
}
const SingleTrip_buttons = () => {
  return (

    <Button href="./single_trip" variant="primary" className="singtripbtn">Single Trip    <FontAwesomeIcon className="icon_btn" icon={faLocationDot} beat /></Button>
  );
}
const Packages_button = () => {
  return (

    <Button variant="primary" className="singtripbtn">Packages   <FontAwesomeIcon className="icon_btn" icon={faArrowRightArrowLeft} /></Button>
  );
}


const Input_area_pick = () => {
  const [show, setShow] = useState(false);
  return (

    <>

      <Button className="pic_btn_modal" onClick={() => setShow(true)}>
      <FontAwesomeIcon className="icon_btn" icon={faLocationDot}  /> Select PickUp Location <div className="caret_down"><FontAwesomeIcon  icon={faAngleDown} /></div>
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
      {[ 'radio'].map((type) => (
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
          /><Form.Check
            
            label="Jaddah AirPort"
            name="group1"
            type={type}
            id={`reverse-${type}-3`}
          /> <Form.Check
            
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
          /><Form.Check
            
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


    </>
  );
}


const Input_area_drop = () => {
  const [show, setShow] = useState(false);
  return (

    <>

      <Button className="pic_btn_modal" onClick={() => setShow(true)}>
      <FontAwesomeIcon className="icon_btn" icon={faLocationDot}  /> Select Drop Off Location<div className="caret_down"><FontAwesomeIcon  icon={faAngleDown} /></div>
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
      {[ 'radio'].map((type) => (
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
          /><Form.Check
            
            label="Jaddah AirPort"
            name="group1"
            type={type}
            id={`reverse-${type}-3`}
          /> <Form.Check
            
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
          /><Form.Check
            
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


    </>
  );
  // return (
  //   <>
  //     <Form.Control
  //       type="text"
  //       id="input5"
  //       aria-describedby="passwordHelpBlock"
  //       placeholder="Select Drop Off Location"
  //       className="input_bx"
  //     />
  //     {/* <Form.Text id="passwordHelpBlock" muted>
  //       Your password must be 8-20 characters long, contain letters and numbers,
  //       and must not contain spaces, special characters, or emoji.
  //     </Form.Text> */}
  //   </>
  // );
}

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
}


const Proceed_buttons = () => {
  return (

    <Button variant="primary" className="Proceed_button">PROCEED TO NEXT</Button>
  );
}


const Comment = () => {
    const [open, setOpen] = useState(false);
  
    return (
      <>
        <Button
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
        >
          click
        </Button>
        <Collapse in={open}>
          <div id="example-collapse-text">
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
            terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
            labore wes anderson cred nesciunt sapiente ea proident.
          </div>
        </Collapse>
      </>
    );
  
  
  
}

