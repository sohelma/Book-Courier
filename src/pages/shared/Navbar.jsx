import React, { useState, useEffect } from "react";
import Logo from "../../components/logo/logo";
import { NavLink } from "react-router-dom";
import { auth } from "../../firebase.config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { motion } from "framer-motion";

const Navbar = () => {
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const links = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/books">Books</NavLink></li>
      <li><NavLink to="/dashboard">Dashboard</NavLink></li>
      <li><NavLink to="/coverage">Coverage</NavLink></li>
      <li><NavLink to="/contact">Contact</NavLink></li>
    </>
  );

  return (
   <div className="navbar bg-base-100 dark:bg-gray-900 shadow-md px-4 lg:px-8 sticky top-0 z-50 rounded-xl transition-colors duration-500">
  {/* Logo + Mobile Menu */}
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 dark:bg-gray-900 rounded-box mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
    <Logo />
  </div>

  {/* Desktop Menu */}
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 font-medium">
      {links}
    </ul>
  </div>

  {/* User + Theme */}
  <div className="navbar-end flex items-center gap-3">

    {/* Dark Mode Toggle */}
    <label className="swap swap-rotate cursor-pointer">
      <input type="checkbox" checked={theme === "dark"} onChange={toggleTheme} />
      <motion.svg 
        className="swap-on h-6 w-6 text-sky-500" 
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24" 
        fill="currentColor"
        whileHover={{ rotate: 20, scale: 1.2 }}
      >
        <path d="M12 18a6 6 0 100-12 6 6 0 000 12zM12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
      </motion.svg>
      <motion.svg 
        className="swap-off h-6 w-6 text-gray-800 dark:text-gray-200" 
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24" 
        fill="currentColor"
        whileHover={{ rotate: -20, scale: 1.2 }}
      >
        <path d="M21 12.79A9 9 0 1111.21 3A7 7 0 0021 12.79z"/>
      </motion.svg>
    </label>

    {user ? (
      <motion.div 
        className="flex items-center gap-3 bg-base-100 dark:bg-gray-800 p-2 rounded-xl transition-colors duration-300"
        whileHover={{ scale: 1.05 }}
      >
        {/* Avatar */}
        <div className="avatar">
          <div className="w-10 h-10 rounded-full ring ring-indigo-500 ring-offset-base-100 dark:ring-offset-gray-800 overflow-hidden">
            <img src={user.photoURL || "https://i.pravatar.cc/300"} alt={user.displayName || "User"} />
          </div>
        </div>

        {/* User Info */}
        <div className="flex flex-col">
          <p className="text-indigo-500 dark:text-gray-200 font-medium truncate max-w-[140px]">
            {user.displayName || "Anonymous"}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-xs truncate max-w-[140px]">
            {user.email}
          </p>
        </div>

        {/* Logout */}
        <button 
          onClick={handleLogout} 
          className="btn btn-sm btn-outline btn-primary ml-2 hover:scale-105 transition-transform"
        >
          Logout
        </button>
      </motion.div>
    ) : (
      <NavLink to="/login" className="btn btn-info btn-sm hover:scale-105 transition-transform">Login</NavLink>
    )}
  </div>
</div>

  );
};

export default Navbar;
