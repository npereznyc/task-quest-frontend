import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

const URL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

export default function ({ taskIds }) {
  const [tasks, setTasks] = useState([]);

  async function getTasks() {
    try {
      const taskData = await Promise.all(
        taskIds?.map((id) => axios.get(`http://localhost:4000/tasks/${id}`))
      );

      setTasks(taskData);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getTasks();
  }, [taskIds]);

  return (
    <>
      <div className="task-list">
        <h1>todo</h1>
        {tasks?.map((task, index) => (
          <>
            <div>
              <span>
                {task?.data?.incompletedTask?.map((task) => (
                  <div>
                    {task?.taskName} {task?.taskPoints}{" "}
                  </div>
                ))}
              </span>
            </div>
          </>
        ))}
        <h1>completed</h1>
        {tasks?.map((task, index) => (
          <>
            <div>
              <span>
                {task?.data?.completedTask?.map((task) => (
                  <div>
                    {task?.taskName} {task?.taskPoints}{" "}
                  </div>
                ))}
              </span>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
