// src/routes/index.jsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./../layouts/MainLayout";
import Dashboard from "./../pages/Dashboard";
import Login from "./../pages/auth/Login";
import Doctors from "../pages/Doctors";
import ProtectedRoute from "./ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "doctors", element: <Doctors /> },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
