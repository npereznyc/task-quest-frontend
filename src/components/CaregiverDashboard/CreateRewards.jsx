import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserToken } from "../../utils/authToken";
import UploadImage from "../UploadImage";

const CreateReward = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const token = getUserToken();
  const [rewards, setRewards] = useState([]);
  const navigate = useNavigate();
  const [rewardForm, setRewardForm] = useState({
    rewardName: "",
    image: "",
    rewardPoints: "",
    activeReward: false,
    cashedIn: "",
  });

  const BASE_URL = "https://localhost:4000/reward/create";

  const handleChange = (e) => {
    const userInput = { ...rewardForm };
    userInput[e.target.rewardName] = e.target.value;
    setRewardForm(userInput);
  };

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentState = { ...rewardForm };
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(currentState),
      };
      const response = await fetch(BASE_URL, requestOptions);
      const newReward = await response.json();
      setRewards([...rewards, newReward]);
      setRewardForm({
        rewardName: "",
        image: "",
        rewardPoints: "",
        activeReward: false,
        cashedIn: "",
      });
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const setImage = (newImage) => {
    setRewardForm((oldRewardForm) => {
      const formCopy = { ...oldRewardForm };
      formCopy.image = newImage;
      return formCopy;
    });
  };

  return (
    <section>
      <div className="accordion-header" onClick={toggleAccordion}>
        {" "}
        <h2>Create New Reward</h2>
      </div>
      {isOpen && (
        <div className="create-reward">
          <div>
            <label>
              Reward Name:
              <input
                type="text"
                id="reward-name"
                name="name"
                placeholder="Enter reward name"
                value={rewardForm.rewardName}
                onChange={handleChange}
              />
            </label>
          </div>
          {/* Add an Image:
          <UploadImage uploadedImage={setImage} /> */}
          <form onSubmit={handleSubmit}>
            {/* <div>
              <label>
                <input
                  hidden={true}
                  type="url"
                  id="image"
                  name="image"
                  value={rewardForm.image}
                  onChange={handleChange}
                />
              </label>
            </div> */}

            <br />
            <div>
              <label>
                Points Value:
                <input
                  type="number"
                  id="reward-points"
                  name="points"
                  placeholder="Enter reward value"
                  value={rewardForm.rewardPoints}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                Active?
                {/* will this be a toggle? checkbox? */}
              </label>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default CreateReward;
