import React from 'react'
import { Link } from 'react-router-dom'

export default function CaregiverNav() {
    return (
        <nav>
            <Link to="/caregiverdashboard">Dashboard</Link> <br/>
            <Link to="/editrewardsandtasks">Quests & Rewards</Link>
        </nav>
    )
}