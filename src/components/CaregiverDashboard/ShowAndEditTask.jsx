import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ShowAndEditTask = ({ taskIds }) => {
    console.log(taskIds)
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false); // track whether API call is complete

    useEffect(() => {
        const fetchTasks = async () => {
            const taskData = await Promise.all(
                taskIds.map((taskId) => axios.get(`http://localhost:4000/tasks/${taskId}`))
            );
            const taskList = taskData.map((task, index) => ({
                id: taskIds[index],
                taskName: task.data.taskName || "",
                taskDescription: task.data.taskDescription || "",
                completed: task.data.completed || false,
                image: "",
                taskPoints: task.data.taskPoints || "",
                dueDate: "",
            }));
            setTasks(taskList);
            setIsLoaded(true); // update state to indicate API call is complete
        };
        fetchTasks();
    }, [taskIds]);

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
                navigate("/tasksrewards");
            })
            .catch((err) => console.log(err));
    };

    if (!isLoaded) {
        return <div>Loading...</div>; // show loading message while API call is in progress
    }

    return (
        <div>
            <h1>Tasks {taskIds.length}</h1>
            <h4>Total Tasks</h4>
            {tasks.map((task, index) => (
                <div key={index}>
                    <h2>{task.taskName} {task.taskPoints} points Edit</h2>
                    <Formik
                        initialValues={task}
                        validationSchema={validationSchema}
                        onSubmit={(values) => handleSubmit(values, taskIds[index])}
                    >
                        {({ values, errors, touched }) => (
                            <Form>
                                <div>
                                    <label htmlFor="taskName">Task Name</label>
                                    <Field type="text" name="taskName" />
                                    <ErrorMessage name="taskName" />
                                </div>

                                <div>
                                    <label htmlFor="taskDescription">Task Description</label>
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
                            </Form>
                        )}
                    </Formik>
                </div>
            ))}
        </div>
    );
};

export default ShowAndEditTask;