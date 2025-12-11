import React, { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../firebase.config";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("loading"); // initial loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("Firebase user:", firebaseUser);
  console.log("Email:", firebaseUser.email);
  console.log("Provider data:", firebaseUser.providerData);
      if (firebaseUser) {
        // Set user object with all needed info
        setUser({
          name: firebaseUser.displayName || "User",
          email: firebaseUser.email,
          photo: firebaseUser.photoURL || "/default-avatar.png",
          uid: firebaseUser.uid,
        });
        console.log("✅ AuthContext User:", firebaseUser);
      } else {
        setUser(null);
        console.log("❌ User logged out");
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
