import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import Header from '../components/Header';
import Nav from '../components/Nav';

const RutaProtegida = ({ children }) => {

    const { admin } = useContext(AdminContext);

    if (!admin) {
        return <Navigate to="/login" replace />;
    }

   return (
        <>
            <Header />
            <Nav />
            <main>
                {children}
            </main>
        </>
   )
};

export default RutaProtegida;