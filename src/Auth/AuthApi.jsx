import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./FirebaseAuth";
import axios from "axios";

export const AUthfirebase = createContext();

function AuthApi({ children }) {
  const [user, setUser] = useState(null);
  const [isloading, setIsLoading] = useState(true);

  const provider = new GoogleAuthProvider();

  const CreateUser = async (email, password, name, photoURL) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL,
      });
      return userCredential.user;
    } catch (error) {
      throw new Error(getAuthErrorMessage(error.code));
    }
  };

  const LogIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const SignOutUser = () => {
    return signOut(auth);
  };

  const GoogleLogIN = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google login failed: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      console.log(currentUser);

      if (currentUser) {
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  useEffect(() => {
    const updateUser = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_URL}update-user-api`,
          {
            email: user?.email,
            displayName: user?.displayName,
            photoURL: user?.photoURL,
          }
        );
      } catch (error) {
        console.error("Error updating user:", error);
      }
    };

    if (user) {
      updateUser();
    }
  }, [user]);

  const values = {
    CreateUser,
    SignOutUser,
    user,
    LogIn,
    isloading,
    GoogleLogIN,
  };

  return (
    <AUthfirebase.Provider value={values}>{children}</AUthfirebase.Provider>
  );
}

export default AuthApi;
