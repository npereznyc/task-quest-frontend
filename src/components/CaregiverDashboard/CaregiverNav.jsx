import React from 'react'
import { Link } from 'react-router-dom'

export default function CaregiverNav() {
    return (
        <nav>
            <Link to="/caregiverdashboard">Dashboard</Link> <br/>
            <Link to="/caregiverdashboard/editrewardsandtasks">Quests & Rewards</Link>
            <Link to="/tasksrewards">Quests & Rewards</Link><br/>
            <Link to="/editrewardsandtasks">Edit Quests & Rewards</Link>
        </nav>
    )
}