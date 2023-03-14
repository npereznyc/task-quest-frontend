import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CaregiverLogin = ({ signIn }) => {
  const initialState = { email: "", password: "" };
  const [input, setInput] = useState(initialState);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createdUserToken = await signIn(input);

    if (createdUserToken) {
      navigate("/createtask");
    } else {
      navigate("/");
    }

    // FORM EMPTIES OUT
    setInput(initialState);
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-page">
      <div className="random-box"></div>
      <div className="login-side">
        <h1 className="login-title">LOGIN</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="care-email" htmlFor="email">
            Email:{" "}
          </label>
          <br></br>

          <input
            className="email-input"
            id="email"
            name="email"
            value={input.email}
            onChange={handleChange}
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
            value={input.password}
            onChange={handleChange}
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

export default CaregiverLogin;
