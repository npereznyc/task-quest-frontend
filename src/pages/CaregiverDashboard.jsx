import React from 'react'
import CaregiverNav from '../components/CaregiverDashboard/CaregiverNav'
import AddChild from '../components/CaregiverDashboard/AddChild'
import ChildList from '../components/CaregiverDashboard/ChildList'
import Rewards from '../components/CaregiverDashboard/Rewards'
import RewardsEarned from '../components/CaregiverDashboard/RewardsEarned'
import Tasks from '../components/CaregiverDashboard/Tasks'

export default function CaregiverDashboard() {
    return (
        <div>
            <CaregiverNav />
            <AddChild />
            <ChildList />
            <Rewards />
            <RewardsEarned />
            <Tasks />
        </div>
    )
}
