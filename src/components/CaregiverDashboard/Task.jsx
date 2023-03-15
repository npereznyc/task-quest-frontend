import { useState, useEffect } from "react"
import { useParams } from 'react-router'


export default function (taskId) {
    const [tasks, setTasks] = useState()
    console.log('taskId: ', taskId)

    async function getTasks() {
        let tasks
        try {
            const response = await fetch(`http://localhost:4000/tasks/${taskId}`)
            tasks = await response.json()
        } catch (err) {
            console.error(err.message)
        } finally {
            setTasks(tasks)
        }
    }
    console.log('tasks: ', tasks)

    useEffect(() => {
        getTasks()
    }, [])

    return (
        <div className="task-list">
           
                {tasks ? <div className="tasks">{tasks.taskName}</div> : null}
                {/* Tasks: {tasks.taskName} <br />
                Description: {tasks.taskDescription} */}
        
        </div>
    )
}