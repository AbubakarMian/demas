import { useEffect, useState } from "react";
import "./../../styles/language_translator.css";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faX,
  faUser,
  faSuitcaseRolling,
  faDoorOpen,
  faBars,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

export default function LanguageTranslator() {
  const [showTranslator, setShowTranslator] = useState(true);

  const handleCloseButtonClick = () => {
    setShowTranslator(false);
  };

  const googleTranslateElementInit = () => {
    console.log("called");
    try {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      } else {
        console.error("Google Translate API not available");
      }
    } catch (e) {
      console.error("Google Translate API not available");
    }
  };

  useEffect(() => {
    console.log("Script loaded");
    console.log("Google object:", window.google);
    setTimeout(() => {
      googleTranslateElementInit();
    }, 3000);
  }, []);

  return (
    <>
      {showTranslator && (
        <div className="whole_bx_all">
          <div className="whole_bx">
            <div className="cross_btn">
              <FontAwesomeIcon icon={faX} onClick={handleCloseButtonClick} />
            </div>
            <div className="trans">
              <div id="google_translate_element"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
