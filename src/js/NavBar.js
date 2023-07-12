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
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { faUsers } from '@fortawesome/free-solid-svg-icons'




export default function Nav_bar_area() {
    return (
    <>
      {/* {[false, 'sm', 'lg', 'lg', 'xl', 'xxl'].map((expand) => ( */}
      <Navbar key='xl' expand='lg' className="bg-body-tertiary" variant="dark">
        <Container fluid className="nav_back">
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
          <Navbar.Brand href="#">De Mass</Navbar.Brand>
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
                <div className='nav_bottom'><Nav.Link href="/"><FontAwesomeIcon icon={faHouse} /> Home</Nav.Link></div>
                <div className='nav_bottom'><Nav.Link href="/about"><FontAwesomeIcon icon={faAddressCard} /> About</Nav.Link></div>
                <div className='nav_bottom'><Nav.Link href="users"><FontAwesomeIcon icon={faUsers} /> Users</Nav.Link></div>
                <div className='nav_bottom'><Nav.Link href="starting"><FontAwesomeIcon icon={faUsers} /> starting page</Nav.Link></div>
                <div className='nav_bottom'><Nav.Link href="login"><FontAwesomeIcon icon={faUsers} /> login</Nav.Link></div>
                <div className='nav_bottom'><Nav.Link href="single_trip"><FontAwesomeIcon icon={faUsers} /> single_trip</Nav.Link></div>
                <div className='nav_bottom'><Nav.Link href="availablecars"><FontAwesomeIcon icon={faUsers} /> AvailableCars</Nav.Link></div>
                <div className='nav_bottom'><Nav.Link href="sedan"><FontAwesomeIcon icon={faUsers} /> Sedan</Nav.Link></div>
                <NavDropdown
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
                </NavDropdown>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button className='search_btn' variant="outline-success"><FontAwesomeIcon icon={faMagnifyingGlass} /></Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      {/* ))} */}
    </>
  );
}
