"use client";


// pages/signup.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  InputAdornment,
  Checkbox,
  FormControl,
  FormHelperText,
  Button,
} from "@mui/material";
import Image from "next/image"; // Next.js optimized image component
import logo from "../images/logo.png";// Update the path to public folder in Next.js
import { useRouter } from "next/navigation"; // Next.js router

const Signup = () => {
  const router = useRouter(); // useRouter hook for navigation
  const token = typeof window !== "undefined" ? localStorage.getItem('accessToken') : null;

//   useEffect(() => {
//     if (token) {
//       router.push("/"); // Using router.push for navigation in Next.js
//     }
//   }, [token]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6 && /\d/.test(password);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = formData;

    const newErrors = {
      firstName: !firstName,
      lastName: !lastName,
      email: !validateEmail(email),
      password: !validatePassword(password),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);
    if (!hasErrors) {
      console.log("Form Data Submitted:", formData);

      axios
        .post("https://dummyjson.com/users/add", formData, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            alert("Successfully Registered");
            router.push("/dashboard"); // Navigate to login page after success
          } else {
            alert("Something went wrong");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("All fields are mandatory");
      console.log("Please correct the errors.");
    }
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-sm-7">
          <div className="d-flex justify-content-center">
            <Image src={logo} className="auth_logo m-0 auto" alt="Logo" /> {/* Using Next.js Image */}
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
            }}
          >
            <h2 className="text-center">Sign up</h2>

            <FormControl
              fullWidth
              variant="standard"
              sx={{ mb: 2 }}
              error={errors.firstName}
            >
              <TextField
                id="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Checkbox
                        checked
                        sx={{
                          color: "green",
                          "&.Mui-checked": { color: "green" },
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
              {errors.firstName && (
                <FormHelperText>Please enter your first name</FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              variant="standard"
              sx={{ mb: 2 }}
              error={errors.lastName}
            >
              <TextField
                id="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Checkbox
                        checked
                        sx={{
                          color: "green",
                          "&.Mui-checked": { color: "green" },
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
              {errors.lastName && (
                <FormHelperText>Please enter your last name</FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              variant="standard"
              sx={{ mb: 2 }}
              error={errors.email}
            >
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
                          "&.Mui-checked": { color: "green" },
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
              {errors.email && (
                <FormHelperText>
                  Please enter a valid email address
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              variant="standard"
              error={errors.password}
            >
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
                          "&.Mui-checked": { color: "green" },
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
              {errors.password && (
                <FormHelperText>
                  Password must be at least 6 characters and contain a number
                </FormHelperText>
              )}
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Signup;
