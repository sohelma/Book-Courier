
import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Demo: simulate email sending
    setTimeout(() => {
      setLoading(false);
      alert("Your message has been sent!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 py-10 px-4">

      {/* Section Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">
          Contact Us
        </h1>
        <p className="mt-2 text-base-content/70">
          We are always here to assist you. Feel free to reach out.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">

        {/* Left Side - Contact Info */}
        <div className="bg-base-100 shadow-md rounded-xl p-8 border border-base-300">
          <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>

          <div className="space-y-5">

            <div className="flex items-start gap-4">
              <FaPhoneAlt className="text-primary text-xl" />
              <div>
                <p className="font-semibold">Phone</p>
                <p className="text-base-content/70">+880 1234-567890</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaEnvelope className="text-primary text-xl" />
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-base-content/70">support@bookcourier.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-primary text-xl" />
              <div>
                <p className="font-semibold">Address</p>
                <p className="text-base-content/70">Dhaka, Bangladesh</p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-5">
              <a href="#" className="text-primary hover:scale-110 duration-200 text-2xl">
                <FaFacebook />
              </a>
              <a href="#" className="text-primary hover:scale-110 duration-200 text-2xl">
                <FaWhatsapp />
              </a>
            </div>

          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="bg-base-100 shadow-md rounded-xl p-8 border border-base-300">
          <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full"
              required
            />

            <input
              type="email"
              placeholder="Your Email"
              className="input input-bordered w-full"
              required
            />

            <textarea
              placeholder="Your Message"
              className="textarea textarea-bordered w-full h-32"
              required
            ></textarea>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Send Message"
              )}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;
