import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../data";
import AddChild from "./AddChild";
import Task from "./Task";
import axios from "axios";
import Child from "./child";

const URL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

export default function ChildList(props) {
  // useContext data
  const currentUser = JSON.parse(localStorage.getItem("caregiver"));
  const caregiverId = currentUser._id;
  const token = currentUser.token;
  // const { currentUserID } = useContext(UserContext);
  // const { setAuth, setUser, setUserID } = useContext(UserContext);

  // useState variables
  const [children, setChildren] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [childRender, setChildRender] = useState([]);
  // useParams - useEffect dependency
  const { id } = useParams();

  const navigate = useNavigate();

  async function getChildren() {
    let children;
    try {
      const response = await axios(URL + `/caregiver/${caregiverId}/children`);

      setChildren(response.data);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getChildren();
  }, [childRender]);

  return (
    <div className="children-list-container">
      {children.map(
        ({ _id, caregiverId, childName, rewardsArray, taskArray }) => (
          <Child
            key={_id}
            childId={_id}
            caregiverId={caregiverId}
            childName={childName}
            rewardsArray={rewardsArray}
            taskArray={taskArray}
          />
        )
      )}

      <AddChild setChildRender={setChildRender} />
    </div>
  );
}