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
import AvailableCars from './js/AvailableCars';
import Sedan from './js/Sedan';
import ManageBookings from './js/ManageBookings';
import BookingInfoPackages from './js/BookingInfoPackages';
import BookingInfoSingle from './js/BookingInfoSingle';




function App() {
  return (
    <div className="App">
      {/* <Router basename='/demas/build'> */}
      <Router>
    
            {/* <Offcanvas_colapsable_nav /> */}
        <Routes>
          <Route Component={BookingInfoSingle} path='/bookinginfosingle'></Route>
          <Route Component={BookingInfoPackages} path='/bookinginfopackages'></Route>
          <Route Component={ManageBookings} path='/managebookings'></Route>
          <Route Component={Sedan} path='/sedan'></Route>
          <Route Component={AvailableCars} path='/availablecars'></Route>
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
