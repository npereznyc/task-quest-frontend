import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const URL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

const CaregiverLogin = ({ signIn }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const formLoginSubmit = async (data) => {
    console.log(data);
    try {
      const res = await axios.post(URL + `/caregiver/login`, data);
      localStorage.setItem("caregiver", JSON.stringify(res.data));
      console.log(res.data);
      navigate("/caregiverdashboard");
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
          <label className="care-email" htmlFor="email">
            Email:{" "}
          </label>
          <br></br>

          <input
            className="email-input"
            id="email"
            name="email"
            {...register("email", {
              required: "Email is required.",
              pattern: /^\S+@\S+$/i,
            })}
            placeholder={`Enter your email address`}
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

  // const initialState = { email: "", password: "" };
  // const [input, setInput] = useState(initialState);
  // const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const createdUserToken = await signIn(input);

  //   if (createdUserToken) {
  //     navigate("/createtask");
  //   } else {
  //     navigate("/");
  //   }

  //   // FORM EMPTIES OUT
  //   setInput(initialState);
  // };

  // const handleChange = (e) => {
  //   setInput({ ...input, [e.target.name]: e.target.value });
  // };

  // return (
  //   <div className="login-page">
  //     <div className="random-box"></div>
  //     <div className="login-side">
  //       <h1 className="login-title">LOGIN</h1>

  //       <form className="login-form" onSubmit={handleSubmit}>
  //         <label className="care-email" htmlFor="email">
  //           Email:{" "}
  //         </label>
  //         <br></br>

  //         <input
  //           className="email-input"
  //           id="email"
  //           name="email"
  //           value={input.email}
  //           onChange={handleChange}
  //         />
  //         <br></br>

  //         <label className="" htmlFor="password">
  //           Password:{" "}
  //         </label>
  //         <br></br>
  //         <input
  //           className="password-input"
  //           id="password"
  //           name="password"
  //           value={input.password}
  //           onChange={handleChange}
  //         />
  //         <br></br>
  //         <div className="login-btn">
  //                     <input className="auth-log" type="submit" value="Sign In" />

  //         </div>
  //       </form>
  //     </div>
  //   </div>
  // );
};

export default CaregiverLogin;
