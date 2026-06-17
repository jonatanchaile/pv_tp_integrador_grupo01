import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'sans-serif' }}>
            <h1 style={{ fontSize: '72px', margin: '0', color: '#ff4d4d' }}>404</h1>
            <h2>¡Ups! Página no encontrada</h2>
            <p>La página que estás buscando no existe o fue movida.</p>
            <button 
                onClick={() => navigate('/dashboard')} 
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    marginTop: '20px'
                }}
            >
                Volver
            </button>
        </div>
    );
};

export default NotFound;