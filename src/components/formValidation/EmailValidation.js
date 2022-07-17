import ValidationCheck from "./ValidationCheck";

const EmailValidation = (props) => {
  return (
    <div>
      <div className={`row ${props.isValid ? "valid" : "invalid"}`}>
        <label htmlFor="emailRegister">Email</label>
        <input
          type="text"
          id="emailregister"
          value={props.value}
          onChange={props.valueHandler}
          placeholder="example@mail.com"
        />
        <ValidationCheck isValid={props.isValid} />
      </div>
      <div className={`note ${props.valid ? "valid" : "invalid"}`}></div>
    </div>
  );
};

export default EmailValidation;
