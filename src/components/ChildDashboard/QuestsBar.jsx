import React from 'react'
import { useState, useEffect } from 'react'

export default function QuestsBar(props) {
    const [tasks, setTasks] = useState([])

    const listTasks = async () => {
        try {
            const response = await fetch('/task', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            setTasks(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        listTasks()
    }, [tasks])

    return (
        <div>
            <div className='todays-quests'>
                <ul>
                    {tasks.map((chat) => {
                        // return (
                        //     <li key={task._id}>
                        //         <div className='task-name'>{task.taskName}</div>
                        //         <div className='task-points'>{task.taskPoints} Points</div>
                        //     </li>
                        // )

                    })}
                </ul>
                <div className='points'>POINTS</div>
            </div>
        </div>
    )
}
