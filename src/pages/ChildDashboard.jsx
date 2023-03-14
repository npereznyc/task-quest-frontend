import React from 'react'
import ChildDashboardNavBar from '../components/ChildDashboard/ChildDashboardNavBar'
import LeaderBoard from '../components/ChildDashboard/LeaderBoard'
import QuestsBar from '../components/ChildDashboard/QuestsBar'
import RedeemRewards from '../components/ChildDashboard/RedeemRewards'

export default function ChildDashboard() {
    return (
        <div>
            <ChildDashboardNavBar />
            <LeaderBoard />
            <QuestsBar />
            <RedeemRewards />
        </div>
    )
}
