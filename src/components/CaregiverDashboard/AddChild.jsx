import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
const URL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";
const AddChild = ({ setChildRender }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  const currentUser = JSON.parse(localStorage.getItem("caregiver"));
  const caregiverId = currentUser._id;
  const token = currentUser.token;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      childName: "",
      username: "",
      password: "",
    },
  });
  const formChildSubmit = async (data) => {
    console.log(data);
    const { childName, username, password } = data;
    const payload = {
      caregiverId,
      childName,
      username,
      password,
    };
    try {
      const res = await axios.post(
        `https://quest-runner.herokuapp.com/child/create`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setChildRender(res.data);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="assign-child-side">
      <div className="add-child">
        <h1 className="add-knight" onClick={toggleAccordion}>
          <div className="addUserAvatar"> </div>
          <span className="addKnight">Add Knight</span>
        </h1>
      </div>
      {isOpen && (
        <form
          className="register-child-form"
          onSubmit={handleSubmit((data) => {
            formChildSubmit(data);
          })}
        >
          <div className="name-sec">
            <label className="reg-first" htmlFor="username">
              Name:{" "}
            </label>
            <input
              className="auth-input"
              id="childName"
              name="childName"
              type="text"
              {...register("childName", {
                required: "Child Name is requried.",
              })}
              placeholder={`Enter Child Name`}
            />
            <br />
          </div>
          <div className="user-sec">
            <label className="reg-email" htmlFor="username">
              Username:{" "}
            </label>
            <input
              className="auth-input"
              id="username"
              name="username"
              type="username"
              {...register("username", {
                required: "Username is requried.",
              })}
              placeholder={`Enter username address `}
            />
            <br />
          </div>
          <div className="pass-sec">
            <label className="reg-password" htmlFor="password">
              Password:{" "}
            </label>
            <input
              className="auth-input"
              id="password"
              name="password"
              type="password"
              {...register("password", {
                required: "Password is requried.",
              })}
              placeholder={`Enter password `}
            />

            <br />
          </div>
          <div className="child-register-btn">
            <input className="auth-log" type="submit" value="Sign Up" />
          </div>
        </form>
      )}
    </div>
  );
};
export default AddChild;
