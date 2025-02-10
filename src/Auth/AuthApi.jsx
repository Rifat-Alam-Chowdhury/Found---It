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
        photoURL: photoURL || "https://example.com/default-avatar.jpg",
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
    let isMounted = true; // To prevent state updates on unmounted component

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (isMounted) {
        console.log(currentUser);
        setUser(currentUser);
        setIsLoading(false); // Always set loading to false after check
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

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
