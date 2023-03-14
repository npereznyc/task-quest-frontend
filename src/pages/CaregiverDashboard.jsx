import React from 'react'
import CaregiverNav from '../components/CaregiverDashboard/CaregiverNav'
import ChildList from '../components/CaregiverDashboard/ChildList'
import Rewards from '../components/CaregiverDashboard/CreateRewards'
import RewardsEarned from '../components/CaregiverDashboard/RewardsEarned'
import Tasks from '../components/CaregiverDashboard/Tasks'
import CreateRewards from '../components/CaregiverDashboard/CreateRewards'
import TasksRewards from '../components/CaregiverDashboard/TasksRewards'

export default function CaregiverDashboard() {
    return (
        <div>
            <CaregiverNav />
            <ChildList />
            {/* <TasksRewards /> */}
        </div>
    )
}
