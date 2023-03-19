import ChildDashboardNavBar from "./ChildDashboardNavBar";
import React, { useState, useEffect } from "react";
import QuestsBar from "./QuestsBar";
import axios from "axios";

const ChildCompleted = () => {
  const [tasks, setTasks] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("child"));
  const taskArray = currentUser.taskArray;

  const listTasks = async () => {
    try {
      const taskData = await Promise.all(
        taskArray.map((id) => axios.get(`http://localhost:4000/tasks/${id}`))
      );

      const tasks = taskData.map((response) => response.data);

      setTasks(tasks);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    listTasks();
  }, []);

  return (
    <div>
      <ChildDashboardNavBar />

      <div className="quests-rewards-container">
        <div className="complete-quests-box">
          <div className="complete-quests">
            <h3>Completed Quests</h3>
            <ul>
              {tasks
                .filter((task) => task.completed)
                .map((task) => (
                  <li key={task._id}>
                    <span className="task-name">{task.taskName}</span>
                    <span className="task-name">{task.taskPoints} POINTS </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildCompleted;
