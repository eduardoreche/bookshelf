import React, { useContext, useEffect, useState } from "react";

import { auth } from "../firebase";

type AuthContextType = {
  currentUser: any;
  signup: (email: string, password: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  resetPassword: (email: string) => void;
};

const AuthContext = React.createContext<AuthContextType>(undefined!);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
  const [currentUser, setCurrentUser] = useState();

  const signup = (email: string, password: string) =>
    auth.createUserWithEmailAndPassword(email, password);

  const login = (email: string, password: string) =>
    auth.signInWithEmailAndPassword(email, password);

  const logout = () => auth.signOut();

  const resetPassword = (email: string) => auth.sendPasswordResetEmail(email);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user: any) => {
      const token = await user?.getIdToken();
      console.log("TOKEN", token);
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
