import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase.config";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc"; // Google icon
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Eye icons
import { useNavigate } from "react-router-dom"; // <-- add this

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // <-- initialize navigate

  // Email/Password login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login Successful!");
      navigate("/"); // <-- redirect to home after login
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  // Google login
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Login with Google Successful!");
      navigate("/"); // <-- redirect to home after Google login
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <Toaster position="top-right" />
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Login to Your Account
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
            Welcome back! Please login with your credentials.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
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
                placeholder="Enter your password"
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 
                focus:ring-blue-500 outline-none bg-white dark:bg-gray-700 
                text-gray-900 dark:text-gray-100"
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            {/* Eye Icon */}
            <span
                className="absolute right-4 top-[69%]-translate
                cursor-pointer text-gray-600 dark:text-gray-300 text-xl"
                onClick={() => setShowPassword(!showPassword)} >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg font-semibold text-white
              bg-gradient-to-r from-indigo-500 via-sky-500 to-indigo-400
              hover:from-indigo-600 hover:via-sky-600 hover:to-indigo-500
              transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 flex justify-center items-center"
          >
            {loading && (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            )}
            Login
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-1 border-gray-300 dark:border-gray-600" />
          <span className="px-3 text-gray-500 dark:text-gray-300 text-sm">OR</span>
          <hr className="flex-1 border-gray-300 dark:border-gray-600" />
        </div>

        {/* Google login button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex justify-center items-center gap-2 py-2.5 rounded-lg font-semibold text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <FcGoogle size={22} /> Login with Google
        </button>

        {/* Redirect to register */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 font-semibold hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
