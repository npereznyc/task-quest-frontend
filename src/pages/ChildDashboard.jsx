import React from 'react'
import ChildDashboardNavBar from '../components/ChildDashboardNavBar'
import LeaderBoard from '../components/LeaderBoard'
import QuestsBar from '../components/QuestsBar'
import RedeemRewards from '../components/RedeemRewards'

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
