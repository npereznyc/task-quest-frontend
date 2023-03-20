import React from "react";
import CaregiverNav from "./CaregiverNav";
// import ChildList from '../components/CaregiverDashboard/ChildList'
// import RewardsEarned from '../components/CaregiverDashboard/RewardsEarned'
// import Tasks from '../components/CaregiverDashboard/Tasks'
import CreateReward from "./CreateReward";
import CreateTask from "./CreateTask";
import ShowAndEditReward from "./ShowAndEditReward";
import ShowAndEditTask from "./ShowAndEditTask";
import { useState, useEffect } from "react";
import axios from "axios";

export default function QuestsAndRewards() {
  const currentUser = JSON.parse(localStorage.getItem("caregiver"));
  const caregiverId = currentUser._id;
  const token = currentUser.token;
  const [arrayOfAllCaregiverTaskIds, setArrayOfAllCaregiverTaskIds] = useState(
    []
  );
  const [renderEffect, setRenderEffect] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/caregiver/${caregiverId}/tasks`
        );
        const arrayOfIds = response.data.map((obj) => obj._id);
        setArrayOfAllCaregiverTaskIds(arrayOfIds);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTasks();
  }, [renderEffect]);

  return (
    <div className="caregiverDashboardBody">
      <CaregiverNav />
      <div className="first-half">
        <ShowAndEditTask
          taskIds={arrayOfAllCaregiverTaskIds}
          setRenderEffect={setRenderEffect}
        />
        <CreateTask
          caregiverId={caregiverId}
          setRenderEffect={setRenderEffect}
        />
      </div>

      <div className="first-half">
        <ShowAndEditReward caregiverId={caregiverId} />
        <CreateReward caregiverId={caregiverId} />
      </div>
    </div>
  );
}
