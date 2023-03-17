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
    const { childName, username, password } = data;
    const payload = {
      caregiverId,
      childName,
      username,
      password,
    };
    try {
      const res = await axios.post(URL + `/child/create`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setChildRender(res.data);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="child-register-section">
      <div className="assign-child-side">
        <div className="add-child">
        
          <h1 className="add-knight" onClick={toggleAccordion}>
          <div className="addUserAvatar"> </div>
            Add Knight
          </h1>
        </div>
        <div className="add-knight-form">
          {isOpen && (
            <form
              className="register-form"
              onSubmit={handleSubmit((data) => {
                formChildSubmit(data);
              })}
            >
              <div className="register-div register-name">
                <label className="reg-first" htmlFor="username">
                  Name:{" "}
                </label>
                <input
                  className="auth-input register-input"
                  id="childName"
                  name="childName"
                  type="text"
                  {...register("childName", {
                    required: "Child Name is requried.",
                  })}
                  placeholder={`Enter Child Name`}
                />
              </div>
              <br />
              <div className="register-div">
                <label className="reg-email" htmlFor="username">
                  Username:{" "}
                </label>
                <input
                  className="auth-input register-input"
                  id="username"
                  name="username"
                  type="username"
                  {...register("username", {
                    required: "Username is requried.",
                  })}
                  // placeholder={`Enter username address `}
                />
              </div>
              <br />
              <div className="register-div">
                <label className="reg-password" htmlFor="password">
                  Password:{" "}
                </label>
                <input
                  className="register-input auth-input"
                  id="password"
                  name="password"
                  type="password"
                  {...register("password", {
                    required: "Password is requried.",
                  })}
                  // placeholder={`Enter password `}
                />
              </div>
              <br />
              <div className="child-register-btn">
                <input
                  className="auth-input register-child-submit"
                  type="submit"
                  value="Create"
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddChild;
