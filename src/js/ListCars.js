import React, { useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./../styles/availblecar.css";
import Carousel from "react-bootstrap/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Alert from "react-bootstrap/Alert";

import {
  faSliders,
  faUser,
  faSuitcaseRolling,
  faDoorOpen,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import InputGroup from "react-bootstrap/InputGroup";
import Nav_bar_area from "./NavBar";
import { useNavigate, useLocation } from "react-router-dom";
import { Constant } from "../common/Constants";
import { ContextApiContext } from "../context/ContextApi";
import Common, {
  googleTranslate,
  SendRequest,
  SendRequestContetType,
} from "../common/Common";

export default function ListCars() {
  const navigate = useNavigate();
  const location = useLocation();
  const { contextState, updateContextState } = useContext(ContextApiContext);
  const [transportlist, setTransportList] = useState([]);
  const [transportFilterListType, setTransportFilterListType] = useState([]);
  const [transportFilterListSeats, setTransportFilterListSeats] = useState([]);
  const [transportFilterListLuggage, setTransportFilterListLuggage] = useState([]);
  
const [carTypeFilter, setCarTypeFilter] = useState(0);
const [carSeatFilter, setCarSeatFilter] = useState(0);
const [carLuggageFilter, setCarLuggageFilter] = useState(0);

  const [error, setError] = useState(null);

  const navigateToPath = (path, props) => {
    navigate(path, { state: props });
  };

  useEffect(() => {
    console.log("props from previous screen ", location.state);
    
    get_transport_types();
    init_state_variables();
  }, []);

  useEffect(()=>{
    get_transport();
  },[carTypeFilter,carSeatFilter,carLuggageFilter])

  const init_state_variables = () => {};

  const get_transport_types = async () => {
    try {
      let url = `${Constant.get_transport_types}`;
      const res = await SendRequestContetType(
        "get",
        url,
        null,
        false
      );

      if (res.status) {
        let filters_list = res.response;
        console.log("get type list ", filters_list);
        console.log("get type list type ", filters_list.type);
        console.log("get type list seats ", filters_list.seats);
        setTransportFilterListType(filters_list.type);
        setTransportFilterListSeats(filters_list.seats);
        setTransportFilterListLuggage(filters_list.luggage);
        
      } else {
        if (res.error.custom_code == 403) {
          updateContextState(true, "show_login_modal");
          updateContextState("Please Login and try again", "error_msg");
          // navigateToPath(-1);
        }
        console.log(res.error?.message[0], "error_msg");
        updateContextState("Transport List unavalible contact admin", "error_msg");
        // setError("Transport List unavalible contact admin");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Transport List unavalible contact admin.");
    }
  };

  const get_transport = async () => {
    try {

      let booking_filters = "";
      booking_filters = `?transport_type_id=${carTypeFilter}`+
      `&seats=${carSeatFilter}&luggage=${carLuggageFilter}`;

      let get_car_url = `${Constant.get_all}` + booking_filters;

      const res = await SendRequestContetType(
        "post",
        get_car_url,
        null,
        false
      );

      if (res.status) {
        let cars_list = res.response;
        setTransportList(cars_list);
        console.log("get cars list ", cars_list);
      } else {
        if (res.error.custom_code == 403) {
          updateContextState(true, "show_login_modal");
          updateContextState("Please Login and try again", "error_msg");
          // navigateToPath(-1);
        }
        updateContextState(res.error?.message[0], "error_msg");
        setError("Transport List unavalible contact admin");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Transport List unavalible contact admin.");
    }
  };

  const selectTransport = (transport) => {
    navigateToPath("/home");
  };

  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="alert-fixed">
        <Alert
          className=""
          show={error}
          dismissible={true}
          onClose={() => setError("")}
          variant="danger"
        >
          {error}
        </Alert>
      </div>
      <Container fluid>
        <Row>
          <div className="login_head">
            <div className="backicon">
              <Button
                className="bcbtn"
                onClick={() => {
                  navigate(-1);
                }}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </Button>
            </div>{" "}
            <h3 className="top_heading_page">Available Cars</h3>
          </div>
        </Row>
      </Container>
      <div className="cont_type">
        <Container fluid>
          <Row className="bar_clr">
            <Col>
              <div className="car-head">{transportlist.length} Cars Ready</div>
            </Col>
            <Col>
              {/* <Filters /> */}
              <Button
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
                className="sett_btn"
              >
                <FontAwesomeIcon icon={faSliders} />
              </Button>
            </Col>
          </Row>
          <Row>
            <Collapse in={open}>
              <div id="example-collapse-text">
                <Container className="filter_area">
                  <Row>
                    <Col>
                      <h3 className="filter_hed">CAR TYPE</h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                    {
                      transportFilterListType.map(((item,index)=>{
                        let style_obj = {};
                        if(item.id== carTypeFilter){
                           style_obj = {
                            backgroundColor: "#996418",
                            color:"white"
                           };
                        }
                        return(
                          <Button id={index} onClick={()=>{
                            let id = item.id == carTypeFilter ? 0:item.id;
                            setCarTypeFilter(id)}} 
                          className="filter_btn"
                          style={style_obj}>
                          {item.name}</Button>
                        )
                      }))
                    }
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h3 className="filter_hed">CAR SEATS</h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col>{
                      transportFilterListSeats.map(((item,index)=>{
                        let style_obj = {};
                        if(item.seats== carSeatFilter){
                           style_obj = {
                            backgroundColor: "#996418",
                            color:"white"
                           };
                        }
                        return(
                          <Button id={index} onClick={()=>{
                            let id = item.seats == carSeatFilter ? 0:item.seats;
                            setCarSeatFilter(id)
                          }} 
                          className={'filter_btn '} 
                          style={style_obj}>
                            {item.seats}
                          </Button>
                        )
                      }))
                    }
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h3 className="filter_hed">SUIT CASES</h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                    {
                      transportFilterListLuggage.map(((item,index)=>{
                        let style_obj = {};
                        if(item.luggage== carLuggageFilter){
                           style_obj = {
                            backgroundColor: "#996418",
                            color:"white"
                           };
                        }
                        return(
                          <Button id={index} onClick={()=>{
                            let id = item.luggage == carLuggageFilter ? 0:item.luggage;
                            setCarLuggageFilter(id)}} 
                          className="filter_btn"
                          style={style_obj}>
                          {item.luggage}</Button>
                        )
                      }))
                    }
                    </Col>
                  </Row>
                </Container>
              </div>
            </Collapse>
          </Row>
        </Container>
        <div
          className="asdas const_paddingaa"
          onClick={() => {
            // navigate("/transport_details");
          }}
        >
          {/* <Sedan_crousel /> */}
        </div>
        <div>
          {/* start map*/}
          {transportlist.map((item) => {
            return (
              <div>
                <Row className="bdr_line const_padding">
                  <Col>
                    <div className="car_typ">
                      Type - {item.transport_type.name}
                    </div>
                    <div className="car_nme">
                      {item.transport_type.name} or Similar
                    </div>
                  </Col>
                  <Col>
                    <div className="rates">
                      <div className="style-1 divine">
                        {item.apply_discount ? (
                          <>
                            <p className="pd">
                              <span className="bef">BEFORE</span>
                              <del className="sps">
                                {item.booking_price} SAR
                              </del>
                            </p>
                            <span className="nw">NOW</span>
                          </>
                        ) : null}
                        {item.discounted_price} SAR
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row className="asdas const_paddingaa">
                  <div
                    className="slider-section"
                    onClick={() => {
                      selectTransport(item);
                    }}
                  >
                    <Carousel className="slider_bdr slide_availcars">
                      {item.images.map((image) => {
                        return (
                          <Carousel.Item>
                            <img className="d-block w-100" src={image} />
                            <Carousel.Caption></Carousel.Caption>
                          </Carousel.Item>
                        );
                      })}
                    </Carousel>
                  </div>
                </Row>
                <Row className="icn_ara">
                  <Col>
                    <FontAwesomeIcon className="detail_icn" icon={faUser} />
                    <span>{item.transport_type.seats}</span>
                  </Col>
                  <Col>
                    <FontAwesomeIcon
                      className="detail_icn"
                      icon={faSuitcaseRolling}
                    />
                    <span>{item.transport_type.luggage}</span>
                  </Col>
                  <Col>
                    <FontAwesomeIcon className="detail_icn" icon={faDoorOpen} />
                    <span>{item.transport_type.doors}</span>
                  </Col>
                </Row>
              </div>
            );
          })}
          {/* end map */}
        </div>
        {/* </Container> */}
      </div>
    </div>
  );
}