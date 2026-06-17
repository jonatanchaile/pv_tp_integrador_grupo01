import { Routes, Route, Navigate } from 'react-router-dom';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import RutaProtegida from './RutaProtegida';
import ListaClientes from '../pages/ListaClientes'
import NotFound from '../pages/NotFound'; 
import ClientesNuevos from '../pages/ClientesNuevos'
const AppRoutes = () => {
    return (
        <Routes>

            {/* Redirección inicial */}
            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />

            {/* Login */}
            <Route
                path="/login"
                element={<Login />}
            />

            {/* Dashboard protegido */}
            <Route
                path="/dashboard"
                element={
                    <RutaProtegida>
                        <Dashboard />
                    </RutaProtegida>
                }
            />

            {/* Lista Clientes protegida */}
            <Route
                path='/clientes'
                element={
                    <RutaProtegida>
                        <ListaClientes />
                    </RutaProtegida>
                }
            />

            {/* Nuevos Clientes */}
            <Route
                path='/nuevos'
                element={
                    <RutaProtegida>
                        <ClientesNuevos />
                    </RutaProtegida>
                }
            />    
            {/* Ruta inexistente */}
            <Route
                path="*"
              element={<NotFound />} // 
            />
              
            
            
            

        </Routes>
    );
};

export default AppRoutes;