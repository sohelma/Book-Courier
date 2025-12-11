// src/pages/Dashboard/MyProfile.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { auth, storage } from "../../firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";

const MyProfile = () => {
  const { user } = useAuth(); // AuthContext থেকে user
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
      setPhotoURL(URL.createObjectURL(file)); // preview
    }
  };

  const handleUpdateProfile = async () => {
    if (!user) return;
    setLoading(true);
    try {
      let updatedPhotoURL = photoURL;

      // যদি নতুন ছবি আপলোড হয়
      if (imageFile) {
        const storageRef = ref(storage, `profile/${user.uid}/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        updatedPhotoURL = await getDownloadURL(storageRef);
      }

      // Firebase Auth এ আপডেট
      await updateProfile(auth.currentUser, { displayName: name, photoURL: updatedPhotoURL });

      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] p-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Toaster position="top-right" />
      <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-8">
        My Profile
      </h2>

      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 flex flex-col items-center gap-6">
        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-indigo-500">
          <img src={photoURL} alt="Profile" className="w-full h-full object-cover" />
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="text-sm text-gray-600 dark:text-gray-300"
        />

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          placeholder="Name"
        />

        <input
          type="email"
          value={user?.email || ""}
          readOnly
          className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
        />

        <button
          onClick={handleUpdateProfile}
          disabled={loading}
          className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
