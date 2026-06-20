import {useAdmin} from '../hooks/useAdmin';
import { Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Nav from '../components/Nav';

const RutaProtegida = ({ children }) => {

    const { admin } = useAdmin();

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