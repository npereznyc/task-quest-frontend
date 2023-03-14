import { useNavigate } from "react-router-dom";
import { useState } from "react";

const RegisterForm = ({ signUp }) => {
  const initialState = { username: "", password: "" };
  const [input, setInput] = useState(initialState);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createdUserToken = await signUp(input);

    if (createdUserToken) {
      navigate("/caregiver");
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
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">First Name: </label>
        <input
          className="auth-input"
          id="username"
          name="username"
          value={input.username}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="username">Last Name: </label>
        <input
          className="auth-input"
          id="username"
          name="username"
          value={input.username}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="username">Email: </label>
        <input
          className="auth-input"
          id="username"
          name="username"
          value={input.username}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          className="auth-input"
          id="password"
          name="password"
          value={input.password}
          onChange={handleChange}
        />
        <br />
        <br />
        <input className="auth-sub" type="submit" value="Sign Up" />
      </form>
    </>
  );
};

export default RegisterForm;