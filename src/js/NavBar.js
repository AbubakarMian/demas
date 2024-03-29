import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import LanguageTranslator from "./Components/LanguageTranslate";


import {
  faHouse,
  faUser,
  faRightToBracket,
  faPhoneVolume,
  faBarsProgress,
  faShieldHalved,
  faFileCircleQuestion,
  faCommentsDollar,
  faBookBookmark,
  faCar,
} from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { is_driver, is_loggedin, is_user } from "../common/Common";
import { useEffect, useState } from "react";


export default function Nav_bar_area() {
  const user = localStorage.getItem("user");
  let user_loggedin = false;
  if (user == null) {
    user_loggedin = false;
  } else {
    user_loggedin = user.is_loggedin;
  }

const googleTranslateElementInit = () => {
  console.log("called");
  try {
    if (window.google && window.google.translate) {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    } else {
      console.error("Google Translate API not available");
    }
  } catch (e) {
    console.error("Google Translate API not available");
  }
};
useEffect(() => {
  console.log("Script loaded");
  console.log("Google object:", window.google);
  setTimeout(() => {
    googleTranslateElementInit(); // Check if this function is called
  }, 3000);
}, []);

  return (
    <>
      {/* {[false, 'sm', 'lg', 'lg', 'xl', 'xxl'].map((expand) => ( */}
      <Navbar key="xl" expand="lg" className="bg-body-tertiary" variant="dark">
        <Container fluid className="nav_back">
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
         <LanguageTranslator/>
          <Navbar.Brand className="brand_tx" href="#">
            <img className="nav_im" src="./images/12.png"></img>
            
          </Navbar.Brand>
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="start"
          >
            <Offcanvas.Header>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                <div>
                  <img className="collapse_logo" src="./../images/1.png"></img>
                </div>
                <div></div>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {is_driver() ? null : (
                  <div className="nav_bottom">
                    <Nav.Link href="home">
                      <FontAwesomeIcon className="nav_ico_sp" icon={faHouse} />{" "}
                      Home
                    </Nav.Link>
                  </div>
                )}

                <div className="nav_bottom">
                  <Nav.Link href="listcars">
                    <FontAwesomeIcon icon={faCar} className="nav_ico_sp" />{" "}
                    Transport
                  </Nav.Link>
                </div>
                {is_loggedin() ? (
                  <div className="nav_bottom">
                    <Nav.Link href="managebookings">
                      <FontAwesomeIcon
                        icon={faBookBookmark}
                        className="nav_ico_sp"
                      />{" "}
                      Bookings
                    </Nav.Link>
                  </div>
                ) : null}

                <div className="nav_bottom">
                  <Nav.Link href="contactus">
                    <FontAwesomeIcon
                      icon={faPhoneVolume}
                      className="nav_ico_sp"
                    />{" "}
                    ContactUs  

                  </Nav.Link>
                </div>
                {is_loggedin() ? (
                  <div className="nav_bottom">
                    <Nav.Link href="profile">
                      <FontAwesomeIcon
                        icon={faBarsProgress}
                        className="nav_ico_sp"
                      />{" "}
                      Profile
                    </Nav.Link>
                  </div>
                ) : null}
                {/* <div className='nav_bottom'><Nav.Link href="profiletravel"><FontAwesomeIcon icon={faBarsProgress} className='nav_ico_sp'  /> TravelAgent</Nav.Link></div>
                <div className='nav_bottom'><Nav.Link href="profilesale"><FontAwesomeIcon icon={faBarsProgress} className='nav_ico_sp'  /> SaleAgent</Nav.Link></div> */}
                <div className="nav_bottom">
                  <Nav.Link href="privacy">
                    <FontAwesomeIcon
                      icon={faShieldHalved}
                      className="nav_ico_sp"
                    />{" "}
                    Privacy
                  </Nav.Link>
                </div>
                <div className="nav_bottom">
                  <Nav.Link href="faq">
                    <FontAwesomeIcon
                      icon={faFileCircleQuestion}
                      className="nav_ico_sp"
                    />{" "}
                    FAQ's
                  </Nav.Link>
                </div>
                <div className="nav_bottom">
                  <Nav.Link href="refund">
                    <FontAwesomeIcon
                      icon={faCommentsDollar}
                      className="nav_ico_sp"
                    />{" "}
                    Refund
                  </Nav.Link>
                </div>
                <div className="nav_bottom">
                  <Nav.Link href="login">
                    <FontAwesomeIcon
                      icon={faRightToBracket}
                      className="nav_ico_sp"
                    />
                    {is_loggedin() ? "Change User" : "Login"}
                  </Nav.Link>
                </div>
                {is_user() ? (
                  <div className="nav_bottom">
                    <Nav.Link href="agent">
                      <FontAwesomeIcon icon={faUser} className="nav_ico_sp" />{" "}
                      Become Agent
                    </Nav.Link>
                  </div>
                ) : null}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      {/* ))} */}
    </>
  );
}
