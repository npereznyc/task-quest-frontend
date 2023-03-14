import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import React from 'react';
import Auth from "../pages/Auth";
import Home from "../pages/Home";
import WhoLogsIn from "../pages/WhoLogsIn";
import ChildLogin from "./ChildLogin";
import CaregiverLogin from "./CaregiverLogin";
import RegisterForm from "./RegisterForm";
import CaregiverDashboard from "../pages/CaregiverDashboard";
import "../style/login.css"
import "../App.css"
import TasksRewards from "./CaregiverDashboard/TasksRewards";

const Main = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<WhoLogsIn />} />
        <Route path="/childlogin" element={<ChildLogin />} />
        <Route path="/caregiverlogin" element={<CaregiverLogin />} />
        <Route path="register" element={<RegisterForm />} />
        <Route path='/caregiverdashboard' element={<CaregiverDashboard/>} />
        <Route path='/tasksrewards' element={<TasksRewards/>} />
      </Routes>
    </div>
  );
};

export default Main;
