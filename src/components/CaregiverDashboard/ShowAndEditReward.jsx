import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ShowAndEditReward = ({ caregiverId }) => {
    const navigate = useNavigate();
    const [rewards, setRewards] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false); // track whether API call is complete
    
       

    useEffect(() => {
        const fetchRewards = async () => {
            const rewardData = await Promise.all(
                caregiverId.map((caregiverId) => axios.get(`http://localhost:4000/rewards/${caregiverId}/rewards`))
            );
            const rewardList = rewardData.map((reward, index) => ({
                id: caregiverId[index],
                rewardName: reward.data.rewardName || "",
                image: reward.data.image || "",
                rewardPoints: reward.data.rewardPoints || "",
                activeReward: reward.data.activeReward || false,
                cashedIn: reward.data.cashedIn || 0,
            }));
            setRewards(rewardList);
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

    const handleSubmit = (values, rewardId) => {
        axios
            .put(`http://localhost:4000/rewards/${rewardId}`, values)
            .then(() => {
                console.log("Reward updated successfully");
                navigate("/tasksrewards");
            })
            .catch((err) => console.log(err));
    };

    if (!isLoaded) {
        return <div>Loading...</div>; // show loading message while API call is in progress
    }

    return (
        <div>
            <h1>Rewards {caregiverId.length}</h1>
            <h4>Total Rewards</h4>
            {rewards.map((reward, index) => (
                <div key={index}>
                    <h2>{reward.rewardName} {reward.rewardPoints} points Edit</h2>
                    <Formik
                        initialValues={reward}
                        validationSchema={validationSchema}
                        onSubmit={(values) => handleSubmit(values, caregiverId[index])}
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

                                <button type="submit">Update Reward</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            ))}
        </div>
    );
};

export default ShowAndEditReward;