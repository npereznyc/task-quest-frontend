import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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
    image: '',
    rewardPoints: 0,
    activeReward: true,
    cashedIn: 0,
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
      <h1>Add a New Reward</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="rewardName">Reward Name</label>
              <Field type="text" name="rewardName" />
              <ErrorMessage name="rewardName" component="div" />
            </div>

            <div>
                <label htmlFor="image">Image URL</label>
                <Field type="text" name="rewardImage" />
                <ErrorMessage name="rewardImage" component="div" />
            </div>

            <div>
              <label htmlFor="RewardPoints">Reward Points</label>
              <Field type="number" name="rewardPoints" />
              <ErrorMessage name="rewardPoints" component="div" />
            </div>

            <div>
                <label htmlFor="activeReward">Active Reward</label>
                <Field type="checkbox" name="activeReward" />
            </div>

            <div>
                <label htmlFor="cashedIn">Cashed In</label>
                <Field type="number" name="cashedIn" />
                <ErrorMessage name="cashedIn" component="div" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateReward;