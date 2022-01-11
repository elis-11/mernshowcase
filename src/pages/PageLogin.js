import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../AppContext.js";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";

const PageLogin = () => {
  const {
    setCurrentUser,
    currentUserIsInGroup,
    passwordInputType,
    handleShowPasswordButtonRegister,
  } = useContext(AppContext);

  const [loginFormMessage, setLoginFormMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsername = (e) => {
    const _username = e.target.value;
    setUsername(_username);
  };

  const handlePassword = (e) => {
    const _password = e.target.value;
    setPassword(_password);
  };

  const handleLoginButton = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    };
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/login`,
      requestOptions
    );
    if (!response.ok) {
      setUsername("");
      setPassword("");
      setLoginFormMessage("bad Login");
    } else {
      const _currentUser = await response.json();
      setCurrentUser((prev) => ({ ...prev, ..._currentUser }));
      navigate("/");
    }
  };

  return (
    <div>
      {currentUserIsInGroup("loggedOutUsers") && (
        <form>
          <fieldset>
            <legend>Login</legend>
            <div>{loginFormMessage}</div>
            <div className="row">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleUsername}
                placeholder="Enter your username"
              />
            </div>
            <div className="row">
              <label htmlFor="password">Password</label>
              <input
                type={passwordInputType}
                id="password"
                onChange={handlePassword}
                value={password}
                placeholder="Enter your password"
              />
              <div className="passwordIcon">
                <span onClick={handleShowPasswordButtonRegister}>
                  {passwordInputType === "password" ? (
                    <AiFillEye />
                  ) : (
                    <AiFillEyeInvisible />
                  )}
                </span>
              </div>
            </div>
            <div className="buttonRow">
              <button type="submit" onClick={handleLoginButton}>
                Login
              </button>
            </div>
          </fieldset>
        </form>
      )}
    </div>
  );
};

export default PageLogin;
