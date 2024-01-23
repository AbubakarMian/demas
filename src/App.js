import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ErrorAlert from "./js/Components/ErrorAlert";
import Loader from "./js/Components/Loader";
import Packages from "./js/Packages";
import Login from "./js/Login_page";
import Home from "./js/Home";
import Become_agent from "./js/BecomeAgent";
import Starting from "./js/Starting";
import AvailableCars from "./js/AvailableCars";
import TransportDetails from "./js/TransportDetails";
import ManageBookings from "./js/ManageBookings";
import BookingInfoPackages from "./js/BookingInfoPackages";
import BookingInfoSingle from "./js/BookingInfoSingle";
import ContactUs from "./js/ContactUs";
// import ProfileSale from "./js/ProfileSale";
import Profile from "./js/Profile";
// import ProfileTravel from "./js/ProfileTravel";
import Privacy from "./js/Privacy";
import FAQ from "./js/FAQ";
import Refund from "./js/Refund";
import ContexApiProvider from "./context/ContextApi";
import LoginModal from "./js/Components/LoginModal";
import ListCars from "./js/ListCars";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
// import { ContextApiContext } from "../context/ContextApi";

function App() {
  // let user = localStorage.getItem("user");
  // let user_loggedin = false;
  // if (user == null) {
  //   user_loggedin = false;
  // } else {
  //   user = JSON.parse(user);
  //   user_loggedin = user.is_loggedin;
  // }
  const [isNavbarAtBottom, setIsNavbarAtBottom] = useState(false);
  // const { contextState, updateContextState } = useContext(ContextApiContext);

  useEffect(() => {
    // ... (your existing code)

    // Check if the navbar is at the bottom when the page is scrolled
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const bodyHeight = document.body.offsetHeight;

      const isAtBottom = scrollPosition + windowHeight >= bodyHeight;

      setIsNavbarAtBottom(isAtBottom);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // 
  const Check_login = (Component) => {
    let user = localStorage.getItem("user");
    let user_loggedin = false;
    if (user == null) {
      user_loggedin = false;
      return Login;
    } else {
      user = JSON.parse(user);
      user_loggedin = user.is_loggedin;
    }
    if (user_loggedin) {
      return Component;
    } else {
      return Login;
    }
  };
  return (
    <div className="App">
      {/* <Router basename='/demas/build'> */}
      <ContexApiProvider>
        <Router>
          <ErrorAlert />
          <Loader/>
          {/* <Loader loader={contextState}/> */}
          <LoginModal />
          {/* <Offcanvas_colapsable_nav /> */}
          <Routes>
            {/* <Route
              Component={Check_login(ProfileSale)}
              path="/profilesale"
            ></Route> */}
            <Route Component={Check_login(Profile)} path="/profile"></Route>
            <Route Component={Privacy} path="/privacy"></Route>
            <Route Component={FAQ} path="/faq"></Route>
            <Route Component={Refund} path="/refund"></Route>
            <Route Component={ContactUs} path="/contactus"></Route>
            {/* <Route
              Component={BookingInfoSingle}
              path="/bookinginfosingle"
            ></Route> */}
            <Route
              Component={Check_login(BookingInfoPackages)}
              path="/bookinginfopackages"
            ></Route>
            <Route
              Component={Check_login(ManageBookings)}
              path="/managebookings"
            ></Route>
            <Route
              Component={TransportDetails}
              path="/transport_details"
            ></Route>
            <Route Component={AvailableCars} path="/availablecars"></Route>
            <Route Component={Packages} path="/packages"></Route>
            <Route Component={Login} path="/login"></Route>
            <Route Component={Starting} path="/"></Route>
            <Route Component={Home} path="/home"></Route>
            <Route Component={Become_agent} path="/agent"></Route>
            <Route Component={ListCars} path="/listcars"></Route>
          </Routes>
        </Router>
      </ContexApiProvider>
      {/* <Navbar
        className={`cus-nav justify-content-end center ${
          isNavbarAtBottom ? "solid-background" : ""
        }`}
        sticky="bottom"
      >
        <Container>
          <Navbar.Brand>
               
          </Navbar.Brand>
          <div className="trans" id="google_translate_element"></div>
        </Container>
      </Navbar> */}
    </div>
  );
}

export default App;
