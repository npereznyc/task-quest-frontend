import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import React from 'react';
import Auth from "../pages/Auth";
import ChildDashboard from "../pages/ChildDashboard";

const Main = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/child-dashboard" element={<ChildDashboard />}></Route>
      </Routes>
    </div>
  );
};

export default Main;
