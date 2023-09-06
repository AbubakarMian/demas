import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Single_trip from "./js/Single_trip";
import Login from "./js/Login_page";
import Home from "./js/home";
import Starting from "./js/starting";
import AvailableCars from "./js/AvailableCars";
import Sedan from "./js/Sedan";
import ManageBookings from "./js/ManageBookings";
import BookingInfoPackages from "./js/BookingInfoPackages";
import BookingInfoSingle from "./js/BookingInfoSingle";
import ContactUs from "./js/ContactUs";
import ProfileSale from "./js/ProfileSale";
import ProfileTravel from "./js/ProfileTravel";
import Privacy from "./js/Privacy";
import FAQ from "./js/FAQ";
import Refund from "./js/Refund";
import ContexApiProvider from "./context/ContextApi";

function App() {
  return (
    <div className="App">
      {/* <Router basename='/demas/build'> */}
      <ContexApiProvider>
        <Router>
          {/* <Offcanvas_colapsable_nav /> */}
          <Routes>
            <Route Component={ProfileSale} path="/profilesale"></Route>
            <Route Component={ProfileTravel} path="/profiletravel"></Route>
            <Route Component={Privacy} path="/privacy"></Route>
            <Route Component={FAQ} path="/faq"></Route>
            <Route Component={Refund} path="/refund"></Route>
            <Route Component={ContactUs} path="/contactus"></Route>
            <Route
              Component={BookingInfoSingle}
              path="/bookinginfosingle"
            ></Route>
            <Route
              Component={BookingInfoPackages}
              path="/bookinginfopackages"
            ></Route>
            <Route Component={ManageBookings} path="/managebookings"></Route>
            <Route Component={Sedan} path="/sedan"></Route>
            <Route Component={AvailableCars} path="/availablecars"></Route>
            <Route Component={Single_trip} path="/packages"></Route>
            <Route Component={Login} path="/login"></Route>
            <Route Component={Starting} path="/"></Route>
            <Route Component={Home} path="/home"></Route>
          </Routes>
        </Router>
      </ContexApiProvider>
    </div>
  );
}

export default App;
