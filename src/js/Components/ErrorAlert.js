import { useContext, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { ContextApiContext } from "../../context/ContextApi";


export default function ErrorAlert() {
  
  const { contextState, updateContextState } = useContext(ContextApiContext);

  useEffect(() => {
    // Use a timeout to automatically hide the alert after 300 milliseconds
    console.log("error 1");
    const timeoutId = setTimeout(() => {
    console.log("error 2");

      updateContextState("", "error_msg");
    }, 3000);

    // Cleanup the timeout on component unmount or when the error message changes
    return () => clearTimeout(timeoutId);
  }, [contextState.error_msg]);

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