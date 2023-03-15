import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const URL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

const ChildLogin = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const formLoginSubmit = async (data) => {
    console.log(data);
    try {
      const res = await axios.post(URL + `/child/login`, data);
      localStorage.setItem("child", JSON.stringify(res.data));
      console.log(res.data);
      navigate("/childdashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-page">
      <div className="random-box"></div>
      <div className="login-side">
        <h1 className="login-title">LOGIN</h1>

        <form
          className="login-form"
          onSubmit={handleSubmit((data) => {
            formLoginSubmit(data);
          })}
        >
          <label className="care-username" htmlFor="username">
            Username:{" "}
          </label>
          <br></br>

          <input
            className="username-input"
            id="username"
            name="username"
            {...register("username", {
              required: "username is required.",
            })}
            placeholder={`Enter your username address`}
          />
          <br></br>

          <label className="" htmlFor="password">
            Password:{" "}
          </label>
          <br></br>
          <input
            className="password-input"
            id="password"
            name="password"
            type="password"
            {...register("password", {
              required: "Password is required.",
              minLength: {
                value: 4,
                message: "Minimum length at least 4.",
              },
            })}
            placeholder={`Enter your password`}
          />
          <br></br>
          <div className="login-btn">
            <input className="auth-log" type="submit" value="Sign In" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChildLogin;
