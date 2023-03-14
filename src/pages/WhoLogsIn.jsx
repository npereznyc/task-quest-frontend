import React from "react";
import { Link } from "react-router-dom";

const WhoLogsIn = () => {
  return (
    <div className="whose-box">
      <div className="random-box"></div>
      <div className="whose-input-side">
        <Link className="link task-master" to={"/caregiverlogin"}>
          I am the Task Master
        </Link>
        <Link className="link task-runner" to={"/childlogin"}>
          I am the Task Runner
        </Link>
      </div>
    </div>
  );
};

export default WhoLogsIn;
