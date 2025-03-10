import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const users = [
  { email: "admin@example.com", password: "admin123", role: "Admin" },
  { email: "user1@example.com", password: "user123", role: "User" },
  { email: "user2@example.com", password: "user456", role: "User" },
];

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = users.find(
      (u) => u.email === email && u.password === password && u.role === role
    );

    if (user) {
      if (user.role === "Admin") navigate("/admin/admin-dashboard");
      if (user.role === "User") navigate("/user/user-dashbard");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{
        height: "100vh", // Centering the content vertically
        backgroundColor: "#f4f6f9", // Light background color for the page
      }}
    >
      <div
        className="card p-4 shadow-lg"
        style={{
          width: "400px", // Width of the login card
          backgroundColor: "#ffffff", // White background for the card
          borderRadius: "10px", // Rounded corners for the card
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Light shadow effect
        }}
      >
        <h2 className="text-center mb-4" style={{ color: "#333" }}>Login</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              backgroundColor: "#f9f9f9", // Slightly off-white background for inputs
              color: "#333", // Dark text for the input fields
              borderRadius: "5px",
            }}
          />
        </div>
        <div className="form-group mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              backgroundColor: "#f9f9f9", // Slightly off-white background for inputs
              color: "#333", // Dark text for the input fields
              borderRadius: "5px",
            }}
          />
        </div>
        <div className="form-group mb-3">
          <label>Role</label>
          <select
            className="form-control"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              backgroundColor: "#f9f9f9", // Slightly off-white background for select
              color: "#333", // Dark text for the select dropdown
              borderRadius: "5px",
            }}
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>
        <button
          className="btn w-100"
          onClick={handleLogin}
          style={{
            backgroundColor: "#000", // Black background for the button
            color: "#fff", // White text for the button
            border: "none", // No border for the button
            borderRadius: "5px", // Rounded corners for the button
            padding: "10px",
            transition: "background-color 0.3s ease-in-out", // Smooth hover effect
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = "#555"} // Hover effect (grey)
          onMouseLeave={(e) => e.target.style.backgroundColor = "#000"} // Reset on mouse leave
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
