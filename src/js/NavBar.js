import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Container } from 'react-bootstrap'
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faHouse ,
  faRightToBracket,
  faPhoneVolume,
  faBarsProgress,
  faShieldHalved,
  faFileCircleQuestion,
  faCommentsDollar,
  faBookBookmark,
  faCar } from '@fortawesome/free-solid-svg-icons'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { faUsers } from '@fortawesome/free-solid-svg-icons'




export default function Nav_bar_area() {
    return (
    <>
      {/* {[false, 'sm', 'lg', 'lg', 'xl', 'xxl'].map((expand) => ( */}
      <Navbar key='xl' expand='lg' className="bg-body-tertiary" variant="dark">
        <Container fluid className="nav_back">
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
          <Navbar.Brand className='brand_tx' href="#">
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
                <div>

                </div>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <div className='nav_bottom'><Nav.Link href="home"><FontAwesomeIcon icon={faHouse} /> Home</Nav.Link></div>
                <div className='nav_bottom'><Nav.Link href="availablecars"><FontAwesomeIcon icon={faCar} /> AvailCars</Nav.Link></div>
                <div className='nav_bottom'><Nav.Link href="managebookings"><FontAwesomeIcon icon={faBookBookmark} /> Bookings</Nav.Link></div>
                <div className='nav_bottom'><Nav.Link href="contactus"><FontAwesomeIcon icon={faPhoneVolume} /> ContactUs</Nav.Link></div>
                <div className='nav_bottom'><Nav.Link href="profiletravel"><FontAwesomeIcon icon={faBarsProgress} /> TravelAgent</Nav.Link></div>
                <div className='nav_bottom'><Nav.Link href="profilesale"><FontAwesomeIcon icon={faBarsProgress} /> SaleAgent</Nav.Link></div>
                <div className='nav_bottom'><Nav.Link href="privacy"><FontAwesomeIcon icon={faShieldHalved} /> Privacy</Nav.Link></div>
                <div className='nav_bottom'><Nav.Link href="faq"><FontAwesomeIcon icon={faFileCircleQuestion} /> FAQ's</Nav.Link></div>
                <div className='nav_bottom'><Nav.Link href="refund"><FontAwesomeIcon icon={faCommentsDollar} /> Refund</Nav.Link></div>
                <div className='nav_bottom'><Nav.Link href="login"><FontAwesomeIcon icon={faRightToBracket} /> Login</Nav.Link></div>
          
                {/* <NavDropdown
                  title="Dropdown"
                  id={`offcanvasNavbarDropdown-expand-lg`}
                >
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown> */}
              </Nav>
              {/* <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button className='search_btn' variant="outline-success"><FontAwesomeIcon icon={faMagnifyingGlass} /></Button>
              </Form> */}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      {/* ))} */}
    </>
  );
}
