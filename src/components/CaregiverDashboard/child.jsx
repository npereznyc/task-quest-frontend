import Task from "./Task";
import { useState, useEffect } from "react";
import axios from "axios";
import AddChild from "./AddChild";

const URL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

export default function Child({
  childId,
  caregiverId,
  childName,
  rewardsArray,
  taskArray,
}) {
  const [tasks, setTasks] = useState([]);
  const [totalNotCompleted, setTotalNotCompleted] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  async function getTasks() {
    try {
      const taskData = await Promise.all(
        taskArray?.map((id) => axios.get(`${URL}/tasks/${id}`))
      );
      console.log(taskData);
      setTasks(taskData.map((data) => data.data));
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getTasks();
  }, [taskArray]);

  useEffect(() => {
    calcTotalNotCompleted();
    calcTotalCompleted();
  }, [tasks]);

  const calcTotalNotCompleted = () => {
    let notCompleted = 0;
    for (let i = 0; i < tasks.length; i++) {
      let length = tasks[i]?.incompletedTask?.length || 0;
      notCompleted += length;
    }
    setTotalNotCompleted(notCompleted);
  };

  const calcTotalCompleted = () => {
    let completed = 0;
    for (let i = 0; i < tasks.length; i++) {
      let length = tasks[i]?.completedTask?.length || 0;
      completed += length;
    }
    setTotalCompleted(completed);
  };

  return (
    <>
      <div onClick={toggleAccordion}>
        <h1> {childName}</h1>
        <p>Not Completed: {totalNotCompleted}</p>
        <p>Completed: {totalCompleted}</p>
      </div>
      {isOpen && (
        <div>
        <Task taskIds={taskArray} childId={childId} />
      </div>)}
    </>
  );
}
