import React from 'react'
import { Link } from 'react-router-dom'

export default function ChildDashboardNavBar() {
    return (
        <>
        <div className="caregiverDashboard-navLogo"></div>
        <nav className="dash">
            <Link className="dash-link" to="/childdashboard">Today's Quests</Link> <br/>
            <Link className="qr-link" to="/caregiverdashboard/completedquests">Completed Quests</Link>
        </nav>
        </>
    )
}
