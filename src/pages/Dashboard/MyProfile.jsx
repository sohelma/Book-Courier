// src/pages/Dashboard/MyProfile.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { auth, storage } from "../../firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";

const MyProfile = () => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhotoURL(user.photo || "https://i.pravatar.cc/150");
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPhotoURL(URL.createObjectURL(file)); // local preview
    }
  };

  const handleUpdateProfile = async () => {
    if (!user) return;
    setLoading(true);
    try {
      let updatedPhotoURL = photoURL;

      // Upload image to Firebase Storage
      if (imageFile) {
        const storageRef = ref(storage, `profile/${user.uid}/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        updatedPhotoURL = await getDownloadURL(storageRef);
      }

      // Update Firebase Auth profile
      await updateProfile(auth.currentUser, { displayName: name, photoURL: updatedPhotoURL });

      // Update Context
      setUser({ ...user, name: name, photo: updatedPhotoURL });

      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] p-6 sm:p-10 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Toaster position="top-right" />
      <h2 className="text-3xl font-bold text-gray-900 dark:text-indigo-400 mb-10 text-center">
        My Profile
      </h2>

      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 flex flex-col items-center gap-6">
        {/* Profile Image */}
        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-indigo-500">
          <img src={photoURL} alt="Profile" className="w-full h-full object-cover" />
        </div>

        {/* Choose File Button */}
        <label className="w-full">
          <span className="block mb-1 text-gray-700 dark:text-gray-200 font-medium">Change Profile Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full cursor-pointer px-4 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition"
          />
        </label>

        {/* Name Input */}
        <div className="w-full">
          <label className="block mb-1 text-gray-700 dark:text-gray-200 font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            placeholder="Your Name"
          />
        </div>

        {/* Email (readonly) */}
        <div className="w-full">
          <label className="block mb-1 text-gray-700 dark:text-gray-200 font-medium">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          />
        </div>

        {/* Update Button */}
        <button
          onClick={handleUpdateProfile}
          disabled={loading}
          className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium transition"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
