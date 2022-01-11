import { useContext } from "react";
import AppContext from "../AppContext.js";
import { useNavigate } from "react-router-dom";

const PageLogout = () => {
  const { setCurrentUser, currentUserIsInGroup } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogoutButton = async (e) => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    };
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/logout`,
      requestOptions
    );
    if (response.ok) {
      const _currentUser = await response.json();
      setCurrentUser((prev) => ({ ...prev, ..._currentUser }));
      navigate("/login");
    };
  };

  return (
    <div>
      {currentUserIsInGroup("loggedInUsers") && (
        <div><p>Are you sure?</p>
          <button onClick={handleLogoutButton}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default PageLogout;
