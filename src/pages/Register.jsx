import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../actions/userActions";

function Register({ registerUser }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const response = await registerUser(email, username, password, city);
    if (response && response.error) {
      setError(response.error);
    } else {
      navigate("/login");
    }
  };

  const handleNavLogin = () => {
    navigate("/login");
  }

  return (
    <div className="wrapperRegister">
      <form className="registerForm" onSubmit={handleSubmit}>
        <h1>Join Us! </h1>
        <p>Create an account to get access to all the features!</p>
        <div className="wrapperInputLabelsRegister">
          <input
            placeholder="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Username"
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            placeholder="Confirm Password"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <input
            placeholder="City"
            name="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={handleSubmit} className="btnSubmitRegister">
            Register
          </button>
        </div>
        {error && <p className="error">{error}</p>}
        <p onClick={handleNavLogin} className="linksRegister">Already have an account? Log in</p>
      </form>
    </div>
  );
}

const mapDispatchToProps = {
  registerUser,
};
export default connect(null, mapDispatchToProps)(Register);
