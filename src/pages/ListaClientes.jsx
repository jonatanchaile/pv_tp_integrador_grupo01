import { useState, useEffect } from "react";
import { Spinner, Alert } from "react-bootstrap";
import ClienteCard from "../components/ClientesCards.jsx";
import clientesService from "../services/clientesService.js";

const ListaClientes = () => {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Carga directa de datos al entrar a la pantalla
    useEffect(() => {
        const cargarClientes = async () => {
            try {
                const datos = await clientesService.obtenerClientes();
                setClientes(datos);
            } catch (error) {
                setError(error.message || "Error al obtener la lista de clientes.");
            } finally {
                setLoading(false);
            }
        };
        
        cargarClientes();
    }, []);

    return (
        <div className="container mt-4 mb-5">
            <h2 className="text-center mb-5">Directorio de Clientes</h2>

            {/* Estado 1: Carga */}
            {loading && (
                <div className="text-center my-5">
                    <Spinner animation="border" variant="primary" role="status" />
                    <p className="mt-3 text-muted">Cargando base de datos desde el servidor...</p>
                </div>
            )}

            {/* Estado 2: Error */}
            {error && !loading && (
                <Alert variant="danger" className="text-center shadow-sm">
                    {error}
                </Alert>
            )}

            {/* Estado 3: Éxito (Mapeo de Tarjetas) */}
            {!loading && !error && clientes.length === 0 ? (
                <p className="text-center mt-5 text-muted">No hay clientes registrados en este momento.</p>
            ) : (
                <section className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {!loading && !error && clientes.map((cliente) => (
                        <div className="col" key={cliente.id}>
                            <ClienteCard cliente={cliente} />
                        </div>
                    ))}
                </section>
            )}
        </div>
    );
};

export default ListaClientes;