
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Packages from "./js/Packages";
import Login from "./js/Login_page";
import Home from "./js/Home";
import Starting from "./js/Starting";
import AvailableCars from "./js/AvailableCars";
import TransportDetails from "./js/TransportDetails";
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
            <Route Component={TransportDetails} path="/transport_details"></Route>
            <Route Component={AvailableCars} path="/availablecars"></Route>
            <Route Component={Packages} path="/packages"></Route>
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
