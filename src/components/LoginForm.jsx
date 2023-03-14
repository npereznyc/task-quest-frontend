import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginForm = ({ signIn }) => {
  const initialState = { username: "", password: "" };
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
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          className="auth-input"
          id="email"
          name="email"
          value={input.email}
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
        <input className="auth-log" type="submit" value="Login User" />
      </form>
    </>
  );
};

export default LoginForm;
