import React from "react";
import { Link } from "react-router-dom";

const WhoLogsIn = () => {
  return (
    <div className="whose-box">

      <div className="random-box"></div>
      <div className="whose-input-side">
        <div className="login-heading">Choose your account</div>
        <Link className="link task-runner" to={"/childlogin"}>
          I am the Quest Runner
        </Link>
        <Link className="link task-master" to={"/caregiverlogin"}>
         I am the Quest Master
        </Link>
        <div className="login-tagline">Need an account? <Link to={"/register"} className="link-yellow">JOIN OUR WORLD</Link></div>
      </div>

    </div>

  );
};

export default WhoLogsIn;
