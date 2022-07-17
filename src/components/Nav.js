import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../AppContext";

const Nav = () => {
  const { currentUser, userInGroup } = useContext(AppContext);

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Welcome</NavLink>
        </li>
        {userInGroup("loggedOutUsers") && (
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
        )}
        {userInGroup("admin") && (
          <li>
            <NavLink to="/admin">Admin-Panel</NavLink>
          </li>
        )}
        {userInGroup("member") && (
          <li>
            <NavLink to="/todo">Taskmanager</NavLink>
          </li>
        )}

        {userInGroup("loggedOutUsers") && (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
        {userInGroup("loggedInUsers") && (
          <li>
            <NavLink to="/logout">Logout</NavLink>
          </li>
        )}
        <li>
          {currentUser.username && <h5>Hello {currentUser.username} </h5>}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
