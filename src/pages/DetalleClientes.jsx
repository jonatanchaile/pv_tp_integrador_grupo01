import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Container, Spinner, Alert, Button } from 'react-bootstrap';

import clientesService from '../services/clientesService';
import { AdminContext } from '../context/AdminContext';
import {useNavigate} from 'react-router-dom';
const DetalleClientes = () => {

    const { id } = useParams();

    const { admin } = useContext(AdminContext);
    const navigate = useNavigate();

    const [cliente, setCliente] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const cargarCliente = async () => {

            try {

                const datos = await clientesService.obtenerClientePorId(id);

                setCliente(datos);

            } catch (error) {

                setError(error.message || 'Error al obtener cliente');

            } finally {

                setLoading(false);

            }
        };

        cargarCliente();

    }, [id]);

    const manejarEliminar = async () => {

    const confirmar = window.confirm(
        '¿Desea eliminar este cliente?'
    );

    if (!confirmar) {
        return;
    }

    try {

        await clientesService.eliminarCliente(id);

        alert('Cliente eliminado correctamente');

        navigate('/clientes');

    } catch (error) {

        alert(error.message);

    }
};

    return (
        <Container className="mt-4">

            <h2 className="mb-4 text-center">
                Ficha Completa del Cliente
            </h2>

            {loading && (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            )}

            {error && (
                <Alert variant="danger">
                    {error}
                </Alert>
            )}

            {cliente && (

                <Card className="shadow">

                    <Card.Header>
                        <h3 className="mb-0">
                            {cliente.name.firstname} {cliente.name.lastname}
                        </h3>
                    </Card.Header>

                    <Card.Body>

                        <p>
                            <strong>Email:</strong> {cliente.email}
                        </p>

                        <p>
                            <strong>Teléfono:</strong> {cliente.phone}
                        </p>

                        <hr />

                        <h5>Dirección</h5>

                        <p>
                            <strong>Calle:</strong> {cliente.address.street}
                        </p>

                        <p>
                            <strong>Número:</strong> {cliente.address.number}
                        </p>

                        <p>
                            <strong>Código Postal:</strong> {cliente.address.zipcode}
                        </p>

                        <p>
                            <strong>Ciudad:</strong> {cliente.address.city}
                        </p>

                        <hr />

                        <h5>Datos de Acceso</h5>

                        <p>
                            <strong>Usuario:</strong> {cliente.username}
                        </p>

                        <p>
                            <strong>Contraseña:</strong> {cliente.password}
                        </p>

                        {admin?.rol === 'gerencia' && (
                            <>
                                <hr />

                                <Button variant="danger"
                                    onClick={manejarEliminar} 
                                >
                                    Eliminar Cliente de la Base de Datos
                                </Button>
                            </>
                        )}

                    </Card.Body>

                </Card>

            )}

        </Container>
    );
};

export default DetalleClientes;