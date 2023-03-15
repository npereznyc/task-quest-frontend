import React from 'react'
import '../style/header.css'


const Header = () => {
  return (
    <div className='header'>
      <img src={process.env.PUBLIC_URL + '/assets/QRlogo.png'} alt="qrlogo" />
    </div>
  )
}

export default Header