import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../../style/editTask.css"

const ShowAndEditTask = ({ caregiverId }) => {
  console.log('caregiver: ', caregiverId)
  const navigate = useNavigate();

  //accordian
  const [openTaskId, setOpenTaskId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false); // track whether API call is complete

  const handleOpen = (index) => {
    setOpenTaskId(index);
  };

  const handleClose = () => {
    setOpenTaskId(null);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      axios.get(`http://localhost:4000/tasks/show/${caregiverId}`)
        .then(response => {
          setTasks(response.data);
        })
        .catch(error => {
          console.log(error)
        })
      console.log('tasks: ', tasks)
      setIsLoaded(true); // update state to indicate API call is complete
    };
    fetchTasks();
  }, [caregiverId]);

  const validationSchema = Yup.object().shape({
    taskName: Yup.string().required("Required"),
    taskDescription: Yup.string().required("Required"),
    taskPoints: Yup.number()
      .typeError("Must be a number")
      .positive("Must be positive")
      .required("Required"),
    dueDate: Yup.date().required("Required"),
  });

  // const handleSubmit = (values, taskId) => {
  //   axios
  //     .put(`http://localhost:4000/tasks/${taskId}`, values)
  //     .then(() => {
  //       console.log("Task updated successfully");
  //       navigate("/editrewardsandtasks");
  //     })
  //     .catch((err) => console.log(err));
  // };

  if (!isLoaded) {
    return <div>Loading...</div>; // show loading message while API call is in progress
  }

  return (
    <div>
      <div className="task-header">
        <h1 className="tasks-title">Tasks</h1>
        <div className="number-of-tasks">
          <h4>{tasks.length}</h4>
          <h4>Total Tasks</h4>
        </div>

      </div>
      <div className="task-container">
        {tasks.map((task, index) => (
          <div key={index}>
            <h2>
              {task.taskName}: {task.taskPoints} coins
            </h2>
            <button onClick={() => handleOpen(index)}>Assign</button>

            <button onClick={handleClose}>Close Form</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowAndEditTask;
