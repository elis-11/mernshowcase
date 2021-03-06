import { useContext, useState, useEffect } from "react";
import AppContext from "../AppContext";
import { useNavigate } from "react-router";
import PasswordDisplayer from "../components/formValidation/PasswordDisplayer";
import EmailValidation from "../components/formValidation/EmailValidation";
import NameValidation from "../components/formValidation/NameValidation";

const PageRegister = () => {
  const { setCurrentUser, userInGroup } = useContext(AppContext);
  const navigate = useNavigate();

  const [userNameRegister, setUserNameRegister] = useState("");
  const [firstNameRegister, setFirstNameRegister] = useState("");
  const [secondNameRegister, setSecondNameRegister] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister1, setPasswordRegister1] = useState("");
  const [passwordRegister2, setPasswordRegister2] = useState("");

  // const [emailIsValid, setEmailIsValid] = useState(false);
  const [userNameIsValid, setUserNameIsValid] = useState(false);
  const [firstNameIsValid, setFirstNameIsValid] = useState(false);
  const [secondNameIsValid, setSecondNameIsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [password1IsValid, setPassword1IsValid] = useState(false);
  const [password2IsValid, setPassword2IsValid] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    setFormIsValid(
      userNameIsValid &&
        firstNameIsValid &&
        secondNameIsValid &&
        emailIsValid &&
        password1IsValid &&
        password2IsValid &&
        passwordRegister1 === passwordRegister2
    );
  }, [
    userNameIsValid,
    firstNameIsValid,
    secondNameIsValid,
    emailIsValid,
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

  const handleEmailRegister = (e) => {
    const _emailRegister = e.target.value;
    const mailformat = /^[a-z0-9_.-]{2,}@[a-z.]{2,}\.[a-z]{2,}$/gi;
    setEmailRegister(_emailRegister);
    setEmailIsValid(mailformat.test(_emailRegister));
  };

  // const handleEmailRegister2 = (e) => {
  //   const _emailRegister2 = e.target.value;
  //   const mailformat = /^[a-z0-9_.-]{2,}@[a-z.]{2,}\.[a-z]{2,}$/gi;
  //   setEmailRegister2(_emailRegister2);
  //   (setEmail2IsValid(mailformat.test(_emailRegister2) && _emailRegister2 === ));
  // };

  const handlePasswordRegister1 = (e) => {
    const _passwordRegister1 = e.target.value;
    const passwordformat = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    setPasswordRegister1(_passwordRegister1);
    setPassword1IsValid(passwordformat.test(_passwordRegister1));
  };

  const handlePasswordRegister2 = (e) => {
    const _passwordRegister2 = e.target.value;
    const passwordformat = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    setPasswordRegister2(_passwordRegister2);
    setPassword2IsValid(
      passwordformat.test(_passwordRegister2) &&
        _passwordRegister2 === passwordRegister1
    );
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
          email: emailRegister,
          // email2: emailRegister2,
          password1: passwordRegister1,
          password2: passwordRegister2,
        },
      }),
    };
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/signup`,
      requestOptions
    );
    if (response.ok) {
      const _currentUser = await response.json();
      setCurrentUser((prev) => ({ ...prev, ..._currentUser }));
      setUserNameRegister("");
      setFirstNameRegister("");
      setSecondNameRegister("");
      setEmailRegister("");
      // setEmailRegister2("");
      setPasswordRegister1("");
      setPasswordRegister2("");
      navigate("/");
    }
  };

  return (
    <div className="register">
      {userInGroup("loggedOutUsers") && (
        <form>
          <fieldset>
            <legend>Register</legend>

            <NameValidation
              value={userNameRegister}
              valueHandler={handleUserNameRegister}
              isValid={userNameIsValid}
              label={"Username"}
            />

            <NameValidation
              value={firstNameRegister}
              valueHandler={handleFirstNameRegister}
              isValid={firstNameIsValid}
              label={"Firstname"}
            />

            <NameValidation
              value={secondNameRegister}
              valueHandler={handleSecondNameRegister}
              isValid={secondNameIsValid}
              label={"Lastname"}
            />

            <EmailValidation
              value={emailRegister}
              valueHandler={handleEmailRegister}
              isValid={emailIsValid}
            />

            {/* <EmailValidation
              value={emailRegister2}
              valueHandler={handleEmailRegister2}
              isValid={email2IsValid}
            /> */}

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
