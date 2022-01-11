import ValidationCheck from "./ValidationCheck";
import { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

const PasswordDisplayer = (props) => {
  const [showingPassword, setShowingPassword] = useState(false);

  return (
    <div className={`row ${props.isValid ? "valid" : "invalid"}`}>
      <label htmlFor="passwordRegister1">Password</label>
      <input
        type={showingPassword ? "text" : "password"}
        id="passwordRegister1"
        value={props.value}
        onChange={props.valueHandler}
        placeholder=" 1 letter and 1 num"
      />
        <ValidationCheck isValid = {props.isValid} />
      <span className="passwordIcon" onClick={() => setShowingPassword(!showingPassword)}>
        {showingPassword && <AiFillEye />}
        {!showingPassword && <AiFillEyeInvisible />}
      </span>
    </div>
  );
};


export default PasswordDisplayer;
