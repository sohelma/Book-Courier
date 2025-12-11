// src/pages/Register.jsx

import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
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

    // Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordRegex.test(password)) {
      setError(
        "Password must include uppercase, lowercase, number & special character"
      );
      return;
    }

    try {
      // Create User
      const result = await createUserWithEmailAndPassword(auth, email, password);

      // Auto set default name + default photo
      await updateProfile(result.user, {
        displayName: email.split("@")[0], // auto username from email
        photoURL: "/default-avatar.png",
      });

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

        {/* Logo */}
        <div className="text-center mb-6">
          <img src={logo} alt="logo" className="w-14 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-3">
            Create Your Account
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-5">
          
          {/* Email */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              className="w-full border px-4 py-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="Enter your email"
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
              placeholder="Strong Password"
              className="w-full border px-4 py-2 pr-12 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Eye Icon */}
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 dark:text-gray-300 text-xl"
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg font-semibold 
              bg-gradient-to-r from-indigo-500 via-sky-500 to-indigo-400
              hover:from-indigo-600 hover:via-sky-600 hover:to-indigo-500
              transition-all duration-300 text-white shadow-md"
          >
            Register
          </button>
        </form>

        {/* Redirect */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-4">
          Already have an account?
          <a href="/login" className="text-blue-600 dark:text-blue-400 font-semibold">
            Login
          </a>
        </p>

      </div>
    </div>
  );
};

export default Register;
