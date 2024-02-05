import React, { useEffect, useState } from "react";
import "./SuccessMessage.css";

const SuccessMessage = ({ message }) => {
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (message) {
      setShouldRender(true);
      setVisible(true);
      setTimeout(() => setVisible(false), 2000); // Hide after 3 seconds
    }
  }, [message]);

  useEffect(() => {
    if (!visible && shouldRender) {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 500); // Match the duration of your CSS transitions
      return () => clearTimeout(timer);
    }
  }, [visible, shouldRender]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div className={`successMessage ${visible ? "" : "visible"}`}>
      {message}
    </div>
  );
};

export default SuccessMessage;
