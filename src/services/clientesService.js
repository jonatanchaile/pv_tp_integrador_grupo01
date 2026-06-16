const clientesService = (() =>{
    
    const API_URL = 'https://fakestoreapi.com/users';

    const obtenerClientes = async ()  =>{
        const response = await fetch(API_URL);

        if (!response.ok){
            throw new Error(`Error al conectar con el servidor: ${response.status}`);
        }
        const clientes = await response.json();
        return [...clientes];
    }

    return {
        obtenerClientes
    }
})();

export default clientesService;