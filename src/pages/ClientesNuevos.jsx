import { Container, Card } from 'react-bootstrap';
import FormClientes from '../components/FormClientes';

const ClientesNuevos = () => {
    // Función síncrona básica: solo recibe y muestra lo que capturó el formulario
    const handleAgregarUsuario = (datosDelFormulario) => {
        console.log("¡Éxito! Datos capturados por el formulario:", datosDelFormulario);
        alert("Formulario enviado. Abre la consola (F12) para ver el objeto generado.");
    };
    return (
        <Container className="mt-4">
            <Card className="shadow">
                <Card.Header>
                    <h3 className="mb-0">Alta de Cliente</h3>
                </Card.Header>

                <Card.Body>
                    <FormClientes agregarUsuario={handleAgregarUsuario} />
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ClientesNuevos;