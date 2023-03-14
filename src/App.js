import Main from "./components/Main";
import UserProvider from "./data/userContext";
import { UserContext } from "./data/userContext";
import { useState } from "react";

function App() {
  const { Provider: UserInfo } = UserContext;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <div className="App">
      <UserProvider>
        <UserInfo
          value={{
            isAuthenticated,
            currentUser,
            setAuth: setIsAuthenticated,
            setUser: setCurrentUser,
          }}
        >
          <Main />
        </UserInfo>
      </UserProvider>
    </div>
  );
}

export default App;
