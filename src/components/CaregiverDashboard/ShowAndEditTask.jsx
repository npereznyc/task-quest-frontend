import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ShowAndEditTask = ({ taskIds, setRenderEffect }) => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false); // track whether API call is complete
  const [openChildId, setOpenChildId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("caregiver"));
  const caregiverId = currentUser._id;
  const token = currentUser.token;

  const [listOfChildren, setListOfChildren] = useState([]);
  const [listOfChildrenWithoutTask, setListOfChildrenWithoutTask] = useState(
    []
  );
  const [numTasks, setNumTasks] = useState(0); // track number of task
  const [activeTaskId, setActiveTaskId] = useState(null);

  const toggleTaskAccordion = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const fetchTasks = async () => {
      const taskData = await Promise.all(
        taskIds?.map((taskId) =>
          axios.get(`http://localhost:4000/tasks/${taskId}`)
        )
      );
      const taskList = taskData?.map((task, index) => ({
        id: taskIds[index],
        taskName: task.data.taskName || "",
        taskDescription: task.data.taskDescription || "",
        completed: task.data.completed || false,
        image: "",
        taskPoints: task.data.taskPoints || "",
        dueDate: "",
      }));
      setTasks(taskList);

      setNumTasks(taskList.length);
      setIsLoaded(true); // update state to indicate API call is complete
    };

    const fetchChilds = async () => {
      const childData = await axios.get(
        `http://localhost:4000/caregiver/${caregiverId}/children`
      );
      setListOfChildren(childData.data);
      filterChildren();
      console.log(listOfChildren);
    };

    fetchChilds();
    fetchTasks();
  }, [taskIds, numTasks]);

  const validationSchema = Yup.object().shape({
    taskName: Yup.string().required("Required"),
    taskDescription: Yup.string().required("Required"),
    taskPoints: Yup.number()
      .typeError("Must be a number")
      .positive("Must be positive")
      .required("Required"),
    dueDate: Yup.date().required("Required"),
  });

  const handleSubmit = (values, taskId) => {
    axios
      .put(`http://localhost:4000/tasks/${taskId}`, values)
      .then(() => {
        console.log("Task updated successfully");
        navigate("/caregiverdashboard/QuestsAndRewards");
      })
      .catch((err) => console.log(err));
  };

  if (!isLoaded) {
    return <div>Loading...</div>; // show loading message while API call is in progress
  }

  const assignTaskToChild = (taskId, childId) => {
    axios
      .post(`http://localhost:4000/tasks/${taskId}/${childId}`)
      .then(() => {
        console.log(`Task ${taskId} assigned to child ${childId} successfully`);
      })
      .catch((err) => console.log(err));
  };

  const filterChildren = (assignedIds) => {
    const newList = listOfChildren.filter(
      (child) => !assignedIds?.includes(child._id)
    );
    setListOfChildrenWithoutTask(newList);
  };
  const handleDeleteSubmit = (taskId) => {
    const res = axios
      .delete(`http://localhost:4000/tasks/${taskId}/`)
      .then(() => {
        console.log(`Task ${taskId} has been delete successfully`);
        setNumTasks(numTasks - 1);
        setRenderEffect(res);
      })
      .catch((err) => console.log(err));
  };

  const handleChildClick = (childId) => {
    setOpenChildId(childId === openChildId ? null : childId);
  };

  const childrenWithoutTask = listOfChildren.filter((child) => {
    return !tasks.some((task) => task.childId === child._id && !task.completed);
  });

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="quests-rewards">
      <div onClick={toggleTaskAccordion} className="adult-tasks">
        <div  className="tasks-header">
          <h1 className="tasks-title">Tasks</h1>
          <p className="num-adult-tasks">
            <span>{taskIds.length}</span>
            <span>Total Tasks</span>
          </p>
        </div>
      </div>
      <div className="qst">
        {isOpen && (
          <div className="quest-bars">
            {tasks?.map((task, index) => (
              <div className="each-quest" key={index}>
                <div clasSName="assign-name-div">
                  <h2 className="each-quest-detail">
                    <span className="adults-task-name">{task?.taskName}</span>
                    <span className="adults-task-coins">
                      {task?.taskPoints} coins
                    </span>
                    <button
                      className="edit-task-btn"
                      onClick={() => toggleAccordion(taskIds[index])}
                    >
                      Edit
                    </button>
                  </h2>
                </div>
                {activeTaskId === taskIds[index] && (
                  <div className="assign-form">
                    <Formik
                      initialValues={task}
                      validationSchema={validationSchema}
                      onSubmit={(values) =>
                        handleSubmit(values, taskIds[index])
                      }
                    >
                      {({ values, errors, touched }) => (
                        <Form>
                          <div>
                            <label htmlFor="taskName">Task Name</label>
                            <Field type="text" name="taskName" />
                            <ErrorMessage name="taskName" />
                          </div>

                          <div>
                            <label htmlFor="taskDescription">
                              Task Description
                            </label>
                            <Field type="text" name="taskDescription" />
                            <ErrorMessage name="taskDescription" />
                          </div>

                          <div>
                            <label htmlFor="completed">Completed?</label>
                            <Field type="checkbox" name="completed" />
                          </div>

                          <div>
                            <label htmlFor="image">Image URL</label>
                            <Field type="text" name="image" />
                            <ErrorMessage name="image" />
                          </div>

                          <div>
                            <label htmlFor="taskPoints">Task Points</label>
                            <Field type="number" name="taskPoints" />
                            <ErrorMessage name="taskPoints" />
                          </div>

                          <div>
                            <label htmlFor="dueDate">Due Date</label>
                            <Field type="date" name="dueDate" />
                            <ErrorMessage name="dueDate" />
                          </div>

                          <button type="submit">Update Task</button>
                          <button
                            type="submit"
                            onClick={() => {
                              handleDeleteSubmit(task.id);
                            }}
                          >
                            Delete Task
                          </button>

                          <div>
                            <label htmlFor="child">Assign to Child:</label>
                            <Field as="select" name="child">
                              <option value="">-- Select a Child --</option>
                              {listOfChildren?.map((child) => (
                                <option key={child._id} value={child._id}>
                                  {child.childName}
                                </option>
                              ))}
                            </Field>
                          </div>
                          <button
                            type="submit"
                            onClick={() => {
                              const childId = values.child; // obtain the selected child ID from the form values
                              assignTaskToChild(task.id, childId);
                            }}
                          >
                            Assign to Child
                          </button>
                        </Form>
                      )}
                    </Formik>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="assign-quest-div">
        <h1 className="assign-quest">Assign Quest</h1>
      </div>
      {listOfChildrenWithoutTask?.length > 0 ? (
        <div className="assign-quest-section">
          {listOfChildrenWithoutTask?.map((child) => (
            <div className="assign-quest-per-child" key={child._id}>
              <h4
                className="assign-child-quest"
                onClick={() => handleChildClick(child._id)}
              >
                {child.childName}
              </h4>
              {openChildId === child._id && (
                <ul className="assign-list">
                  {tasks
                    ?.filter((task) => !task?.completed)
                    .map((task) => (
                      <li className="assign-point" key={task?.id}>
                        {task?.taskName} {task?.taskPoints} points{" "}
                        <button
                          className="assign-btn"
                          onClick={() => assignTaskToChild(task?.id, child._id)}
                        >
                          Assign Task
                        </button>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="all-assigned"></p>
      )}
    </div>
  );
};

export default ShowAndEditTask;
