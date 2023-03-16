import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

const URL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

export default function ({ taskIds }) {
  const [tasks, setTasks] = useState([]);

  async function getTasks() {
    try {
      const taskData = await Promise.all(
        taskIds?.map((id) =>
          axios.get(`http://localhost:4000/tasks/incompleteandcomplete/${id}`)
        )
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
        <h4>To Do: </h4>
        {tasks?.map((task, index) => (
          <>
            <div>
              <span>
                {task?.data?.incompletedTask?.map((task, index) => (
                  <div>
                    {task?.taskName} {task?.taskPoints}{" "}
                  </div>
                ))}
              </span>
            </div>
          </>
        ))}
        <h4>Completed:</h4>
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
