import React from "react";
import { Nav, Navbar, Container, Row } from 'react-bootstrap'
import './../styles/starting.css';
import { useNavigate } from "react-router-dom";




export default function Home(){
    const navigate = useNavigate();

    const navigateToPath = (path) => {
      navigate(path);
    };
     return(
        <div className="bodybg" onClick={()=>navigateToPath('/home')}>
        <body className="bodybg">
        <div className="sasd">
            {/* <h1>Starting  Page</h1>  */}
            <img className="logocls" src="./images/1.png"></img>
            
        </div>
        </body>
        </div>
     )
}