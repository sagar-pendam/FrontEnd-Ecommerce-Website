import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../api/authApi";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setServerError("");
    setLoading(true);
    try {
      await registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
        role: "ROLE_USER",
      });
      alert("Registration successful! Please log in.");
      toast.success("Registration successful! Please log in");
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data) {
        const msg = error.response.data.message || error.response.data.error;
        if (msg?.includes("Email already registered")) {
          setServerError("Email already registered!");
        } else if (msg?.includes("Username already taken")) {
          setServerError("Username already taken!");
        } else {
          setServerError("Registration failed. Please try again later.");
        }
      } else {
        setServerError("Unable to connect to server. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-lg rounded-xl p-8 w-96"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Create an Account
        </h2>

        {serverError && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded text-sm">
            {serverError}
          </div>
        )}

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          {...register("username", {
            required: "Username is required",
            minLength: { value: 3, message: "Username must be at least 3 characters" },
          })}
          className="w-full border p-2 rounded mb-2"
        />
        {errors.username && (
          <p className="text-red-500 text-sm mb-3">{errors.username.message}</p>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
          className="w-full border p-2 rounded mb-2"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-3">{errors.email.message}</p>
        )}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Password must be at least 6 characters" },
          })}
          className="w-full border p-2 rounded mb-2"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-3">{errors.password.message}</p>
        )}

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
          className="w-full border p-2 rounded mb-4"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mb-3">{errors.confirmPassword.message}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 text-white mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          )}
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-sm text-center mt-4 text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login here
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default Register;
