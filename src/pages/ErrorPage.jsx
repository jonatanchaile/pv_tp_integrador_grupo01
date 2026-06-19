import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <Container 
            className="d-flex flex-column justify-content-center align-items-center text-center" 
            style={{ minHeight: "80vh" }}
        >
            {/* Título gigante del error */}
            <h1 className="display-1 fw-bold text-danger">404</h1>
            
            {/* Mensaje amigable */}
            <h2 className="mb-3">¡Ups! Página no encontrada</h2>
            <p className="text-muted mb-5" style={{ maxWidth: "500px" }}>
                Parece que la ruta que estás buscando no existe, fue movida a otro lugar o simplemente te perdiste navegando.
            </p>
            
            {/* Botón de rescate */}
            <Button 
                variant="primary" 
                size="lg" 
                className="px-4 shadow-sm"
                onClick={() => navigate("/dashboard")} // Cambia esto por la ruta principal de tu app
            >
                Volver
            </Button>
        </Container>
    );
};


export default ErrorPage;