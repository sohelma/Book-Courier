import { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase.config";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.email) {
        try {
          // Backend থেকে role fetch
          const res = await axios.get(`https://book-courier-server-six.vercel.app/users?email=${currentUser.email}`);
          const userData = res.data[0] || {};
          setUser({ email: currentUser.email, role: userData.role || "user" });
        } catch (err) {
          console.error(err);
          setUser({ email: currentUser.email, role: "user" });
        }
        localStorage.setItem("userEmail", currentUser.email);
      } else {
        setUser(null);
        localStorage.removeItem("userEmail");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const googleLogin = () => signInWithPopup(auth, googleProvider);

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("userEmail");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);