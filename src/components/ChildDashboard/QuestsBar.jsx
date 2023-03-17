import React, { useState, useEffect } from "react";
import axios from "axios";

export default function QuestsBar({ childObject }) {
  const [tasks, setTasks] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("child"));
  const [totalPoints, setTotalPoints] = useState(0)
  const childId = currentUser._id;

  const caregiverId = currentUser.caregiverId;
  const taskArray = currentUser.taskArray;

  console.log(currentUser.totalPoints);
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

  const getTotalPoints = async () => {
    try {
      console.log(childId)
      const response = await axios.get(
        `http://localhost:4000/child/${childId}`
      );
      const totalPoints = response.data.totalPoints;
      console.log(response)
      setTotalPoints(totalPoints);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    listTasks();
    getTotalPoints()
  }, []);

  /*   useEffect(() => {
      setChild(JSON.parse(localStorage.getItem("child")));
    }, []); */

  const handleCompleteTask = async (taskId) => {
    try {
      console.log(childId);
      await axios.put(
        `http://localhost:4000/tasks/complete/${taskId}/${childId}/`
      );
      getTotalPoints()
      listTasks();;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{currentUser.childName}</h1>
      <h2>Total Coins: {totalPoints}</h2>
      <div className='quests-rewards-container'>
        <div className='incomplete-quests-box'>
          <div clasName='box'>
            <div className="caregiverDashboard-navLogo"></div>
            <h3>Today's Quests</h3>
            <div className="quest-bars">
              {/* <ul className='individual-quest'> */}
              {tasks.filter(task => !task.completed).map((task) => (
                <div className="each-quest" key={task._id}>
                  <div className="each-quest-detail">
                    <button className='completeBtn' onClick={() => handleCompleteTask(task._id)}>Complete</button>
                    <span className="task-name">{task.taskName}</span>
                    <div className="coinAvatar"></div>
                    <span className="task-points">{task.taskPoints} Coins </span>
                  </div>


                </div>
              ))}
              {/* </ul> */}
            </div>
          </div>

        </div>

      </div>
      <div className='quests-rewards-container'>
        <div className='complete-quests-box'>
          <div className="complete-quests">
            <h3>Completed Quests</h3>
            <ul>
              {tasks.filter(task => task.completed).map((task) => (
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
}
