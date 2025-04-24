import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  user: any | null;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    // Check local storage or token validity on mount
    const checkAuth = () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        // Validate token here if needed
        setUser({ token }); // Replace with actual user data
      }
    };
    checkAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
    window.location.href = '/session/login';
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};