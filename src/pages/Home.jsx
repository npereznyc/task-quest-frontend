import React from 'react'
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <>
    <div className="home-box">
        <div className="home-title">Quest Runner</div>
      <nav className="home-nav">
        <Link className="link home-register" to={"/register"}>
          Sign up!
        </Link>
        <Link className="link home-login" to={"/login"}>
          Log in
        </Link>
      </nav>
    </div>
    <br/>
    <br/>
    </>
  )
}

export default Home