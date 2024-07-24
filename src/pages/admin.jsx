import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [view, setView] = useState("students");
  const [update, setUpdate] = useState(false);
  const [operation, setOperation] = useState("update");
  const [userType, setUserType] = useState("student");
  const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState({
    departmentName: "",
    year: "",
    username: "",
    password: "",
    role: "",
    name: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/api/students", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(response.data);
      setView("students");
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchFaculty = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/api/faculty", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFaculty(response.data);
      setView("faculty");
    } catch (error) {
      console.error("Error fetching faculty:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      if (operation === "delete") {
        const url = `http://localhost:8080/api/${userType}s/${userId}`;
        await axios.delete(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert(`${userType} deleted successfully`);
      } else {
        // Assume update or add operation
        let url;
        let payload;

        if (operation === "add" && userType === "student") {
          url = `http://localhost:8080/api/students`;
          payload = {
            photo: "defaultPhoto.png", // Replace with actual photo logic if needed
            department: {
              name: formData.departmentName,
              description: "Updated department description", // Static description for example
            },
            year: formData.year,
            user: {
              username: formData.username,
              password: formData.password,
              role: formData.role,
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
            },
          };
        } else {
          // Default to update operation for other cases
          url = `http://localhost:8080/api/${userType}s/${userId}`;
          payload = {
            photo: "defaultPhoto.png", // Replace with actual photo logic if needed
            department: {
              name: formData.departmentName,
              description: "Updated department description", // Static description for example
            },
            year: formData.year,
            user: {
              username: formData.username,
              password: formData.password,
              role: formData.role,
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
            },
          };
        }

        const method = operation === "add" ? "post" : "put";

        await axios[method](url, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });

        alert(
          `${userType} ${
            operation === "add" ? "added" : "updated"
          } successfully`
        );
      }

      setUpdate(false); // Close the update form
      fetchStudents(); // Refresh the data
      fetchFaculty(); // Refresh the data
    } catch (error) {
      console.error(`Error during ${operation} operation:`, error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const renderCard = (user) => (
    <Card
      key={user.userId}
      sx={{
        width: 600,
        margin: "20px",
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
          image={user.photo}
          alt="profile picture"
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
          <Typography gutterBottom variant="h4" component="div" sx={{ mb: 2 }}>
            <strong>Username:</strong> {user.user.username}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <p>
              <strong>UserId:</strong> {user.userId}
            </p>
            <p>
              <strong>Name:</strong> {user.user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.user.phone}
            </p>
            <p>
              <strong>Department:</strong> {user.department.name}
            </p>
            <p>
              <strong>Year:</strong> {user.year}
            </p>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );

  return (
    <div>
      <header
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "20px",
          position: "fixed",
          top: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => {
            setUpdate(!update);
          }}
        >
          Update
        </Button>
        <Button variant="outlined" onClick={fetchStudents}>
          Student List
        </Button>
        <Button variant="outlined" onClick={fetchFaculty}>
          Faculty List
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
          }}
        >
          LOGOUT
        </Button>
      </header>
      {update && (
        <form
          onSubmit={handleFormSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            width: "80%", // Set the desired width
            margin: "20px auto", // Center the form
            backgroundColor: "#f5f5f5", // Light background color
            borderRadius: "8px", // Rounded corners
            gap: "20px", // Add gap between elements
          }}
        >
          <FormControl component="fieldset">
            <FormLabel component="legend">Operation</FormLabel>
            <RadioGroup
              row
              name="operation"
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
            >
              <FormControlLabel value="add" control={<Radio />} label="Add" />
              <FormControlLabel
                value="update"
                control={<Radio />}
                label="Update"
              />
              <FormControlLabel
                value="delete"
                control={<Radio />}
                label="Delete"
              />
            </RadioGroup>
          </FormControl>
          <FormControl component="fieldset">
            <FormLabel component="legend">User Type</FormLabel>
            <RadioGroup
              row
              name="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <FormControlLabel
                value="student"
                control={<Radio />}
                label="Student"
              />
              <FormControlLabel
                value="faculty"
                control={<Radio />}
                label="Faculty"
              />
            </RadioGroup>
          </FormControl>
          <TextField
            label="User ID"
            name="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required={operation !== "add"}
            fullWidth
          />
          {(operation === "add" || operation === "update") && (
            <>
              <TextField
                label="Department Name"
                name="departmentName"
                value={formData.departmentName}
                onChange={handleInputChange}
                required
                fullWidth
              />
              <TextField
                label="Year"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                required
                fullWidth
              />
              <TextField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                fullWidth
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                fullWidth
              />
              <TextField
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
                fullWidth
              />
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                fullWidth
              />
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                fullWidth
              />
              <TextField
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                fullWidth
              />
            </>
          )}
          <Button variant="outlined" type="submit">
            Submit
          </Button>
        </form>
      )}
      {!update && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            width: "80%",
            overflow: "auto",
            marginTop: "80px",
          }}
        >
          {view === "students" && students.map(renderCard)}
          {view === "faculty" && faculty.map(renderCard)}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
