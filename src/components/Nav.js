import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../AppContext";

const Nav = () => {
  const { currentUser, currentUserIsInGroup } = useContext(AppContext);

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Welcome</NavLink>
        </li>
        {currentUserIsInGroup("loggedOutUsers") && (
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
        )}
        {currentUserIsInGroup("admins") && (
          <li>
            <NavLink to="/admin">Admin-Panel</NavLink>
          </li>
        )}
        {currentUserIsInGroup("members") && (
          <li>
            <NavLink to="/todo">Taskmanager</NavLink>
          </li>
        )}

        {currentUserIsInGroup("loggedOutUsers") && (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
        {currentUserIsInGroup("loggedInUsers") && (
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
