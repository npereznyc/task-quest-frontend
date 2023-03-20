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

      <div className="quests-rewards-cont">
        <div className="complete-box">
          <div className="complete-quests">
            {tasks
              .filter((task) => task.completed)
              .map((task) => (
                <div className="complete-bar" key={task._id}>
                  <div className="complete-name">
                    <h4 class="completedBtn"></h4>
                    <span className="tasknm">{task.taskName}</span>
                  </div>
                  <div className="complete-pay">
                    <div class="child-coin"></div>
                    <p className="taskpt">
                      <span className="taskpt-int larger">{task.taskPoints}</span>
                      <span className="taskpt-coins smaller">coins</span>{" "}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <br/>
      </div>
      <br/>
    </div>
  );
};

export default ChildCompleted;
