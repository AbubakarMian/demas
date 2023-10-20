import { useContext } from "react";
import { Alert } from "react-bootstrap";
import { ContextApiContext } from "../../context/ContextApi";


export default function ErrorAlert() {
  
  const { contextState, updateContextState } = useContext(ContextApiContext);

  return (
    <div className="alert-fixed">
    <Alert
      show={contextState.error_msg.length?true:false}
      dismissible={true}
      onClose={() => updateContextState("", "error_msg")}
      variant="danger"
    >
      {contextState.error_msg}
    </Alert>
    </div>
  );
}