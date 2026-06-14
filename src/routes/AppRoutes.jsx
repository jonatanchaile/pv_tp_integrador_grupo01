import { Routes, Route, Navigate } from 'react-router-dom';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import RutaProtegida from './RutaProtegida';

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

            {/* Ruta inexistente */}
            <Route
                path="*"
                element={<Navigate to="/login" replace />}
            />

        </Routes>
    );
};

export default AppRoutes;