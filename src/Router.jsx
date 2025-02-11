import { createBrowserRouter } from "react-router";
import App from "./App";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home/Home";
import Find from "./pages/Find/Find";
import Post from "./pages/Post/Post";
import Profile from "./pages/Profile/Profile";
import About from "./pages/About/About";
import Private from "./pages/Private";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/find", element: <Find /> },
      {
        path: "/post",
        element: (
          <Private>
            <Post />
          </Private>
        ),
      },

      { path: "/About", element: <About /> },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "/Profile",
    element: <Profile />,
  },
]);

export default router;
