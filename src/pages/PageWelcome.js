import { useContext } from "react";
import AppContext from "../AppContext";

const PageWelcome = () => {
  const { userInGroup } = useContext(AppContext);
    const { currentUser} = useContext(AppContext);

  return (
    <div>

      <div>
        {userInGroup("loggedOutUsers") && (
          <div className="panel">Welcome to this site.</div>
        )}

        {userInGroup("member") && (
          <div className="panel">
            <h3>{currentUser.firstName} {currentUser.lastName},</h3>
            <p>
              Welcome to our Members Club.
            </p>
            <div className="news"><span>BRANDNEW: </span>
            Taskmanager APP Beta Version 1.5 is online!!!!</div>
           
          </div>
        )}

        {userInGroup("notApprovedUsers") && (
          <div className="panel">
            <h3>Thank you for registering!</h3>
            An administrator will approve your account as soon as possible.
          </div>
        )}
      </div>
    </div>
  );
};

export default PageWelcome;
