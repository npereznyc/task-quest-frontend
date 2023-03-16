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

  // useParams - useEffect dependency
  const { id } = useParams();

  const navigate = useNavigate();

  async function getChildren() {
    let children;
    try {
      const response = await axios(URL + `/caregiver/${caregiverId}/children`);

      setChildren(response.data);
      // children = await response.json();
    } catch (err) {
      console.error(err.message);
      // } finally {
      //   setChildren(children);
      // }
    }
  }

  // console.log("children: ", children);

  useEffect(() => {
    getChildren();
    // getTasks()
    // getChildren(id)
  }, []);

  // function loaded() {
  //   function findChildrenByCaregiver(caregiver) {
  //     let allChildren = [];
  //     for (let i = 0; i < children.length; i++) {
  //       allChildren.push(children[i]);

  //       // if (caregiver === children[i].caregiverId) {
  //       //     allChildren.push(children[i])
  //       // }
  //     }
  //     // console.log(allChildren);
  //     return allChildren;
  //   }
  // }

  // const allChildren = findChildrenByCaregiver();

  // const allChildren = findChildrenByCaregiver(caregiver._id)
  // const isCaregiver = currentUserID === caregiver._id

  return (
    // <div className="children-list-container">
    //     {allChildren.length ? <>
    //         {caregiver.caregiverName ? <><p>Children Associated With {caregiver.caregiverName}:</p>
    //             <br /></> : null}
    //         <div className="children-list">{allChildren.map((child) => (
    //             <Link to={`/child/${child._id}`} key={child._id}>
    //                 <div className="child">
    //                     {child.caregiverId ? <p>{child.childName}</p> : null}
    //                     {child.taskArray ? <p className="child-tasks">{child.taskArray}</p> : null}
    //                     {child.rewardsArray ? <p className="child-tasks">{child.rewardsArray}</p> : null}
    //                 </div>
    //             </Link>
    //         ))}</div>
    //     </> : <p className="details">There are no children associated with this caregiver</p>}
    // </div>

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

      {/* {allChildren.length ? (
          <>
            <div className="children-list">
              {allChildren.map((child) => (
                <div className="child" key={child._id}>
                  {child.caregiverId ? <p>{child.childName}</p> : null}
                  {child.taskArray.length}

                  {child?.taskArray?.map((taskId) => {
                    return (
                      <div>
                        <Task taskId={taskId} />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="details">
            There are no children associated with this caregiver
          </p>
        )}
        <div>
          <Link to="/addChild">
            <button>AddChild</button>
          </Link>{" "}
          <br />
        </div>
      </div>
    ); */}
      <AddChild />
    </div>
  );
}
// function loading() {
//   return (
//     <h1>
//       Loading...&nbsp;
//       <img
//         width="200px"
//         className="spinner"
//         src="https://freesvg.org/img/1544764567.png"
//         alt="Loading animation"
//       />
//     </h1>
//   );
// }

// return (
//   <section className="Children">
//     {
//       // children.length &&
//       // id === caregiver._id ?
//       loaded()
//       // : loading()
//     }
//   </section>
// );