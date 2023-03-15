import React from 'react'
import ChildDashboardNavBar from '../components/ChildDashboard/ChildDashboardNavBar'
import QuestsBar from '../components/ChildDashboard/QuestsBar'
import RedeemRewards from '../components/ChildDashboard/RedeemRewards'
import LeaderBoard from '../components/ChildDashboard/LeaderBoard'

export default function ChildDashboard() {

    const currentUser = JSON.parse(localStorage.getItem("caregiver"));
    const caregiverId = currentUser.caregiverId;
    const token = currentUser.token;

    return (
        <div>
            <ChildDashboardNavBar />
            <LeaderBoard />
            <QuestsBar />
            <RedeemRewards caregiverId={caregiverId} />
        </div>
    )
}
