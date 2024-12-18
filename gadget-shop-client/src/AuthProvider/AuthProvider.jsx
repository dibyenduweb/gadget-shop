/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { app } from "../firebase-config/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

// Create the AuthContext
export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to create a user
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Function to log in a user
  const Login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Function to log out a user
  const Logout = () => {
    return signOut(auth);
  };

  // Google login method
  const GoogleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Set user on state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Provide auth data to children components
  const authInfo = {
    user,
    loading,
    createUser, // This is where we provide the createUser function
    Login,
    Logout,
    GoogleLogin,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
