import { FiCheck } from "react-icons/fi";
import { FcCheckmark } from "react-icons/fc"; 

const ValidationCheck = (props) => {
  return (
    <div>
      {!props.isValid && <FiCheck />}
      {props.isValid && <FcCheckmark />}
    </div>
  );
};

export default ValidationCheck;
