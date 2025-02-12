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
import EditProfile from "./pages/Edit/EditProfile";
import Mypost from "./pages/Mypost/Mypost";
import CreatePost from "./pages/CreatePost/CreatePost";
import Iteamdetails from "./pages/Iteam details/Iteamdetails";
import ItemModal from "./components/ItemModal";

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
      {
        path: "/Iteamdetails/:id",
        element: (
          <Private>
            <Iteamdetails />
            <ItemModal />
          </Private>
        ),
      },

      { path: "/About", element: <About /> },
      {
        path: "/Profile",
        element: (
          <Private>
            <Profile />
          </Private>
        ),
        children: [
          {
            path: "edit",
            element: <EditProfile />,
          },
          {
            path: "mypost",
            element: <Mypost />,
          },
          {
            path: "CreatePost",
            element: <CreatePost />,
          },
        ],
      },
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
]);

export default router;
