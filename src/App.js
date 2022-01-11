import dotenv from "dotenv";
import { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import PageWelcome from "./pages/PageWelcome";
import PageRegister from "./pages/PageRegister";
import PageLogin from "./pages/PageLogin";
import PageLogout from "./pages/PageLogout";
import PageAdmin from "./pages/PageAdmin";
import PageToDo from "./pages/PageToDo";
import AppContext from "./AppContext";
import FadeIn from "react-fade-in";
import "./App.scss";

dotenv.config();
const backend_env = process.env.REACT_APP_BACKEND_URL;

function App() {
  // const { setCurrentUser, currentUser, currentUserIsInGroup } =  useContext(AppContext);
  const { setCurrentUser  } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      const requestOptions = {
        method: "GET",
        credentials: "include",
      };
      const URL = await fetch(`${backend_env}/currentuser`,
        requestOptions
      );
      if (URL.ok) {
        const _currentUser = await URL.json();
        setCurrentUser((prev) => ({ ...prev, ..._currentUser }));
      }
    })();
  }, [setCurrentUser]);

  return (
    <div className="App">
      <div>
        <FadeIn transitionDuration="2000">
          {/* <ImSpinner6 /> */}

          <div>
            <h1>MERN Showcase App</h1>
          </div>
          <Nav />
          <Routes>
            <Route path="/" element={<PageWelcome />} />
            <Route path="/register" element={<PageRegister />} />
            <Route path="/admin" element={<PageAdmin />} />
            <Route path="/login" element={<PageLogin />} />
            <Route path="/logout" element={<PageLogout />} />
            <Route path="/todo" element={<PageToDo />} />
          </Routes>
        </FadeIn>
      </div>
    </div>
  );
}

export default App;
