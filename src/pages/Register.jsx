// src/pages/Register.jsx

import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";
import toast from "react-hot-toast";
import logo from "../../public/images/logo.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  

  const handleRegister = async (e) => {
    e.preventDefault();

    // Strong password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 6 characters, include uppercase, lowercase, number & special character"
      );
      return;
    } else {
      setError("");
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Registration Successful!");
      setEmail("");
      setPassword("");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-50 dark:bg-gray-900 py-12">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 border border-gray-200 dark:border-gray-700">
        
        {/* Logo Section */}
        <div className="text-center mb-6">
          <img src={logo} alt="logo" className="w-14 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-3">
            Create Your Account
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Join Book Courier — Fast Delivery Everywhere
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

        {/* Password */}
<div className="relative">
  <label className="block text-gray-700 dark:text-gray-200 mb-1 font-medium">
    Password
  </label>

  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password (min 6 chars, upper, lower, number, special)"
    className="w-full border px-4 py-2 pr-12 rounded-lg focus:ring-2 focus:ring-blue-500 
    outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />

  {/* Eye Icon */}
  <span
    className="absolute right-4 top-[69%] -translate-y-1/2 cursor-pointer 
    text-gray-600 dark:text-gray-300 text-xl"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
  </span>

  {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
</div>


          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        {/* Login Redirect */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
