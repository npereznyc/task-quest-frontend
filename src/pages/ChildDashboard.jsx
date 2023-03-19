import React from "react";
import ChildDashboardNavBar from "../components/ChildDashboard/ChildDashboardNavBar";
import QuestsBar from "../components/ChildDashboard/QuestsBar";
import RedeemRewards from "../components/ChildDashboard/RedeemRewards";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ChildDashboard() {
  const currentUser = JSON.parse(localStorage.getItem("child"));
  const caregiverId = currentUser.caregiverId;
  const token = currentUser.token;
  const [child, setChild] = useState(null);
  const [reRender, setReRender] = useState();

  useEffect(() => {
    const fetchChild = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/child/${currentUser._id}`
        );
        setChild(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchChild();
  }, []);

  return (
    <div>
      <ChildDashboardNavBar />
      <QuestsBar childObject={child} reRender={reRender} />
      <RedeemRewards caregiverId={caregiverId} setReRender={setReRender} />
    </div>
  );
}
