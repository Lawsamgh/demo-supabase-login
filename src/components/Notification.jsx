import React from "react";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

const Notification = () => {
  const location = useLocation();
  const email = location.state?.email || "your email"; // Fallback if email is not available

  const navigate = useNavigate();

  const Nav = () => {
    navigate("/signin");
  };

  return (
    <div className="login-container-notification">
      <div>
        <p className="not-msg">
          Kindly check your email at <strong>{email}</strong> for a confirmation
          message and follow the instructions to confirm your account. Thank
          you!
        </p>
        <div className="flex items-center justify-center">
          <button onClick={Nav} className="notification-but">
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
