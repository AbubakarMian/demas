import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Container } from 'react-bootstrap'
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Single_trip from './js/single_trip';
import Login from './js/login_page';
import Home from './js/home';
import About from './js/about';
import Users from './js/users';
import Starting from './js/starting';
import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { faUsers } from '@fortawesome/free-solid-svg-icons'




function App() {
  return (
    <div className="App">
      <Router basename='/demas/build'>
        <Container fluid>
          <Row>
            <Offcanvas_colapsable_nav />
          </Row>
        </Container>
        <Routes>
          <Route Component={Single_trip} path='/single_trip'></Route>
          <Route Component={Login} path='/js/login'></Route>
          <Route Component={Starting} path='/starting'></Route>
          <Route Component={About} path='/about'></Route>
          <Route Component={Users} path='/users'></Route>
          <Route Component={Home} path='/'></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;


const Offcanvas_colapsable_nav = () => {
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
