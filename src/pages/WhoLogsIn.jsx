import React from 'react'
import { Link } from "react-router-dom";

const WhoLogsIn = () => {
  return (
    <div>
        <h1>Are you a child or caregiver?</h1>
        <Link to={"/childlogin"}>
          Child
        </Link>
        <Link to={"/caregiverlogin"}>
          Caregiver
        </Link>

    </div>
  )
}

export default WhoLogsIn