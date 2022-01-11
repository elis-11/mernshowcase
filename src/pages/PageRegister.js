import { useContext, useState, useEffect } from "react";
import AppContext from "../AppContext";
import { useNavigate } from "react-router";
import PasswordDisplayer from "../components/formValidation/PasswordDisplayer";
import EmailValidation from "../components/formValidation/EmailValidation";
import NameValidation from "../components/formValidation/NameValidation";

const PageRegister = () => {
  const { setCurrentUser, currentUserIsInGroup } = useContext(AppContext);
  const navigate = useNavigate();

  const [userNameRegister, setUserNameRegister] = useState("");
  const [firstNameRegister, setFirstNameRegister] = useState("");
  const [secondNameRegister, setSecondNameRegister] = useState("");
  const [emailRegister1, setEmailRegister1] = useState("");
  const [emailRegister2, setEmailRegister2] = useState("");
  const [passwordRegister1, setPasswordRegister1] = useState("");
  const [passwordRegister2, setPasswordRegister2] = useState("");

  const [email1IsValid, setEmail1IsValid] = useState(false);
  const [userNameIsValid, setUserNameIsValid] = useState(false);
  const [firstNameIsValid, setFirstNameIsValid] = useState(false);
  const [secondNameIsValid, setSecondNameIsValid] = useState(false);
  const [email2IsValid, setEmail2IsValid] = useState(false);
  const [password1IsValid, setPassword1IsValid] = useState(false);
  const [password2IsValid, setPassword2IsValid] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    setFormIsValid(
      email1IsValid &&
        email2IsValid &&
        userNameIsValid &&
        firstNameIsValid &&
        secondNameIsValid &&
        password1IsValid &&
        password2IsValid &&
        passwordRegister1 === passwordRegister2
    );
  }, [
    userNameIsValid,
    firstNameIsValid,
    secondNameIsValid,
    email1IsValid,
    email2IsValid,
    password1IsValid,
    password2IsValid,
    passwordRegister1,
    passwordRegister2,
  ]);

  const handleUserNameRegister = (e) => {
    const _userNameRegister = e.target.value;
    const userformat = /^[a-z0-9_-]{3,15}$/gi;
    setUserNameRegister(_userNameRegister);
    setUserNameIsValid(userformat.test(_userNameRegister));
  };

  const handleFirstNameRegister = (e) => {
    const _firstNameRegister = e.target.value;
    const userformat = /^[a-z]{1,15}$/gi;
    setFirstNameRegister(_firstNameRegister);
    setFirstNameIsValid(userformat.test(_firstNameRegister));
  };

  const handleSecondNameRegister = (e) => {
    const _secondNameRegister = e.target.value;
    const userformat = /^[a-z]{1,15}$/gi;
    setSecondNameRegister(_secondNameRegister);
    setSecondNameIsValid(userformat.test(_secondNameRegister));
  };

  const handleEmailRegister1 = (e) => {
    const _emailRegister1 = e.target.value;
    const mailformat = /^[a-z0-9_.-]{2,}@[a-z.]{2,}\.[a-z]{2,}$/gi;
    setEmailRegister1(_emailRegister1);
    setEmail1IsValid(mailformat.test(_emailRegister1));
  };

  const handleEmailRegister2 = (e) => {
    const _emailRegister2 = e.target.value;
    const mailformat = /^[a-z0-9_.-]{2,}@[a-z.]{2,}\.[a-z]{2,}$/gi;
    setEmailRegister2(_emailRegister2);
    (setEmail2IsValid(mailformat.test(_emailRegister2) && _emailRegister2 === emailRegister1));
  };

  const handlePasswordRegister1 = (e) => {
    const _passwordRegister1 = e.target.value;
    const passwordformat = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    setPasswordRegister1(_passwordRegister1);
    setPassword1IsValid(passwordformat.test(_passwordRegister1));
  };

  const handlePasswordRegister2 = (e) => {
    const _passwordRegister2 = e.target.value;
    const passwordformat = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    setPasswordRegister2(_passwordRegister2);
    setPassword2IsValid(passwordformat.test(_passwordRegister2) && _passwordRegister2 === passwordRegister1);
  };

  const handleRegisterButton = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          username: userNameRegister,
          firstName: firstNameRegister,
          lastName: secondNameRegister,
          email1: emailRegister1,
          email2: emailRegister2,
          password1: passwordRegister1,
          password2: passwordRegister2,
        },
      }),
    };



    
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/createuser`,
      requestOptions
    );
    if (response.ok) {
      const _currentUser = await response.json();
      setCurrentUser((prev) => ({ ...prev, ..._currentUser }));
      setUserNameRegister("");
      setFirstNameRegister("");
      setSecondNameRegister("");
      setEmailRegister1("");
      setEmailRegister2("");
      setPasswordRegister1("");
      setPasswordRegister2("");
      navigate("/");
    }
  };

  return (
    <div>
      {currentUserIsInGroup("loggedOutUsers") && (
        <form>
          <fieldset>
            <legend>Register</legend>

            <NameValidation
              value={userNameRegister}
              valueHandler={handleUserNameRegister}
              isValid={userNameIsValid}
              label={'Username'}
            />

            <NameValidation
              value={firstNameRegister}
              valueHandler={handleFirstNameRegister}
              isValid={firstNameIsValid}
              label={'Firstname'}
            />

            <NameValidation
              value={secondNameRegister}
              valueHandler={handleSecondNameRegister}
              isValid={secondNameIsValid}
              label={'Lastname'}
            />

            <EmailValidation
              value={emailRegister1}
              valueHandler={handleEmailRegister1}
              isValid={email1IsValid}
            />

            <EmailValidation
              value={emailRegister2}
              valueHandler={handleEmailRegister2}
              isValid={email2IsValid}
            />

            <PasswordDisplayer
              value={passwordRegister1}
              valueHandler={handlePasswordRegister1}
              isValid={password1IsValid}
            />

            <PasswordDisplayer
              value={passwordRegister2}
              valueHandler={handlePasswordRegister2}
              isValid={password2IsValid}
            />

            <div className="buttonRow">
              <button disabled={!formIsValid} onClick={handleRegisterButton}>
                Register
              </button>
              <div className="buttonRow">
                <button>Reset</button>
              </div>
            </div>
          </fieldset>
        </form>
      )}
    </div>
  );
};

export default PageRegister;
