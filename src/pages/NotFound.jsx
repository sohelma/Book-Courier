import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 md:p-12 max-w-lg w-full text-center text-white animate-fadeIn">

        {/* 404 Text */}
        <h1 className="text-[96px] md:text-[120px] font-extrabold tracking-tight drop-shadow-lg">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-semibold mb-2">
          Oops! Page not found
        </h2>

        <p className="text-white/80 mb-8">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-xl bg-white text-indigo-600 font-semibold hover:scale-105 transition-transform shadow-lg"
          >
            Go Home
          </button>

          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-xl border border-white/40 hover:bg-white/10 transition"
          >
            Go Back
          </button>
        </div>

        {/* Decorative Glow */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-500/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/30 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default NotFound;
