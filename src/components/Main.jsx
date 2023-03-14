import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import React from 'react';
import Auth from "../pages/Auth";

const Main = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Auth />} />
      </Routes>
    </div>
  );
};

export default Main;
