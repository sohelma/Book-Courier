// src/pages/Dashboard/MyProfile.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { auth, storage } from "../../firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";

const ProfileSkeleton = () => {
  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 animate-pulse">
      <div className="flex flex-col items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-700" />
        <div className="w-full h-10 rounded bg-gray-300 dark:bg-gray-700" />
        <div className="w-full h-10 rounded bg-gray-300 dark:bg-gray-700" />
        <div className="w-full h-10 rounded bg-gray-300 dark:bg-gray-700" />
        <div className="w-full h-11 rounded bg-gray-400 dark:bg-gray-600" />
      </div>
    </div>
  );
};

const MyProfile = () => {
  const { user, setUser } = useAuth();

  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhotoURL(user.photoURL || "https://i.pravatar.cc/150");
      setLoading(false);
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPhotoURL(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async () => {
    if (!user) return;

    setUpdating(true);

    try {
      let updatedPhotoURL = photoURL;

      if (imageFile) {
        const storageRef = ref(storage, `profile/${user.uid}/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        updatedPhotoURL = await getDownloadURL(storageRef);
      }

      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: updatedPhotoURL,
      });

      setUser({
        ...user,
        displayName: name,
        photoURL: updatedPhotoURL,
      });

      toast.success("Profile updated successfully!", { duration: 1500 });
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile", { duration: 1500 });
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-[80vh] p-6 sm:p-10 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Toaster position="top-right" />

      <h2 className="text-3xl font-bold text-gray-900 dark:text-indigo-400 mb-10 text-center">
        My Profile
      </h2>

      {loading ? (
        <ProfileSkeleton />
      ) : (
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 flex flex-col items-center gap-6">
          <img
            src={photoURL}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500"
          />

          <label className="w-full text-gray-900 dark:text-gray-200">
            <span className="block mb-1 font-medium">Change Profile Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 rounded-lg bg-sky-500 text-white cursor-pointer"
            />
          </label>

          <div className="w-full">
            <label className="block mb-1 font-medium text-gray-900 dark:text-gray-200">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div className="w-full">
            <label className="block mb-1 font-medium text-gray-900 dark:text-gray-200">
              Email
            </label>
            <input
              value={user.email}
              readOnly
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          <button
            onClick={handleUpdateProfile}
            disabled={updating}
            className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition"
          >
            {updating ? "Updating..." : "Update Profile"}
          </button>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
