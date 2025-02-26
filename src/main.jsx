import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, RouterProvider } from "react-router";
import router from "./Router.jsx";
import AuthApi from "./Auth/AuthApi.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <AuthApi>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
        <App />
        <Toaster />{" "}
      </RouterProvider>
    </QueryClientProvider>
  </AuthApi>
);
