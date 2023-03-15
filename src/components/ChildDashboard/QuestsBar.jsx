import React from 'react'
import { useState, useEffect } from 'react'

export default function QuestsBar() {
    const [tasks, setTasks] = useState([])
    const currentUser = JSON.parse(localStorage.getItem("child"));
    console.log(currentUser)
    const caregiverId = currentUser.caregiverId;
    console.log(caregiverId)
    // const token = currentUser.token;
    const listTasks = async () => {
        try {
            const response = await fetch(`http://localhost:4000/tasks/${caregiverId}/tasks`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            const tasks = await response.json()
            setTasks(tasks)
            console.log(tasks)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        listTasks()
    }, [])

    return (
        <div>
            <div className='todays-quests'>
                    <ul>
                        {tasks.map((task) => (
                                <li key={task._id}>
                                    <span className='task-name'>{task.taskName}</span>
                                    console.log(task.taskName)
                                    <span className='task-name'>{task.taskPoints}</span>
                                </li>
                        ))}
                    </ul>
                <div className='points'>POINTS</div>
            </div>
        </div>
    )
}
