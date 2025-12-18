import React from "react";
import Logo from "../../components/logo/logo";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { SiX } from "react-icons/si"; // X logo
import { motion } from "framer-motion";

const Footer = () => {
  const socialIcons = [
    { icon: <SiX />, color: "hover:text-white", link: "https://x.com" },
    { icon: <FaYoutube />, color: "hover:text-red-500", link: "#" },
    { icon: <FaFacebookF />, color: "hover:text-blue-600", link: "#" },
    { icon: <FaLinkedinIn />, color: "hover:text-blue-400", link: "https://linkedin.com" },
  ];

  return (
    <footer className="bg-gradient-to-r from-sky-400 via-indigo-500 to-sky-300 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start gap-6 text-center sm:text-left">

        {/* Services */}
        <div className="flex-1 flex flex-col items-center sm:items-start">
          <h6 className="text-lg font-bold mb-4">Services</h6>
          <a className="link link-hover mb-2">Branding</a>
          <a className="link link-hover mb-2">Design</a>
          <a className="link link-hover mb-2">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </div>

        {/* Company (centered) */}
        <div className="flex-1 flex flex-col items-center">
          <h6 className="text-lg font-bold mb-4">Company</h6>
          <a className="link link-hover mb-2">About Us</a>
          <a className="link link-hover mb-2">Contact</a>
          <a className="link link-hover mb-2">Jobs</a>
          <a className="link link-hover">Press Kit</a>
        </div>

        {/* Social + Logo */}
        <div className="flex-1 flex flex-col items-center sm:items-end">
          <h6 className="text-lg font-bold mb-4">Follow Us</h6>
          <div className="flex gap-6 mb-4 text-2xl">
            {socialIcons.map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition transform hover:-translate-y-1 ${item.color}`}
                whileHover={{ scale: 1.3 }}
              >
                {item.icon}
              </motion.a>
            ))}
          </div>
          <div className="mt-6">
            <Logo />
          </div>
        </div>
      </div>

      {/* Divider & Copyright */}
      <div className="border-t border-white/30 mt-10 pt-6 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Book-Courier. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
