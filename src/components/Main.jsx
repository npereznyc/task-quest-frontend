import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import React from 'react';
import Auth from "../pages/Auth";
import Home from "../pages/Home";
import WhoLogsIn from "../pages/WhoLogsIn";
import ChildLogin from "./ChildLogin";
import CaregiverLogin from "./CaregiverLogin";

const Main = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<WhoLogsIn />} />
        <Route path="/childlogin" element={<ChildLogin />} />
        <Route path="/caregiverlogin" element={<CaregiverLogin />} />
        <Route path="register" element={<RegisterForm />} />
      </Routes>
    </div>
  );
};

export default Main;
