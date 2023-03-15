import React from 'react'
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  function logoutUser() {
    localStorage.removeItem("user");    
    navigate(`/`);
  }

  return (
    <div className='header'>LOGO
    <h6 onClick={logoutUser} className="logout-button">
              Log Out
            </h6>
    </div>
  )
}

export default Header