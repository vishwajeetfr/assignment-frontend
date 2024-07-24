import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const StudentPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userName = JSON.parse(localStorage.getItem("user"));
        const url = `http://localhost:8080/api/students/username/${userName}`;
        console.log(url);

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
        console.log("data received ", data);
        setUserInfo(data);
      } catch (err) {
        setError("Failed to fetch user information");
        console.error(err);
      }
    };

    fetchUserInfo();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  const { userId, photo, department, year, user } = userInfo;
  const { username, name, email, phone } = user;

  return (
    <div>
      <Button
        variant="outlined"
        sx={{
          position: "absolute",
          top: "20px",
          right: "20px",
        }}
        onClick={() => {
          navigate("/student-search");
        }}
      >
        Search
      </Button>
      <Button
        variant="outlined"
        sx={{
          position: "absolute",
          top: "20px",
          right: "130px",
        }}
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }}
      >
        Logout
      </Button>
      <div
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
              image={photo}
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
                <strong>Username:</strong> {username}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                <p>
                  <strong>UserId:</strong> {userId}
                </p>
                <p>
                  <strong>Name:</strong> {name}
                </p>
                <p>
                  <strong>Email:</strong> {email}
                </p>
                <p>
                  <strong>Phone:</strong> {phone}
                </p>
                <p>
                  <strong>Department:</strong> {department.name}
                </p>
                <p>
                  <strong>Year:</strong> {year}
                </p>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
};

export default StudentPage;
