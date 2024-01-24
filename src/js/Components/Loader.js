import { useContext, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';

export default function Loader(props) {
  const [showLoader, setShowLoader] = useState(localStorage.getItem("loader",false));

  useEffect(() => {
    // Define the event handler
    const handleStorageChange = (event) => {
      
      if (event.type === "storage.loader") {// event.type == storage event.key 
        setShowLoader(localStorage.getItem("loader") ==="true" ? true :false); // Parse the new value from localStorage
        console.log("Loader value changed in localStorage",localStorage.getItem("loader"));
        console.log("value is ",localStorage.getItem("loader") ? true :false);
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
      <Modal show={showLoader}>
        <Modal.Header>
          <Modal.Title>Loading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="lg"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}
