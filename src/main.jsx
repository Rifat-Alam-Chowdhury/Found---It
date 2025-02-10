import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, RouterProvider } from "react-router";
import router from "./Router.jsx";
import AuthApi from "./Auth/AuthApi.jsx";
import { Toaster } from "react-hot-toast";
createRoot(document.getElementById("root")).render(
  <AuthApi>
    <RouterProvider router={router}>
      <App />
      <Toaster />{" "}
    </RouterProvider>
  </AuthApi>
);
