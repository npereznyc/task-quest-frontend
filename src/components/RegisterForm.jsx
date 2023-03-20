import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const URL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";
const RegisterForm = ({ signUp }) => {
  const [accountCreated, setAccountCreated] = useState(false);
  const [caregiver, setCaregiver] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      caregiverName: "",
      email: "",
      password: "",
    },
  });

  const formRegisterSubmit = async (data) => {
    try {
      const res = await axios.post(URL + `/caregiver/register`, data);
      localStorage.setItem("caregiver", JSON.stringify(res.data.caregiver));
      const currentUser = JSON.parse(localStorage.getItem("caregiver"));

      reset();
      setCaregiver(currentUser);
      setAccountCreated(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-page">
      <div className="random-box"></div>
      <div className="register-side">
        {accountCreated ? (
          <>
            <div>
              <h1>
                You're all signed up{" "}
                {caregiver.caregiverName.charAt(0).toUpperCase() +
                  caregiver.caregiverName.slice(1)}
                !
              </h1>
              <h2>Add Knights on your dashboard.</h2>
            </div>
            <div className="register-btn">
              <Link className="already-account" to={"/caregiverdashboard"}>
                <button className="auth-log">Go to Your Dashboard</button>
              </Link>{" "}
            </div>
          </>
        ) : (
          <>
            <h1 className="register-title">JOIN US</h1>
            <form
              className="register-form"
              onSubmit={handleSubmit((data) => {
                formRegisterSubmit(data);
              })}
            >
              <label className="reg-first" htmlFor="username">
                Name:{" "}
              </label>
              <input
                className="auth-input"
                id="cargiverName"
                name="cargiverName"
                type="text"
                {...register("caregiverName", {
                  required: "Caregiver Name is requried.",
                })}
                placeholder={`Enter Caregiver Name`}
              />
              <br />

              <label className="reg-email" htmlFor="username">
                Email:{" "}
              </label>
              <input
                className="auth-input"
                id="email"
                name="email"
                type="email"
                {...register("email", {
                  required: "Email is requried.",
                })}
                placeholder={`Enter email address `}
              />
              <br />
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
              <div className="register-btn">
                <input className="auth-log" type="submit" value="Sign Up" />
              </div>
            </form>
            
            <Link className="already-account" to={"/login"}>
              Already have an account? Login.
            </Link>{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
