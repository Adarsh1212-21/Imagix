// AppContext.jsx
import { createContext, useState } from 'react';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [showLogin, setShowLogin] = useState(false);
    const [user, setUser] = useState(null);
    

    const backendUrl = import.meta.env.VITE_BACKEND_URL;


const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
};
    const value = {
        backendUrl,
        token,        // ✅ make sure this is here
        setToken,
         user, setUser, 
        showLogin,
        setShowLogin,
        logout,
    };

    

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;