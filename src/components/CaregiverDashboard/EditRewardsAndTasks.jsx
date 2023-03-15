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

export default function EditRewardsAndTasks() {
    const currentUser = JSON.parse(localStorage.getItem("caregiver"));
    const caregiverId = currentUser._id;
    const token = currentUser.token;

    return (
        <div>
            <CaregiverNav />
            <ShowAndEditTask caregiverId={caregiverId}/>
            <CreateTask caregiverId={caregiverId} />
            <ShowAndEditReward caregiverId={caregiverId}/>
            <CreateReward caregiverId={caregiverId} />
            {/* <RewardsEarned /> */}
            {/* <Tasks /> */}
        </div>
    )
}
