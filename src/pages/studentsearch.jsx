import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const StudentSearch = () => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [department, setDepartment] = useState("");
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    let url = "";

    if (name && year && department) {
      url = `http://localhost:8080/api/students/name/${name}/department/${department}/year/${year}`;
    } else if (name) {
      url = `http://localhost:8080/api/students/name/${name}`;
    } else if (year) {
      url = `http://localhost:8080/api/students/year/${year}`;
    } else if (department) {
      url = `http://localhost:8080/api/students/department/${department}`;
    } else {
      setError("Please enter at least one search parameter.");
      return;
    }

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setStudents(data || []); // Ensure response data is an array
      setError(""); // Clear any previous errors
    } catch (err) {
      setError("Failed to fetch students");
      console.error(err);
    }
  };

  return (
    <div className="search-student">
      <h1>Search Students</h1>
      <div className="search-bars">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <div>{error}</div>}
      <div className="student-list">
        {students.length > 0 ? (
          students.map((student) => (
            <div
              key={student.userId}
              style={{
                display: "flex",
                justifyContent: "center", // Center horizontally
                alignItems: "center", // Center vertically
                height: "100vh", // Full viewport height
                width: "100vw", // Full viewport width
                backgroundColor: "#f5f5f5", // Light background color
                padding: "20px", // Padding around the content
              }}
            >
              <Card
                sx={{
                  width: 600, // Wider card
                  height: "auto", // Auto height to accommodate content
                  display: "flex",
                  flexDirection: "column", // Stack children vertically
                  alignItems: "flex-start", // Align items to the start (left)
                  padding: 3, // Add padding inside the card
                  boxShadow: 3, // Add shadow for elevation effect
                  borderRadius: 2, // Rounded corners
                  backgroundColor: "#ffffff", // White background for the card
                }}
              >
                <CardActionArea
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start", // Align children (image and content) to the start (left)
                  }}
                >
                  <CardMedia
                    component="img"
                    height="300" // Increased height for a larger profile image
                    image={student.user.photo}
                    alt="profile picture"
                    sx={{ width: "100%", objectFit: "cover" }} // Ensure the image covers the card width
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: "100%", // Ensure content takes full width of the card
                      padding: 3, // Add padding inside the content area
                      textAlign: "left", // Align text to the left
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="h4"
                      component="div"
                      sx={{ mb: 2 }}
                    >
                      <strong>Username:</strong> {student.user.username}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      <p>
                        <strong>UserId:</strong> {student.userId}
                      </p>
                      <p>
                        <strong>Name:</strong> {student.user.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {student.user.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {student.user.phone}
                      </p>
                      <p>
                        <strong>Department:</strong> {student.department.name}
                      </p>
                      <p>
                        <strong>Year:</strong> {student.year}
                      </p>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          ))
        ) : (
          <div>No students found</div>
        )}
      </div>
    </div>
  );
};

export default StudentSearch;
