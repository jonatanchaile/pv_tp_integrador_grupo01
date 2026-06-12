import { createContext, useContext, useState } from 'react';

export const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {

    const [admin, setAdmin] = useState(null);

    const guardarSesion = (admin) => setAdmin(admin);
    const cerrarSesion  = () => setAdmin(null);

    return (
        <AutorizacionesContext.Provider value={{ admin, guardarSesion, cerrarSesion }}>
            {children}
        </AutorizacionesContext.Provider>
    );
};