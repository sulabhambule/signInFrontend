import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../InputField/InputField";
import axios from "axios";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false); // Loading state
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const navigate = useNavigate(); // useNavigate for redirecting after signup

  const { username, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message
    setLoading(true); // Start loading state

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setLoading(false); // Stop loading state
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // On successful signup, redirect to the sign-in page
      setLoading(false); // Stop loading
      navigate("/signup-success"); // Navigate to success page
    } catch (error) {
      // Handle error
      setLoading(false); // Stop loading
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      setErrorMessage(
        error.response && error.response.data.message
          ? error.response.data.message
          : "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        {/* Name Field */}
        <InputField
          label="Name"
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          placeholder="Enter your name"
        />
        {/* Email Field */}
        <InputField
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        {/* Password Field */}
        <InputField
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Enter your password"
        />
        {/* Confirm Password Field */}
        <InputField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
        />

        {/* Show error message if exists */}
        {errorMessage && (
          <p className="mt-4 text-red-500 text-center">{errorMessage}</p>
        )}

        {/* Button with loading indicator */}
        <div className="flex items-center justify-between mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-transform duration-300 transform hover:scale-105"
            type="submit"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>

        {/* Redirect to sign-in page */}
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
