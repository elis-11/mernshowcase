import { createContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    accessGroups: "loggedOutUsers",
  });

  
  const currentUserIsInGroup = (accessGroup) => {
    const accessGroupArray = currentUser.accessGroups
      .split(",")
      .map((m) => m.trim());
    return accessGroupArray.includes(accessGroup);
  };
  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        currentUserIsInGroup,
  
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
