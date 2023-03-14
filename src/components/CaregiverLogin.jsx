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
    <>
    <h1>Caregiver Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          name="email"
          value={input.email}
          onChange={handleChange}
        />

        <label htmlFor="password">Password: </label>
        <input
          id="password"
          name="password"
          value={input.password}
          onChange={handleChange}
        />

        <input className="auth-log" type="submit" value="Login User" />
      </form>
    </>
  );
};

export default CaregiverLogin;
