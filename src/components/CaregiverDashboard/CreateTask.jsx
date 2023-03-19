import React from "react";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  caregiverId: Yup.string().required("Required"),
  taskName: Yup.string().required("Required"),
  taskDescription: Yup.string().required("Required"),
  completed: Yup.boolean(),
  taskPoints: Yup.number().positive("Task points must be a positive number"),
  dueDate: Yup.date().required("Required"),
});

const CreateTask = ({ caregiverId, setRenderEffect }) => {
  const initialValues = {
    caregiverId,
    taskName: "",
    taskDescription: "",
    completed: false,
    taskPoints: 0,
    dueDate: "",
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log(values);
      const response = await fetch("http://localhost:4000/tasks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setRenderEffect(response);
      resetForm();
    } catch (error) {
      console.error("There was an error!", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="accordion-header" onClick={toggleAccordion}>
        <div className="create-quest">
          <h1 className="new-quest">
            <div className="add-Avatar"></div>
            <span className="add-task">Add Task</span></h1>
        </div>
      </div>
      <div className="open-form">
        {isOpen && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="new-quest-form">
              <div className="quest-input">
                <label htmlFor="taskName">Task Name</label>
                <br></br>
                <Field
                  className="quest-input-input"
                  type="text"
                  name="taskName"
                />
                <ErrorMessage name="taskName" component="div" />
              </div>

              <div className="quest-input">
                <label htmlFor="taskPoints">Task Points</label>
                <br></br>
                <Field
                  className="quest-input-input"
                  type="number"
                  name="taskPoints"
                />
                <ErrorMessage name="taskPoints" component="div" />
              </div>

              <div className="quest-input">
                <label htmlFor="taskDescription">Task Description</label>
                <br></br>
                <Field as="textarea" name="taskDescription" />
                <ErrorMessage name="taskDescription" component="div" />
              </div>

              <div className="create-div">
                <button
                  className="create-btn"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Create
                </button>
              </div>
            </Form>
          )}
        </Formik>
        )}
      </div>
    </div>
  );
};

export default CreateTask;
