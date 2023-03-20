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
        taskArray?.map((id) =>
          axios.get(`https://quest-runner.herokuapp.com/tasks/incompleteandcomplete/${id}`)
        )
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
  const accordionHeaderClassName = isOpen ? "child-bar-active" : "child-bar";

  return (
    <div className="child-bars">
      <div className="child-section">
        <div className={accordionHeaderClassName} onClick={toggleAccordion}>
        <div className="childAvatar"></div>
          <h1 className="child-name"> {childName}</h1>
          <div className="content">

          
          <p className="total-incompleted">
            <span className="number"> {totalNotCompleted}</span>
            <span>Not Completed</span>{" "}
          </p>
          <p className="total-completed">
            <span className="number"> {totalCompleted}</span>
            <span>Completed</span>
          </p>
        </div></div>
        <div className="task-details">
          {isOpen && (
            <div>
              <Task taskIds={taskArray} childId={childId} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
