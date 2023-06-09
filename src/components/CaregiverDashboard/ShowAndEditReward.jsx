import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ShowAndEditReward = ({ caregiverId, setRenderEffect }) => {
  console.log("caregiver/reward: ", caregiverId);
  const navigate = useNavigate();
  const [rewards, setRewards] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false); // track whether API call is complete

  useEffect(() => {
    const fetchRewards = async () => {
      axios
        .get(`https://quest-runner.herokuapp.com/rewards/show/${caregiverId}`)
        .then((response) => {
          setRewards(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("rewards: ", rewards);
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



  const handleDeleteSubmit = (rewardId) => {
    const res = axios
      .delete(`https://quest-runner.herokuapp.com/rewards/${rewardId}`)
      .then(() => {
        console.log(`Reward ${rewardId} has been deleted successfully`);
        setRenderEffect(res);
      })
      .catch((error) => console.log(error));
  };

  if (!isLoaded) {
    return <div>Loading...</div>; // show loading message while API call is in progress
  }

  return (
    <div>
      <div className="rewards-header-div">
        <div className="rewards-header">
          <h1 className="rewards-title">
            {" "}
            <div className="rewardsIcon"></div>
            Rewards
          </h1>

          <h4 className="adult-total-rewards">
            <span className="num-num">{rewards.length}</span>
            <span>Total Rewards</span>
          </h4>
        </div>
      </div>
      <div className="parent-rewards">
        <div className="reward-div">
          {rewards.map((reward, index) => (
            <div className="rewards-bar" key={index}>
              <div className="coin-word">
                <div className="coinIcon"></div>
                <h2 className="rewards-nm">{reward.rewardName} </h2>
              </div>

              <h3 className="rewards-pt">{reward.rewardPoints} coins</h3>
              {/* <button
                className="delete-reward"
                type="submit"
                onClick={() => {
                  handleDeleteSubmit(reward._id);
                }}
              >
                Delete Reward
              </button> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowAndEditReward;
