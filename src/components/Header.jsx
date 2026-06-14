import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';

const Header = () => {

    const { admin, cerrarSesion } = useContext(AdminContext);
    const navigate = useNavigate();

    const manejarCerrarSesion = () => {
        cerrarSesion();
        navigate('/login');
    };

    return (
        <div>
            <span>
                {admin?.nombre} - {admin?.rol}
            </span>

            <button onClick={manejarCerrarSesion}>
                Cerrar Sesión
            </button>
        </div>
    );
};

export default Header;