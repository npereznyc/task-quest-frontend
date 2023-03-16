import React, { useState, useEffect } from "react";
import axios from "axios";

export default function QuestsBar({ childObject }) {
  const [tasks, setTasks] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("child"));
  const childId = currentUser._id;
  const [child, setChild] = useState();

  const caregiverId = currentUser.caregiverId;
  const taskArray = currentUser.taskArray;

  console.log(childObject?.childName);
  const listTasks = async () => {
    /* try {
      const taskData = await Promise.all(
        taskArray?.map((id) => axios.get(`http://localhost:4000/tasks/${id}`))
      );
      console.log(taskData);
      setTasks(taskData?.map((response) => response?.data));
      console.log(tasks);
    }
      catch (error) {
      console.error(error);
    } */
    try {
      const taskData = await Promise.all(
        taskArray.map((id) => axios.get(`http://localhost:4000/tasks/${id}`))
      );
      console.log(taskData);
      const tasks = taskData.map((response) => response.data);
      console.log(tasks);
      setTasks(tasks);
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
      <h1>{currentUser.childName}</h1>
      <h2>{currentUser.totalPoints}</h2>
      <div className='quests-rewards-container'>
        <div className='quests-box'>
          <div className="incomplete-quests">
            <h3>Today's Quests</h3>
            <ul className='individual-quest'>
              {tasks.filter(task => !task.completed).map((task) => (
                <div key={task._id}>
                  <button onClick={() => handleCompleteTask(task._id)}>Complete</button>
                  <span className="task-name">{task.taskName}</span>
                  <span className="task-points">{task.taskPoints} Coins </span>
                </div>
              ))}
            </ul>
          </div>
        </div>

      </div>

      <div className="complete-quests">Completed Quests
        <ul>
          {tasks.filter(task => task.completed).map((task) => (
            <li key={task._id}>
              <span className="task-name">{task.taskName}</span>
              <span className="task-name">{task.taskPoints} POINTS </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="points">POINTS</div>
    </div>
  );
}
