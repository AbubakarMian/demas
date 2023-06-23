import React from "react";
import Row from 'react-bootstrap/Row';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Home_crousel from './../js/home_crousel';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './../styles/single_trip.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';



export default function home_page_style() {
    return (
        <div>
            <Row>
                <Home_crousel />
            </Row>
            <Container>

                <Row>
                    <Col><SingleTrip_buttons /></Col>
                    <Col><Packages_button /></Col>
                </Row>

                <Row>
                    <Col md={1}></Col>
                    <Col md={10}>
                        <div className="singletrip_card">

                            <div className="smallcard">
                                <Row>
                                    <div className="lociconarea"><FontAwesomeIcon icon={faLocationDot} /></div>
                                    <div className="cardtxtarea">
                                        <p>Jeddah Airport to Jeddah Airport</p>
                                        <p>Jeddah Airport - Makkah Hote</p>
                                        <p>Makkah Hotel - Medina Hotel, Medina</p>
                                        <p>Hotel - Jeddah Airport</p>

                                    </div>
                                    <div className="crossarea"><Button>X</Button></div>
                                </Row>
                            </div>


                            <div className="smallcard">
                                <Row>
                                    <div className="lociconarea"><FontAwesomeIcon icon={faLocationDot} /></div>
                                    <div className="cardtxtarea">
                                        <p>Jeddah Airport to Jeddah Airport</p>
                                        <p>Jeddah Airport - Makkah Hote</p>
                                        <p>Makkah Hotel - Medina Hotel, Medina</p>
                                        <p>Hotel - Jeddah Airport</p>

                                    </div>
                                    <div className="crossarea"><Button>X</Button></div>
                                </Row>
                            </div>

                            <div className="add_btn_card"><Button>ADD</Button></div>

                        </div></Col>
                    <Col md={1}></Col>



                </Row>
                <Row>
                    <Col md={1}></Col>
                    <Col md={10}><Book_button /></Col>
                    <Col md={1}></Col>
                </Row>


            </Container>
        </div>
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
const Book_button = () => {
    return (

        <Button variant="primary" className="bookbtn">Book</Button>
    );
}
