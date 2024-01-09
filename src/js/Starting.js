import React, { useEffect } from "react";
import { Nav, Navbar, Container, Row, Col } from 'react-bootstrap'
import './../styles/starting.css';
import { useNavigate } from "react-router-dom";
import { is_driver } from "../common/Common";




export default function Home(){
    const navigate = useNavigate();

    const navigateToPath = (path) => {
      navigate(path);
    };
    useEffect(()=>{
      setTimeout(() => {
        navigateHome();
      }, 1500);
      
    },[])
    const navigateHome =()=>{
      if(is_driver()){
        navigateToPath('/managebookings')            
      }
      else{
        navigateToPath('/home')
      }
    }
     return(
        <div className="bodybg" onClick={()=>{
            navigateHome();
          }}>
        <body className="bodybg">

        <div className="sasd">
            {/* <h1>Starting  Page</h1>  */}
            <img className="logocls" src="./images/1.png"></img>
        </div>

        </body>
        </div>
     )
}