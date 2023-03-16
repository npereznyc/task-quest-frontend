import React from "react";
import "../style/header.css";

import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  function logoutUser() {
    localStorage.removeItem("user");
    navigate(`/`);
  }

  return (
    <div className="header">
      <img className="logo"src={process.env.PUBLIC_URL + "/assets/QRlogo.png"} alt="qrlogo" />
      <div className="logout-div">
        <h6 onClick={logoutUser} className="logout-button">
          Log Out
        </h6>
      </div>
    </div>
  );
};

export default Header;
