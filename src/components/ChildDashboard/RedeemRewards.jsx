import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ShowAndEditReward = ({ caregiverId, setReRender }) => {
  console.log("caregiver/reward: ", caregiverId);
  const navigate = useNavigate();
  const child = JSON.parse(localStorage.getItem("child"));
  const childId = child._id;
  const [rewards, setRewards] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false); // track whether API call is complete
  const [totalPoints, setTotalPoints] = useState(0);

  const getTotalPoints = async () => {
    try {
      console.log(childId);
      const response = await axios.get(
        `https://quest-runner.herokuapp.com/child/${childId}`
      );
      const totalPoints = response.data.totalPoints;
      console.log(response);
      setTotalPoints(totalPoints);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchRewards = async () => {
      axios
        .get(`http://localhost:4000/rewards/show/${caregiverId}`)
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
    getTotalPoints();
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

  const redeemReward = async (rewardId) => {
    try {
      const res = await axios.put(
        `http://localhost:4000/rewards/cashin/${rewardId}/${childId}`
      );
      setReRender(res.data);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="quest-rewards-container">
      <div className="treasure-chest"></div>
      <div>
        <div className="redeem-header">
          <h2 className="redeem-riches">Redeem Riches</h2>
          <div className="redeem-header-half">
            <div className="child-coin redeem-coin"></div>
            <h2 className="total-coins">
              <span className="larger">{totalPoints}</span>

              <span>Total Coins</span>
            </h2>
          </div>
        </div>
        <div className="individual-reward">
          <div className="child-rewards">
            {rewards.map((reward, index) => (
              <div className="child-reward" key={index}>
                <div className="reward-content">
                  <span className="reward-name">
                    {" "}
                    <div className="child-coin"></div>
                    {reward.rewardName}{" "}
                  </span>
                  <div className="other-half">
                    <span className="reward-points">
                      {reward.rewardPoints}
                      <br />
                      coins
                    </span>
                    <button
                      className="redeem-btn"
                      onClick={() => redeemReward(reward._id)}
                    >
                      Redeem
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default ShowAndEditReward;
