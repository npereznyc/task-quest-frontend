import React from 'react'
import CaregiverNav from './CaregiverNav'
// import ChildList from '../components/CaregiverDashboard/ChildList'
// import RewardsEarned from '../components/CaregiverDashboard/RewardsEarned'
// import Tasks from '../components/CaregiverDashboard/Tasks'
import CreateReward from './CreateReward'
import CreateTask from './CreateTask'
import ShowAndEditReward from './ShowAndEditReward'
import ShowAndEditTask from './ShowAndEditTask'
import { useState, useEffect } from "react";
import axios from "axios";

export default function QuestsAndRewards() {
    const currentUser = JSON.parse(localStorage.getItem("caregiver"));
    const caregiverId = currentUser._id;
    const token = currentUser.token;
    const [arrayOfAllCaregiverTaskIds, setArrayOfAllCaregiverTaskIds] = useState([]);

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
    }, []);

    return (
        <div>
            <CaregiverNav />
            <ShowAndEditTask taskIds={arrayOfAllCaregiverTaskIds}/>
            <CreateTask caregiverId={caregiverId} />
            <ShowAndEditReward caregiverId={caregiverId}/>
            <CreateReward caregiverId={caregiverId} />
            {/* <RewardsEarned /> */}
            {/* <Tasks /> */}
        </div>
    )
}
