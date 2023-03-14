import React from 'react'
import CaregiverNav from './CaregiverNav'
// import ChildList from '../components/CaregiverDashboard/ChildList'
// import RewardsEarned from '../components/CaregiverDashboard/RewardsEarned'
// import Tasks from '../components/CaregiverDashboard/Tasks'
import CreateRewards from './CreateRewards'

export default function TasksRewards() {
    return (
        <div>
            <CaregiverNav />
            <CreateRewards />
            {/* <RewardsEarned /> */}
            {/* <Tasks /> */}
        </div>
    )
}
