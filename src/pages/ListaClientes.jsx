import { useState, useEffect } from "react";
import { Spinner, Alert, Form } from "react-bootstrap";
import ClienteCard from "../components/ClientesCards.jsx";
import clientesService from "../services/clientesService.js";

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState("");

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

    const clientesFiltrados = clientes.filter((cliente) => {
    const textoBuscado = busqueda.toLowerCase();

    // Accedemos de forma segura a las propiedades anidadas usando el Optional Chaining (?)
    const apellido = cliente.name?.lastname?.toLowerCase() || "";
    const ciudad = cliente.address?.city?.toLowerCase() || "";

    return apellido.includes(textoBuscado) || ciudad.includes(textoBuscado);
  });

  return (
    <div className="container mt-4 mb-5">
      <h2 className="text-center mb-5">Directorio de Clientes</h2>

      <Form.Group className="mb-4 text-center">
        <Form.Control
          type="text"
          placeholder="Buscar por apellido o ciudad..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="mx-auto shadow-sm"
          style={{ maxWidth: "500px" }}
        />
      </Form.Group>

      {/* Estado 1: Carga */}
      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" role="status" />
          <p className="mt-3 text-muted">
            Cargando base de datos desde el servidor...
          </p>
        </div>
      )}

      {/* Estado 2: Error */}
      {error && !loading && (
        <Alert variant="danger" className="text-center shadow-sm">
          {error}
        </Alert>
      )}

      {/* Estado 3: Éxito (Mapeo de Tarjetas) */}
      {!loading &&
        !error &&
        (clientes.length === 0 ? (
          // Caso A: La base de datos está vacía (por ejemplo, si se eliminaron todos)
          <p className="text-center mt-5 text-muted">
            No hay clientes registrados en este momento.
          </p>
        ) : clientesFiltrados.length === 0 ? (
          // Caso B: Sí hay clientes, pero ninguno coincide con lo que se escribió en la barra
          <p className="text-center mt-5 text-muted">
            No se encontraron clientes con esa búsqueda.
          </p>
        ) : (
          // Caso C: Hay clientes y coinciden con la búsqueda (o el buscador está vacío)
          <section className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {clientesFiltrados.map((cliente) => (
              <div className="col" key={cliente.id}>
                <ClienteCard cliente={cliente} />
              </div>
            ))}
          </section>
        ))}
    </div>
  );
};

export default ListaClientes;