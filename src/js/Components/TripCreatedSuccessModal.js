import { useNavigate, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

export default function TripCreatedSuccessModal (props) {
    const navigate = useNavigate();
  
    const navigateToPath = (path,param) => {
      navigate(path,param);
    };
    const handleClosePaymentSuccess = () => {
      props.setPaymentSuccessModalsShow(false);
      navigateToPath("/home", { replace: true, state: {} });
    };
    return (
      <>  
        <Modal
          show={props.paymentSuccessModalsShow}
          onHide={handleClosePaymentSuccess}
          dialogClassName="modal-90w"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <div className="cent">
                <Row>
                  <Col>
                    <FontAwesomeIcon icon={faCheck} className="succ_icon" />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p className="succ">Trip has been added</p>
                    <p className="succ">successfully</p>
                    <p className="succ">You will be notified with</p>
                    <p className="succ">confimation shortly.</p>
                  </Col>
                </Row>
              </div>
            </Container>
          </Modal.Body>
        </Modal>
      </>
    );
  };