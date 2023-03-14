import React from 'react'
import { useState, useEffect } from 'react'

export default function QuestsBar(props) {
    const [tasks, setTasks] = useState([])
    const [task, setTask] = useState({
        caregiverID: [],
        taskName: '',
        completed: '',
        image: '',
        taskPoints: '',
        dueDate: ''
    })

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
    const createTask = async () => {
        try {
            const response = await fetch(`/task`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...task })
            })
            const data = await response.json()
            setTask(data)
            setTask({
                caregiverID: [],
                taskName: '',
                completed: '',
                image: '',
                taskPoints: '',
                dueDate: ''
            })
        } catch (error) {
            console.error(error)
        }
    }

    const handleChange = (evt) => {
        setTask({ ...task, [evt.target.name]: evt.target.value})
    }
    useEffect(() => {
        listTasks()
    }, [task])
    return (
        <div>
            <div className='quests-view'>
                <div className='todays-quests'>Today's Quests</div>
                <div className='completed-quests'>Completed</div>
            </div>
        </div>
    )
}
