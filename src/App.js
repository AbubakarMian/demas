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
      {/* <Router basename='/demas/build'> */}
      <Router>
    
            {/* <Offcanvas_colapsable_nav /> */}
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
