import React, { useState, useEffect } from "react";
import axios from "axios";

export default function QuestsBar() {
  const [tasks, setTasks] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("child"));
  const childId = currentUser._id;
  const [child, setChild] = useState();

  const caregiverId = currentUser.caregiverId;
  const taskArray = currentUser.taskArray;

  const listTasks = async () => {
    try {
      const taskData = await Promise.all(
        taskArray?.map((id) => axios.get(`http://localhost:4000/tasks/${id}`))
      );
      console.log(taskData);
      setTasks(taskData?.map((response) => response?.data));
      console.log(tasks);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    listTasks();
  }, []);

  const handleCompleteTask = async (taskId) => {
    try {
      console.log(childId);
      await axios.put(
        `http://localhost:4000/tasks/complete/${taskId}/${childId}/`
      );

      listTasks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="todays-quests">
        <h1>{currentUser.childName}</h1>
        <h2>{currentUser.totalPoints}</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              {task?.incompletedTask?.map((task) => (
                <div>
                  <button onClick={() => handleCompleteTask(task._id)}>
                    Complete
                  </button>
                  <span className="task-name">{task?.taskName}</span>

                  <span className="task-name">{task?.taskPoints}</span>
                </div>
              ))}
            </li>
          ))}
        </ul>
        <div className="points">POINTS</div>
      </div>
    </div>
  );
}
