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
      <div className="accordion-header" onClick={toggleAccordion}>
        {" "}
        <h2>Create New Reward</h2>
      </div>
      {isOpen && (
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
      </Formik>)}
    </div>
  );
};

export default CreateReward;





























// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { getUserToken } from "../../utils/authToken"
// import UploadImage from "../UploadImage"

// const CreateReward = (props) => {
//     const token = getUserToken()
//     const [rewards, setRewards] = useState([])
//     const navigate = useNavigate()
//     const [rewardForm, setRewardForm] = useState({
//         rewardName: '',
//         image: '',
//         rewardPoints: '',
//         activeReward: false,
//         cashedIn: ''
//     })

//     const BASE_URL = "https://localhost:4000/reward/create"

//     const handleChange = (e) => {
//         const userInput = { ...rewardForm }
//         userInput[e.target.rewardName] = e.target.value
//         setRewardForm(userInput)
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         const currentState = { ...rewardForm }
//         try {
//             const requestOptions = {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`
//                 },
//                 body: JSON.stringify(currentState),
//             }
//             const response = await fetch(BASE_URL, requestOptions)
//             const newReward = await response.json()
//             setRewards([...rewards, newReward])
//             setRewardForm({
//                 rewardName: '',
//                 image: '',
//                 rewardPoints: '',
//                 activeReward: false,
//                 cashedIn: ''
//             })
//             navigate("/")
//         }
//         catch (err) {
//             console.error(err)
//         }
//     }

//     const setImage = (newImage) => {
//         setRewardForm((oldRewardForm) => {
//             const formCopy = { ...oldRewardForm }
//             formCopy.image = newImage
//             return formCopy
//         })
//     }

//     return (
//         <section>
//             <h2>Create New Reward</h2>
//             <div className="create-reward">
//                 <div>
//                     <label>
//                         Reward Name: 
//                         <input
//                             type="text"
//                             id="reward-name"
//                             name="name"
//                             placeholder="Enter reward name"
//                             value={rewardForm.rewardName}
//                             onChange={handleChange}
//                         />
//                     </label>
//                 </div>
//                 <br />
//                 Add an Image: 
//                 <UploadImage uploadedImage={setImage} />
                
//                 <form onSubmit={handleSubmit}>
//                     <div>
//                         <label>
//                             <input
//                                 hidden={true}
//                                 type="url"
//                                 id="image"
//                                 name="image"
//                                 value={rewardForm.image}
//                                 onChange={handleChange}
//                             />
//                         </label>
//                     </div>

//                     <br />
//                     <div>
//                         <label>
//                             Points Value: 
//                             <input
//                                 type="number"
//                                 id="reward-points"
//                                 name="points"
//                                 placeholder="Enter reward value"
//                                 value={rewardForm.rewardPoints}
//                                 onChange={handleChange}
//                             />
//                         </label>
//                     </div>
//                     <div>
//                         <label>
//                             Active?
//                             {/* will this be a toggle? checkbox? */}

//                         </label>
//                     </div>
//                     <div>
//                         <label>
//                             Cashed in?
//                             {/* Not sure what this is meant to be - this field is required on the backend so the caregiver would have to input it when creating a reward?*/}

//                         </label>
//                     </div>
//                 </form>
//             </div>
//         </section>
//     )
// }

// export default CreateReward