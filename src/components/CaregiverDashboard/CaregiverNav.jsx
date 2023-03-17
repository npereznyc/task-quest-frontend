import React from 'react'
import { Link } from 'react-router-dom'

export default function CaregiverNav() {
    return (
        <>
        <div className="caregiverDashboard-navLogo"></div>
        <nav className="dash">
            <Link className="dash-link" to="/caregiverdashboard">Your Knights</Link> <br/>
            <Link className="qr-link" to="/caregiverdashboard/QuestsAndRewards">Quests and Rewards</Link>
        </nav>
        </>
    )
}