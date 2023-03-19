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
  const [listOfChildren, setListOfChildren] = useState([]);
  const [listOfChildrenWithoutTask, setListOfChildrenWithoutTask] = useState(
    []
  );
  const [numTasks, setNumTasks] = useState(0); // track number of task
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [activeAssignId, setActiveAssignId] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("caregiver"));
  const caregiverId = currentUser._id;

  const toggleAccordion = (taskId) => {
    setActiveTaskId(activeTaskId === taskId ? null : taskId);
  };
  const toggleAssignAccordion = (taskId) => {
    setActiveAssignId(activeAssignId === taskId ? null : taskId);
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

  return (
    <div className="quests-rewards">
      <div className="adult-tasks">
        <div className="tasks-header">
          <div className="icon-word">
            {" "}
            <div className="taskRunner"></div>
            <h1 className="tasks-title">Tasks</h1>
          </div>

          <p className="num-adult-tasks">
            <span className="num-num">{taskIds.length}</span>
            <span>Total Tasks</span>
          </p>
        </div>
      </div>
      <div className="qst">
        <div className="quest-bars">
          {tasks?.map((task, index) => (
            <div className="each-quest" key={index}>
              <div className="assign-name-div">
                <h2 className="each-quest-detail">
                  <span className="adults-task-name">
                    {" "}
                    <div className="swordAvatar"></div>
                    {task?.taskName}
                  </span>
                  <span className="adults-task-coins">
                    {task?.taskPoints} coins
                  </span>
                  <div className="change-btns">
                    <button
                      className="edit-task-btn"
                      onClick={() => toggleAccordion(taskIds[index])}
                    >
                      Edit
                    </button>
                    <button
                      className="edit-assign-btn"
                      onClick={() => toggleAssignAccordion(taskIds[index])}
                    >
                      Assign
                    </button>
                  </div>
                </h2>
              </div>
              {activeTaskId === taskIds[index] && (
                <div className="assign-form">
                  <Formik
                    initialValues={task}
                    validationSchema={validationSchema}
                    onSubmit={(values) => handleSubmit(values, taskIds[index])}
                  >
                    {({ values, errors, touched }) => (
                      <Form>
                        <div className="edit-div">
                          <label htmlFor="taskName">Task Name</label>
                          <br />
                          <Field
                            className="quest-input-input"
                            type="text"
                            name="taskName"
                          />
                          <ErrorMessage name="taskName" />
                        </div>

                        <div className="edit-div">
                          <label htmlFor="taskDescription">
                            Task Description
                          </label>
                          <br />
                          <Field
                            className="quest-input-input"
                            type="text"
                            name="taskDescription"
                          />
                          <ErrorMessage name="taskDescription" />
                        </div>

                        <div className="edit-div completed-task">
                          <label htmlFor="completed">Completed?</label>
                          <Field
                            className="checkbox"
                            type="checkbox"
                            name="completed"
                          />
                        </div>

                        <div className="edit-div">
                          <label htmlFor="taskPoints">Task Points</label>
                          <br />
                          <Field
                            className="quest-input-input"
                            type="number"
                            name="taskPoints"
                          />
                          <ErrorMessage name="taskPoints" />
                        </div>
                        <br />
                        <div className="edit-btns">
                          <button className="update-task" type="submit">
                            Update Task
                          </button>
                          <button
                            className="delete-task"
                            type="submit"
                            onClick={() => {
                              handleDeleteSubmit(task.id);
                            }}
                          >
                            Delete Task
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              )}
              {activeAssignId === taskIds[index] && (
                <div className="assign-form">
                  <Formik
                    initialValues={task}
                    validationSchema={validationSchema}
                    onSubmit={(values) => handleSubmit(values, taskIds[index])}
                  >
                    {({ values, errors, touched }) => (
                      <Form className="assign-form">
                        <div className="assign-div">
                          <label className="assign-title" htmlFor="child">
                            Assign to Child:
                          </label>
                          <br />
                          <Field
                            className="assign-field quest-input-input"
                            as="select"
                            name="child"
                          >
                            <option className="assign-face" value="">
                              Select a Child
                            </option>
                            {listOfChildren?.map((child) => (
                              <option
                                className="assign-opt"
                                key={child._id}
                                value={child._id}
                              >
                                {child.childName}
                              </option>
                            ))}
                          </Field>
                        </div>

                        <button
                          className="assign-child"
                          type="submit"
                          onClick={() => {
                            const childId = values.child; // obtain the selected child ID from the form values
                            assignTaskToChild(task.id, childId);
                          }}
                        >
                          Assign
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowAndEditTask;
