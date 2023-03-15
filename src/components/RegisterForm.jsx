import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const URL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";
const RegisterForm = ({ signUp }) => {
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
    console.log(data);
    try {
      await axios.post(URL + `/caregiver/register`, data);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-page">
      <div className="random-box"></div>
      <div className="register-side">
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
        <div className="other-register">
          <p className="or">OR</p>
          <nav className="two-other-register">
            <div className="apple-sign">Apple</div>
            <div className="google-sign">G</div>
          </nav>
        </div>
        <Link className="already-account" to={"/login"}>
          Already have an account? Login.
        </Link>
      </div>
    </div>
  );
};

//   const initialState = { username: "", password: "" };
//   const [input, setInput] = useState(initialState);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const createdUserToken = await signUp(input);

//     if (createdUserToken) {
//       navigate("/caregiver");
//     } else {
//       navigate("/");
//     }
//     // FORM EMPTIES OUT
//     setInput(initialState);
//   };

//   const handleChange = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="register-page">
//       <div className="random-box"></div>
//       <div className="register-side">
//         <h1 className="register-title">JOIN US</h1>
//         <form className="register-form" onSubmit={handleSubmit}>
//           <label className="reg-first" htmlFor="username">
//             First Name:{" "}
//           </label>
//           <input
//             className="auth-input"
//             id="username"
//             name="username"
//             value={input.username}
//             onChange={handleChange}
//           />
//           <br />
//           <label className="reg-last" htmlFor="username">
//             Last Name:{" "}
//           </label>
//           <input
//             className="auth-input"
//             id="username"
//             name="username"
//             value={input.username}
//             onChange={handleChange}
//           />
//           <br />
//           <label className="reg-email" htmlFor="username">
//             Email:{" "}
//           </label>
//           <input
//             className="auth-input"
//             id="username"
//             name="username"
//             value={input.username}
//             onChange={handleChange}
//           />
//           <br />
//           <label className="reg-password" htmlFor="password">
//             Password:{" "}
//           </label>
//           <input
//             className="auth-input"
//             id="password"
//             name="password"
//             value={input.password}
//             onChange={handleChange}
//           />
//           <br />
//           <div className="register-btn">
//             <input className="auth-log" type="submit" value="Sign Up" />
//           </div>
//         </form>
//         <div className="other-register">
//           <p className="or">OR</p>
//           <nav className="two-other-register">
//             <div className="apple-sign">Apple</div>
//             <div className="google-sign">G</div>
//           </nav>
//         </div>
//         <Link className="already-account" to={"/login"}>
//           Already have an account? Login.
//         </Link>
//       </div>
//     </div>
//   );
// };

export default RegisterForm;
