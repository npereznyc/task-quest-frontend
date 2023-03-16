import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ShowAndEditReward = ({ caregiverId }) => {
    console.log('caregiver/reward: ', caregiverId)
    const navigate = useNavigate();
    const [rewards, setRewards] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false); // track whether API call is complete
    
       

    useEffect(() => {
        const fetchRewards = async () => {
            axios.get(`http://localhost:4000/rewards/show/${caregiverId}`)
            .then(response=>{
                setRewards(response.data);
            })
            .catch(error => {
                console.log(error)
            })
            console.log('rewards: ', rewards)
            setIsLoaded(true); // update state to indicate API call is complete
        };
        fetchRewards();
    }, [caregiverId]);

    const validationSchema = Yup.object().shape({
        rewardName: Yup.string().required("Required"),
        rewardPoints: Yup.number()
            .typeError("Must be a number")
            .positive("Must be positive")
            .required("Required"),
        activeReward: Yup.boolean(),
        cashedIn: Yup.number(),
    });

    if (!isLoaded) {
        return <div>Loading...</div>; // show loading message while API call is in progress
    }

    return (
        <div>
            <h1>Available Rewards</h1>

            <h4>Total Rewards: {rewards.length}</h4>
            {rewards.map((reward, index) => (
                <div key={index}>
                    <h2>{reward.rewardName} </h2>
                    <h3>{reward.rewardPoints} coins</h3>
                    
                    {/* <Formik
                        initialValues={reward}
                        validationSchema={validationSchema}
                    >
                        {({ values, errors, touched }) => (
                            <Form>
                                <div>
                                    <label htmlFor="rewardName">Reward Name</label>
                                    <Field type="text" name="rewardName" />
                                    <ErrorMessage name="rewardName" />
                                </div>

                                <div>
                                    <label htmlFor="image">Image URL</label>
                                    <Field type="text" name="image" />
                                    <ErrorMessage name="image" />
                                </div>

                                <div>
                                    <label htmlFor="rewardPoints">Reward Points</label>
                                    <Field type="number" name="rewardPoints" />
                                    <ErrorMessage name="rewardPoints" />
                                </div>

                                <div>
                                    <label htmlFor="activeReward">Active Reward?</label>
                                    <Field type="checkbox" name="activeReward" />
                                </div>

                                <div>
                                    <label htmlFor="cashedIn">Cashed In</label>
                                    <Field type="number" name="cashedIn" />
                                    <ErrorMessage name="cashedIn" />
                                </div>
                            </Form>
                        )}
                    </Formik> */}
                </div>
            ))}
        </div>
    );
};

export default ShowAndEditReward;



// import React from 'react'
// import { useState, useEffect } from 'react'

// export default function RedeemRewards({ caregiverId }) {
//     const [rewards, setRewards] = useState([])
//     const listRewards = async () => {
//         try {
//             const response = await fetch('/reward', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//             const data = await response.json()
//             setRewards(data)
//         } catch (error) {
//             console.error(error)
//         }
//     }

//     useEffect(() => {
//         listRewards()
//     }, [rewards])

//     return (
//         <div className='redeem-rewards'>
//             <h4>Redeem Rewards</h4>
//                 <ul>
//                     {rewards.map((reward) => {
//                         return (
//                             <li key={reward._id}>
//                                 <div className='reward-name'>{reward.rewardName}</div>
//                                 <div className='reward-points'>{reward.rewardPoints} Points</div>
//                                 <button>Buy</button>
//                             </li>
//                         )
//                     })}
//                 </ul>
//         </div>
//     )
// }
