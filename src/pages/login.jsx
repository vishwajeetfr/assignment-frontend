// login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";
const LoginForm = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        {
          userName,
          password,
        },
        { withCredentials: true }
      );

      const {
        jwtToken,
        userName: responseUserName,
        role: responseRole,
      } = response.data;
      console.log("Server Response:", jwtToken, responseUserName, responseRole);

      localStorage.setItem("token", jwtToken);
      localStorage.setItem("user", JSON.stringify(responseUserName));
      localStorage.setItem("userRole", responseRole);

      // Navigate to the appropriate page based on the user's role
      if (jwtToken) {
        if (responseRole === "STUDENT") {
          console.log("Navigating to /student");
          navigate("/student");
        } else if (responseRole === "FACULTY_MEMBER") {
          console.log("Navigating to /faculty");
          navigate("/faculty");
        } else if (responseRole === "ADMINISTRATOR") {
          console.log("Navigating to /admin");
          navigate("/admin");
        }
      }
    } catch (err) {
      console.error(
        "Login Error:",
        err.response?.data?.message || "Incorrect credentials"
      );
      setError(err.response?.data?.message || "Incorrect credentials");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Username"
        value={userName}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="Student">Student</option>
        <option value="FacultyMember">Faculty Member</option>
        <option value="Administrator">Administrator</option>
      </select>
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginForm;
