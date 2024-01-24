import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import {  Route, BrowserRouter as Router, Routes } from "react-router-dom";
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
import ContactUs from "./js/ContactUs";
import Profile from "./js/Profile";
import Privacy from "./js/Privacy";
import FAQ from "./js/FAQ";
import Refund from "./js/Refund";
import ContexApiProvider from "./context/ContextApi";
import LoginModal from "./js/Components/LoginModal";
import ListCars from "./js/ListCars";

function App() {
  const [isNavbarAtBottom, setIsNavbarAtBottom] = useState(false);

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
          <LoginModal />
          <Routes>
            <Route Component={Check_login(Profile)} path="/profile"></Route>
            <Route Component={Privacy} path="/privacy"></Route>
            <Route Component={FAQ} path="/faq"></Route>
            <Route Component={Refund} path="/refund"></Route>
            <Route Component={ContactUs} path="/contactus"></Route>
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
    </div>
  );
}

export default App;
