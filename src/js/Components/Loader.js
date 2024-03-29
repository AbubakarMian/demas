import { useContext, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import "./../../styles/loader.css";

export default function Loader(props) {
  const [showLoader, setShowLoader] = useState(false);
    // localStorage.getItem("loader")
  // );

  useEffect(() => {
    // Define the event handler
    const handleStorageChange = (event) => {
      console.log('eee k',event.key);
      console.log('eee v',event.newValue);
      if (event.type === "storage.loader") {
        // event.type == storage event.key
        let eventValue = event.newValue === "true"?true:false;
        setShowLoader(eventValue);
        console.log(
          "Loader value changed in localStorage",
          eventValue
        );
        console.log("value is ", eventValue);
      }
    };

    // Add the event listener
    window.addEventListener("storage.loader", handleStorageChange);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("storage.loader", handleStorageChange);
    };
  }, []);

  return (
    <div className="alert-fixed">
      <Modal show={showLoader} aria-labelledby="contained-modal-title-vcenter"
      centered
      className="load_modal"
    >
        {/* <Modal.Header>
          <Modal.Title>Loading</Modal.Title>
        </Modal.Header> */}
        <Modal.Body className="spiner_back">
          <center>
            <Button variant="primary" 
            className="spin_btn"
            disabled>
              <Spinner
                as="span"
                animation="grow"
                size="lg"
                role="status"
                aria-hidden="true"
                className="spinnnn"
              />
              Loading...
            </Button>
          </center>
        </Modal.Body>
      </Modal>
    </div>
  );
}
