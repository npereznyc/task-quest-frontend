
import React from 'react'
import CaregiverNav from '../components/CaregiverDashboard/CaregiverNav'
import ChildList from '../components/CaregiverDashboard/ChildList'
import RewardsEarned from '../components/CaregiverDashboard/RewardsEarned'
import EditRewardsAndTasks from '../components/CaregiverDashboard/EditRewardsAndTasks'
import TaskList from '../components/CaregiverDashboard/Task'
import '../style/dashboard.css'


export default function CaregiverDashboard() {
  return (
    <div>
      <CaregiverNav />
      <ChildList />
      {/* <TaskList /> */}
    </div>
  );
}
