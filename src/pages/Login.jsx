import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../actions/userActions";

function Login({ loginUser }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser(email, password); // Pass the email and password to loginUser action
    if (response && response.error) {
      setError(response.error);
    } else {
     navigate("/userwatchlist")
    }
  };

  return (
    <div className="wrapperLogin">
      <form className="loginForm" onSubmit={handleSubmit}>
        <h1>Welcome! </h1>
        <p>Log in to get access of all the features!</p>
        <div className="wrapperInputLabelsLogin">
          <input
            placeholder="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSubmit} className="btnSubmitLogin">
            Submit
          </button>
        </div>
        {error && <p className="error">{error}</p>}
        <p className="linksLogin">Forgot Password?</p>
        <p className="linksLogin">Register</p>
      </form>
    </div>
  );
}

const mapDispatchToProps = {
  loginUser,
};
export default connect(null, mapDispatchToProps)(Login);
