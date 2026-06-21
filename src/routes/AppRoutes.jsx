import { createBrowserRouter, Navigate } from 'react-router-dom';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import ListaClientes from '../pages/ListaClientes';
import ClientesNuevos from '../pages/ClientesNuevos';
import ErrorPage from '../pages/ErrorPage';
import DetalleClientes from '../pages/DetalleClientes';
import RutaProtegida from '../components/RutaProtegida';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },

  {
    path: '/login',
    element: <Login />,
  },

  {
    path: '/dashboard',
    element: (
      <RutaProtegida>
        <Dashboard />
      </RutaProtegida>
    ),
  },

  {
    path: '/clientes',
    element: (
      <RutaProtegida>
        <ListaClientes />
      </RutaProtegida>
    ),
  },

  {
    path: '/nuevos',
    element: (
      <RutaProtegida>
        <ClientesNuevos />
      </RutaProtegida>
    ),
  },

  {
    path: '*',
    element: <ErrorPage />,
  }, 

  {
  path: '/clientes/:id',
  element: (
    <RutaProtegida>
      <DetalleClientes />
    </RutaProtegida>
  ),
},

]);

export default routes;