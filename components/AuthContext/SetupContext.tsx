import React, { createContext, useState, useContext } from "react";

type AuthContextProps = {
  isSigedIn: boolean;
  signIn: () => void;
  signOut: () => void;
};

type authProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextProps>({
  isSigedIn: false,
  signIn: () => {},
  signOut: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<authProviderProps> = ({ children }) => {
  const [isSigedIn, setIsSigedIn] = useState(false);

  const signIn = () => {
    setIsSigedIn(true);
  };

  const signOut = () => {
    setIsSigedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isSigedIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
