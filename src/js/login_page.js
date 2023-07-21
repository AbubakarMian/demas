import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './../styles/login_page.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from "react-router-dom";







export default function Login_page_style() {
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
            }} ><FontAwesomeIcon icon={faArrowLeft} /></Button></div> <h3 className="top_heading_page">LOGIN</h3>
          </div>
        </Row>
      </Container>
      
      <Container>
        <Row>
        <div className="input_area"> 
          <Inp_fields />
        </div>

        </Row>
        <Row>
        <div className="otp_bt_area"> 
          <Otp_button />
        </div>

        </Row>
      </Container>

    </div>
  );
}

const Inp_fields = () => {
  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
        <Form.Control
          placeholder="Email Address"
          aria-label="Email"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">#</InputGroup.Text>
        <Form.Control
          placeholder="Whatsapp Number"
          aria-label="Whatsapp"
          aria-describedby="basic-addon1"
        />
      </InputGroup>

    </>


  );
}
// const Otp_button = () => {
//   return (

//     <Button  href="/" variant="primary" className="otpbtn">SEND OTP</Button>
//   );
// }

const Otp_button = () => {
  const [show, setShow] = useState(false);
  return (

    <>

      <Button className="otpbtn" onClick={() => setShow(true)}>
      SEND OTP 
      </Button>
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
      <Button  href="/home" variant="primary" className="otpbtn">Login</Button>
        </Modal.Body>
      </Modal>


    </>
  );
}