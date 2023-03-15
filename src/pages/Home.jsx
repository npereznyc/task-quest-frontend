import React from 'react'
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-box">
      <nav className="home-nav">

      
        <Link className="link home-register" to={"/register"}>
          SIGN UP
        </Link>
        <Link className="link home-login" to={"/login"}>
          LOGIN
        </Link>
        </nav>
    </div>
  )
}

export default Home