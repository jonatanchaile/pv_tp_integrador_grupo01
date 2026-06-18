import React from 'react';
import ReactDOM from 'react-dom/client';

import { RouterProvider } from 'react-router-dom';

import AppRoutes from './routes/AppRoutes';

import { AdminProvider } from './context/AdminContext';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AdminProvider>
      <RouterProvider router={AppRoutes} />
    </AdminProvider>
  </React.StrictMode>
);