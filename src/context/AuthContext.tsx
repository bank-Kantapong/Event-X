import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/router";

type UserRole = "admin" | "user" | null;

interface User {
  username: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("event-x-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    if (username === "admin" && password === "1234") {
      const adminUser: User = { username: "admin", role: "admin" };
      setUser(adminUser);
      localStorage.setItem("event-x-user", JSON.stringify(adminUser));
      return true;
    } else if (username === "user1" && password === "1234") {
      const normalUser: User = { username: "user1", role: "user" };
      setUser(normalUser);
      localStorage.setItem("event-x-user", JSON.stringify(normalUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("event-x-user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
