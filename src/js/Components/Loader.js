import { useContext, useEffect } from "react";
import { ContextApiContext } from "../../context/ContextApi";
import { Alert } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';


export default function Loader(props) {
  
  const { contextState, updateContextState } = useContext(ContextApiContext);

  useEffect(() => {
    console.log('props',props);
    console.log('props',props.loader);
  }, [props.loader]);

  return (
    <div className="alert-fixed">
          <Modal show={props.loader} 
          // onHide={handleClose}
          >
        <Modal.Header >
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
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    
    </div>
  );
}