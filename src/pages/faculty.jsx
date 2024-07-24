import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const FacultyPage = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const url = "http://localhost:8080/api/faculty/37/students";
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div>
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
        LOGOUT
      </Button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        <h1>{localStorage.getItem("user")}'s Dashboard</h1>
        {students.map((student) => (
          <div
            key={student.userId}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100vw",
              marginBottom: "20px",
            }}
          >
            <Card
              sx={{
                width: 600,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: 3,
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: "#ffffff",
              }}
            >
              <CardActionArea
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={student.photo}
                  alt={`${student.user.name}'s photo`}
                  sx={{ width: "100%", objectFit: "cover" }}
                />
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    width: "100%",
                    padding: 3,
                    textAlign: "left",
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="div"
                    sx={{ mb: 2 }}
                  ></Typography>
                  <Typography variant="body1" color="text.secondary">
                    <p>
                      <strong>Name:</strong> {student.user.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {student.user.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {student.user.phone}
                    </p>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacultyPage;
