import ValidationCheck from "./ValidationCheck";

const NameValidation = (props) => {
  return (
    <div>
      <div className={`row ${props.valid ? "valid" : "invalid"}`}>
        <label htmlFor="userName">{props.label}</label>
        <input
          type="text"
          id="username"
          value={props.value}
          onChange={props.valueHandler}
        />
        <ValidationCheck isValid = {props.isValid} />
      </div>
    </div>
  );
};

export default NameValidation;
