import React from 'react'
import ChildDashboardNavBar from '../components/ChildDashboard/ChildDashboardNavBar'
import QuestsBar from '../components/ChildDashboard/QuestsBar'
import RedeemRewards from '../components/ChildDashboard/RedeemRewards'
import LeaderBoard from '../components/ChildDashboard/LeaderBoard'

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
