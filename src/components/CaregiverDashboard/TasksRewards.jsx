import React from 'react'
import CaregiverNav from './CaregiverNav'
// import ChildList from '../components/CaregiverDashboard/ChildList'
// import RewardsEarned from '../components/CaregiverDashboard/RewardsEarned'
// import Tasks from '../components/CaregiverDashboard/Tasks'
import CreateRewards from './CreateRewards'
import CreateTask from './CreateTask'

export default function TasksRewards() {
    return (
        <div>
            <CaregiverNav />
            <CreateRewards />
            <CreateTask caregiverId={"6410a52aab95a2c2f235bb16"} />
            {/* <RewardsEarned /> */}
            {/* <Tasks /> */}
        </div>
    )
}
