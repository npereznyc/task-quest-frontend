import { createContext } from "react";
import { useState } from "react";

const UserContext = createContext();

export { UserContext };

const UserProvider = (props) => {

    const [task, setTask] = useState([]);

  const updatedListOfTasks = (newTask) => {
    setTask(newTask);
  };

  return (
    <UserContext.Provider value={{ task, updatedListOfTasks }}>
    {props.children}
  </UserContext.Provider>
  );
};

export default UserProvider;
