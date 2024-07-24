import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./pages/login";
import StudentPage from "./pages/student";
import FacultyPage from "./pages/faculty";
import AdminPage from "./pages/admin";
import StudentSearch from "./pages/studentsearch";
import "./index.css";
import App from "./App";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="login" element={<Login />} />
      <Route path="student" element={<StudentPage />} />
      <Route path="faculty" element={<FacultyPage />} />
      <Route path="admin" element={<AdminPage />} />
      <Route path="student-search" element={<StudentSearch />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
