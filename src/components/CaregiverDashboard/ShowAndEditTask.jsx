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


//fetching tasks by taskId:

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Formik, Field, Form, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import axios from "axios";

// const EditTask = ({ taskId }) => {
//     const navigate = useNavigate();
//     const [initialValues, setInitialValues] = useState({
//         taskName: "",
//         taskDescription: "",
//         completed: false,
//         image: "",
//         taskPoints: "",
//         dueDate: "",
//     });
//     const [isLoaded, setIsLoaded] = useState(false); // track whether API call is complete

//     useEffect(() => {
//         axios
//             .get(`http://localhost:4000/tasks/${taskId}`)
//             .then((res) => {
//                 console.log(res.data); // check the response data
//                 const taskData = res.data;
//                 setInitialValues({
//                     taskName: taskData.taskName || "",
//                     taskDescription: taskData.taskDescription || "",
//                     completed: taskData.completed || false,
//                     image: "",
//                     taskPoints: taskData.taskPoints || "",
//                     dueDate: "",
//                 });
//                 setIsLoaded(true); // update state to indicate API call is complete
//             })
//             .catch((err) => console.log(err));
//     }, [taskId]);

//     const validationSchema = Yup.object().shape({
//         taskName: Yup.string().required("Required"),
//         taskDescription: Yup.string().required("Required"),
//         taskPoints: Yup.number()
//             .typeError("Must be a number")
//             .positive("Must be positive")
//             .required("Required"),
//         dueDate: Yup.date().required("Required"),
//     });

//     const handleSubmit = (values) => {
//         axios
//             .put(`http://localhost:4000/tasks/${taskId}`, values)
//             .then(() => {
//                 console.log("Task updated successfully");
//                 navigate("/tasksrewards");
//             })
//             .catch((err) => console.log(err));
//     };

//     if (!isLoaded) {
//         return <div>Loading...</div>; // show loading message while API call is in progress
//     }

//     return (
//         <div>
//             <h1>Edit Task</h1>
//             <Formik
//                 initialValues={initialValues}
//                 validationSchema={validationSchema}
//                 onSubmit={handleSubmit}
//             >
//                 {({ values, errors, touched }) => (
//                     <Form>
//                         <div>
//                             <label htmlFor="taskName">Task Name</label>
//                             <Field type="text" name="taskName" />
//                             <ErrorMessage name="taskName" />
//                         </div>

//                         <div>
//                             <label htmlFor="taskDescription">Task Description</label>
//                             <Field type="text" name="taskDescription" />
//                             <ErrorMessage name="taskDescription" />
//                         </div>

//                         <div>
//                             <label htmlFor="completed">Completed?</label>
//                             <Field type="checkbox" name="completed" />
//                         </div>


//                         <div>
//                             <label htmlFor="image">Image URL</label>
//                             <Field type="text" name="image" />
//                             <ErrorMessage name="image" />
//                         </div>

//                         <div>
//                             <label htmlFor="taskPoints">Task Points</label>
//                             <Field type="number" name="taskPoints" />
//                             <ErrorMessage name="taskPoints" />
//                         </div>

//                         <div>
//                             <label htmlFor="dueDate">Due Date</label>
//                             <Field type="date" name="dueDate" />
//                             <ErrorMessage name="dueDate" />
//                         </div>

//                         <button type="submit">Update Task</button>
//                     </Form>
//                 )}
//             </Formik>
//         </div>
//     );
// };

// export default EditTask;