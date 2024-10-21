"use client"; // Marking this as a client-side component

import React, { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Checkbox,
  FormControl,
  FormHelperText,
  Button,
  Grid,
} from "@mui/material";
import axios from "axios";
import Link from 'next/link'; // Import Link from Next.js
import { useRouter } from 'next/navigation';
import Image from "next/image";

// Use Next.js router for navigation
import logo from "../images/logo.png";
const Login = () => {
  const router = useRouter(); // Replacing useNavigate with useRouter
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation function (min 6 characters, at least 1 number)
  const validatePassword = (password) => {
    return password.length >= 6 && /\d/.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;
    // Check if all fields are filled
    const newErrors = {
      email: !validateEmail(email),
      password: !validatePassword(password),
    };

    setErrors(newErrors);

    // If no errors, submit the form
    const hasErrors = Object.values(newErrors).some((error) => error);
    if (!hasErrors) {
      console.log("Form Data Submitted:", formData);
      const payload = {
        username: formData.email,
        password: formData.password,
      };

      // Making API call with fetch (you can use axios as well)
      fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "emilys",
          password: "emilyspass",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("response data", data);
          if (data.accessToken) {
            localStorage.setItem("accessToken", data.accessToken);
            router.push("/dashboard"); // Using router.push for navigation
          } else {
            alert("Invalid credentials");
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert("All fields are mandatory");
      console.log("Please correct the errors.");
    }
  };

  return (
    <div className="container py-5">
      <div className="row d-flex justify-content-center">
        <div className="col-sm-7">
          <div className="d-flex justify-content-center">
            {/* Use the Next.js public folder to handle static files */}
            <Image src={logo} className="auth_logo m-0 auto" alt="Logo" /> 
          </div>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              "& > :not(style)": { m: 2 },
              p: 3,
              borderRadius: 1,
              boxShadow: 1,
              backgroundColor: "white",
              mt: 2,
            }} // Adds padding and a shadow
          >
            <h2 className="text-center">Login</h2>

            <FormControl fullWidth variant="standard" sx={{ mb: 2 }}>
              <TextField
                id="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Checkbox
                        checked
                        sx={{
                          color: "green",
                          "&.Mui-checked": {
                            color: "green",
                          },
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
              {errors.email && (
                <FormHelperText>Please enter your email address</FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth variant="standard">
              <TextField
                id="password"
                label="Password"
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Checkbox
                        checked
                        sx={{
                          color: "green",
                          "&.Mui-checked": {
                            color: "green",
                          },
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
              {errors.password && (
                <FormHelperText>Please enter your password</FormHelperText>
              )}
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Login
            </Button>

            <Box>
              <Grid container spacing={2}>
                <Grid item>
                  <p>
                    If you don't have an account{" "}
                    {/* Using Next.js Link for client-side navigation */}
                    <Link href="/signup" style={{ color: "blue" }}>
                      click here
                    </Link>{" "}
                    to create a new account
                  </p>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Login;
