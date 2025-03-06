import { createContext, useState, useContext } from "react";

// Create Authentication Context
const AuthContext = createContext();

// Custom Hook to use the Auth Context
export function useAuth() {
    return useContext(AuthContext);
}

// AuthProvider Component
export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthContext