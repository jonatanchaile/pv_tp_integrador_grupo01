const clientesService = (() => {

    const API_URL = 'https://fakestoreapi.com/users';

    const obtenerClientes = async () => {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Error al conectar con el servidor: ${response.status}`);
        }

        const clientes = await response.json();

        return [...clientes];
    };

    const obtenerClientePorId = async (id) => {

        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
            throw new Error(`Error al obtener cliente: ${response.status}`);
        }

        return await response.json();
    };

    const eliminarCliente = async (id) => {

        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar cliente: ${response.status}`);
        }

        return await response.json();
    };

    return {
        obtenerClientes,
        obtenerClientePorId,
        eliminarCliente
    };

})();

export default clientesService;