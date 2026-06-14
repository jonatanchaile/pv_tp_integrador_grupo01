import { createContext, useState, useEffect } from 'react';


export const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
    // Al iniciar busca si hay sesión en localStorage. Si no, arranca en null
    const [admin, setAdmin] = useState(() => {
        const sesionGuardada = localStorage.getItem('admin_sesion');
        return sesionGuardada ? JSON.parse(sesionGuardada) : null;
    });

    // Controla y sincroniza el localStorage en tiempo real
    useEffect(() => {
        // if (admin) significa: "Si el estado admin tiene datos de un usuario..."
        if (admin) {
            // Guardamos los datos transformados en texto plano
            localStorage.setItem('admin_sesion', JSON.stringify(admin));
        } else {
            // Si admin es null (porque cerraron sesión), borramos el cajón del navegador
            localStorage.removeItem('admin_sesion');
        }
    }, [admin]); // Se ejecuta cada vez que el estado 'admin' cambia

    
    const guardarSesion = (datosAdmin) => setAdmin(datosAdmin);
    const cerrarSesion  = () => setAdmin(null);

    return (
        <AdminContext.Provider value={{ admin, guardarSesion, cerrarSesion }}>
            {children}
        </AdminContext.Provider>
    );
};