import React from "react";
import "../style/header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  function logoutUser() {
    localStorage.removeItem("user");
    navigate(`/`);
  }

  // check if user is logged in
  const isLoggedIn = localStorage.getItem("user") !== null;

  return (
    <>
      <div className="header"></div>
      {!isLoggedIn && ( // render logout div only if user is not logged in
        <div className="logout-div">
          <h6 onClick={logoutUser} className="logout-button">
            Log Out
          </h6>
        </div>
      )}
    </>
  );
};

export default Header;
