import React from 'react'
import { Link } from 'react-router-dom'

export default function CaregiverNav() {
    return (
        <nav>
            <Link to="/quests">Today's Quests</Link> <br/>
            <Link to="/tasksrewards">Tasks & Rewards</Link>
        </nav>
    )
}