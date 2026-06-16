import { useContext } from 'react';
import { Container, Card } from 'react-bootstrap';
import { AdminContext } from '../context/AdminContext';
import Header from '../components/Header';
import Nav from '../components/Nav';
const Dashboard = () => {

    const { admin } = useContext(AdminContext);

    return (
        <>
            <Header />
            <Nav />
            <Container className="mt-4">

                <Card className="shadow">
                    <Card.Header>
                        <h3 className="mb-0">Panel Principal</h3>
                    </Card.Header>

                    <Card.Body>

                        <h4>
                            Bienvenido {admin?.nombre}
                        </h4>

                        <hr />

                        <p>
                            <strong>Rol:</strong> {admin?.rol.charAt(0).toUpperCase() + admin?.rol.slice(1)}
                        </p>
                        
                        <p>
                            Has iniciado sesión correctamente en el sistema.
                        </p>

                    </Card.Body>
                </Card>

            </Container>
        </>
    );
};

export default Dashboard;