import React, { useContext, useEffect, useState } from 'react';

import { auth } from '../firebase';
import firebase from 'firebase/app';

type AuthContextType = {
  currentUser: any;
  isLogingIn: boolean;
  signup: (email: string, password: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  signInWithGoogle: () => void;
  resetPassword: (email: string) => void;
};

const AuthContext = React.createContext<AuthContextType>(undefined!);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
  const [currentUser, setCurrentUser] = useState();
  const [isLogingIn, setIsLogingIn] = useState(false);

  const signup = (email: string, password: string) => {
    setIsLogingIn(true);
    auth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email: string, password: string) => {
    setIsLogingIn(true);
    auth.signInWithEmailAndPassword(email, password);
  };

  const signInWithGoogle = () => {
    setIsLogingIn(true);

    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider);
  };

  const logout = () => auth.signOut();

  const resetPassword = (email: string) => auth.sendPasswordResetEmail(email);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user: any) => {
      setCurrentUser(user);
      setIsLogingIn(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    isLogingIn,
    signup,
    login,
    logout,
    signInWithGoogle,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
