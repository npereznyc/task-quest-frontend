import React from 'react'
import CaregiverNav from '../components/CaregiverDashboard/CaregiverNav'
import ChildList from '../components/CaregiverDashboard/ChildList'
import Rewards from '../components/CaregiverDashboard/CreateRewards'
import RewardsEarned from '../components/CaregiverDashboard/RewardsEarned'
import CreateRewards from '../components/CaregiverDashboard/CreateRewards'
import EditRewardsAndTasks from '../components/CaregiverDashboard/EditRewardsAndTasks'
import TaskList from '../components/CaregiverDashboard/Task'

export default function CaregiverDashboard() {
    return (
        <div>
            <CaregiverNav />
            <ChildList />
            <TaskList />
        </div>
    )
}
