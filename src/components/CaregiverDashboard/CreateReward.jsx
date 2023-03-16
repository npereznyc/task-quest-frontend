import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from "react";

const validationSchema = Yup.object().shape({

    rewardName: Yup.string().required('Required'),
    rewardPoints: Yup.number().positive('Reward points must be a positive number').required('Required'),
    activeReward: Yup.boolean(),
    cashedIn: Yup.number(),
    });

  const CreateReward = ({ caregiverId }) => {
    const initialValues = {
    caregiverId,
    rewardName: '',
    rewardPoints: 0,
    activeReward: true,
    cashedIn: 0,
    };
  const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
      setIsOpen(!isOpen);
    };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
        console.log(values)
      const response = await fetch('http://localhost:4000/rewards/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      resetForm();
    } catch (error) {
      console.error('There was an error!', error);
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div>
      <div className="accordion-header create-new" onClick={toggleAccordion}>
        {" "}
        <h1 className="create-title">Add Reward</h1>
      </div>
      <div className='reward-form-div'>
      {isOpen && (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="reward-form">
            <div className="add-reward-input-div first-reward-add">
              <label  className="" htmlFor="rewardName">Reward Name</label>
              <Field type="text" name="rewardName" />
              <ErrorMessage name="rewardName" component="div" />
            </div>

            <div className="add-reward-input-div">
              <label  className="" htmlFor="RewardPoints">Reward Points</label>
              <Field type="number" name="rewardPoints" />
              <ErrorMessage name="rewardPoints" component="div" />
            </div>

            <div className="add-reward-input-div">
                <label  className="" htmlFor="activeReward">Active Reward</label>
                <Field type="checkbox" name="activeReward" />
            </div>

            <div className="add-reward-input-div">
                <label  className="" htmlFor="cashedIn">Cashed In</label>
                <Field type="number" name="cashedIn" />
                <ErrorMessage name="cashedIn" component="div" />
            </div>

            <button  className="reward-submit" type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>)}</div>
    </div>
  );
};

export default CreateReward;