import React from 'react'
import CaregiverNav from './CaregiverNav'
// import ChildList from '../components/CaregiverDashboard/ChildList'
// import RewardsEarned from '../components/CaregiverDashboard/RewardsEarned'
// import Tasks from '../components/CaregiverDashboard/Tasks'
import CreateRewards from './CreateRewards'
import CreateTask from './CreateTask'
import EditTask from './EditTask'

export default function TasksRewards() {
    return (
        <div>
            <CaregiverNav />
            <EditTask taskId={"6410fc936aa948aa2b147d3f"}/>
            <CreateTask caregiverId={"6410a52aab95a2c2f235bb16"} />
            <CreateRewards />
            {/* <RewardsEarned /> */}
            {/* <Tasks /> */}
        </div>
    )
}
