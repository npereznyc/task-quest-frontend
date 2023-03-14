import React from 'react'
import ParentNav from '../components/ParentDashboard/ParentNav'
import AddChild from '../components/ParentDashboard/AddChild'
import ChildList from '../components/ParentDashboard/ChildList'
import Rewards from '../components/ParentDashboard/Rewards'
import RewardsEarned from '../components/ParentDashboard/RewardsEarned'
import Tasks from '../components/ParentDashboard/Tasks'

export default function ParentDashboard() {
    return (
        <div>
            <ParentNav />
            <AddChild />
            <ChildList />
            <Rewards />
            <RewardsEarned />
            <Tasks />
        </div>
    )
}
