import React from 'react'
import '../style/header.css'

import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  function logoutUser() {
    localStorage.removeItem("user");    
    navigate(`/`);
  }

  return (
    <div className='header'>
      <img src={process.env.PUBLIC_URL + '/assets/QRlogo.png'} alt="qrlogo" />
    {/* <h6 onClick={logoutUser} className="logout-button">
      Log Out
    </h6> */}
    </div>
  )
}

export default Header