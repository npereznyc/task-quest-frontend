import React from 'react'
import CaregiverNav from './CaregiverNav'
// import ChildList from '../components/CaregiverDashboard/ChildList'
// import RewardsEarned from '../components/CaregiverDashboard/RewardsEarned'
// import Tasks from '../components/CaregiverDashboard/Tasks'
import CreateReward from './CreateReward'
import CreateTask from './CreateTask'
import ShowAndEditReward from './ShowAndEditReward'
import ShowAndEditTask from './ShowAndEditTask'

export default function EditRewardsAndTasks() {
    return (
        <div>
            <CaregiverNav />
            <ShowAndEditTask taskIds={["641143b24883184ba2316566", "641145f7e129e66d8c50ff9a"]}/>
            <CreateTask caregiverId={"6411ec4e8f2e3f2e70575649"} />
            <ShowAndEditReward caregiverId={"6411ec4e8f2e3f2e70575649"}/>
            <CreateReward caregiverId={['6411ec4e8f2e3f2e70575649']} />
            {/* <RewardsEarned /> */}
            {/* <Tasks /> */}
        </div>
    )
}
