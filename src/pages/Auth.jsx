import React from "react";
import { getUserToken, setUserToken, clearUserToken } from "../utils/authToken";
import { useContext } from "react";
import { UserContext } from "../data";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/CaregiverLogin";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Auth = (props) => {
  const { setAuth, setUser } = useContext(UserContext);
  // import the pieces of context we want
  // invoke useContext hook and provide a context object as an argument
  // react will look at the value property of that context
  // provide the named keys in the value prop

  // console.log(setAuth, setUser)
  const navigate = useNavigate();
  const token = getUserToken();

  const registerUser = async (data) => {
    try {
      const configs = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const newUser = await fetch(
        "http://localhost:4000/caregiver/login",
        configs
      );

      const parsedUser = await newUser.json();
      console.log(parsedUser);

      // sets local storage
      setUserToken(parsedUser.token);
      // put the returned user object in state
      setUser(parsedUser.user);
      // adds a boolean cast of the responses isAuthenticated prop
      setAuth(parsedUser.isLoggedIn);

      // alternative (safer) implementation would be to use jwt decode library - <https://www.npmjs.com/package/jwt-decode>
      // this would also require reconfiguring our backend so we only send tokens with a signup

      return parsedUser;
    } catch (err) {
      console.log(err);
      clearUserToken();
      setAuth(false);
    }
  };

  const loginUser = async (data) => {
    try {
      const configs = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        "http://localhost:4000/caregiver/login",
        configs
      );

      const currentUser = await response.json();
      //console.log(currentUser)

      if (currentUser.token) {
        // sets local storage
        setUserToken(currentUser.token);
        // put the returned user object in state
        setUser(currentUser.user);
        setAuth(currentUser.isLoggedIn);

        return currentUser;
      } else {
        throw `Server Error: ${currentUser.statusText}`;
      }
    } catch (err) {
      console.log(err);
      clearUserToken();
      setAuth(false);
    }
  };

  function logoutUser() {
    clearUserToken();
    navigate(`/`);
  }

  return (
    <section className="auth-section">
      <div className="auth-form">
        <div className="login-form">
          <h1>Log In</h1>
          <LoginForm signIn={loginUser} />
        </div>
        <div className="register-form">
          <h3>Not a member? Register here:</h3>
          <RegisterForm signUp={registerUser} />
        </div>
        {token ? (
          <>
            <br />
            <h6 onClick={logoutUser} className="logout-button">
              Log Out
            </h6>
          </>
        ) : null}{" "}
      </div>
    </section>
  );
};

export default Auth;
