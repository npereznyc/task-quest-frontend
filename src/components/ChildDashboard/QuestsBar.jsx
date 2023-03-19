import React, { useState, useEffect } from "react";
import axios from "axios";

export default function QuestsBar({ childObject, reRender }) {
  const [tasks, setTasks] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("child"));
  const childId = currentUser._id;

  const caregiverId = currentUser.caregiverId;
  const taskArray = currentUser.taskArray;

  console.log(currentUser.totalPoints);
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
  }, [reRender]);

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
    <div className="completed-div">
      <div className="quests-rewards-cont">
        <div className="incomplete-quests-box">
          <div className="box">
            <div className="quest-bars">
              {tasks
                .filter((task) => !task.completed)
                .map((task) => (
                  <div className="eachQuest" key={task._id}>
                    <div className="each-quest-detail child-quest-detail">
                      <div className="child-quest-name">
                        <button
                          className="completeBtn"
                          onClick={() => handleCompleteTask(task._id)}
                        >
                        </button>
                        <span className="task-name">{task.taskName}</span>
                      </div>
                      <div className="child-quest-pay">
                        <div className="child-coin"></div>

                        <span className="task-points">
                          
                          <span className="larger">{task.taskPoints}</span>
                          <span className="smaller">Coins</span>
                          
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
