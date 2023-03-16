import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Auth from "../pages/Auth";
import Home from "../pages/Home";
import WhoLogsIn from "../pages/WhoLogsIn";
import ChildLogin from "./ChildLogin";
import CaregiverLogin from "./CaregiverLogin";
import RegisterForm from "./RegisterForm";
// import ChildDashboard from "./ChildDashboard"
import CaregiverDashboard from "../pages/CaregiverDashboard";
import "../style/login.css";
import "../style/editTask.css";
import "../style/quests&rewards.css";
import "../App.css";
import '../style/childDashboard.css'
import QuestsAndRewards from "./CaregiverDashboard/QuestsAndRewards";
import ChildDashboard from "../pages/ChildDashboard";
import AddChild from "./CaregiverDashboard/AddChild";


const Main = () => {
  return (
    <div>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<WhoLogsIn />} />
        <Route path="/childlogin" element={<ChildLogin />} />
        <Route path="/childdashboard" element={<ChildDashboard />} />
        <Route path="/caregiverlogin" element={<CaregiverLogin />} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="/caregiverdashboard" element={<CaregiverDashboard />} />
        <Route path="/caregiverdashboard/QuestsAndRewards" element={<QuestsAndRewards />} />
        {/* <Route path="/addChild" element={<AddChild />} /> */}
        <Route path="/tasksrewards" />
      </Routes>
    </div>
  );
};

export default Main;
