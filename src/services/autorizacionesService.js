const autorizacionesService = ( () => {
    const usuarios = [
        {id: 1, nombre: 'Facundo', user: 'facu@gmail.com', password: 'facu1', rol:'soporte'},
        {id: 2, nombre: 'Jonatan', user: 'jonatan@gmail.com', password: 'jona2', rol:'gerencia'},
        {id: 3, nombre: 'Alejandro', user: 'ale@gmail.com', password: 'ale3', rol:'soporte'},
        {id: 4, nombre: 'Franco', user: 'franco@gmail.com', password: 'franco4', rol:'gerencia'},
        {id: 5, nombre: 'Leandro', user: 'leandro@gmail.com', password: 'leandro5', rol:'gerencia'}
    ]
  
    const login = (nombre, rol) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const encontrado = usuarios.find (
                    u => u.nombre === nombre && u.rol === rol
                );
                if (encontrado) {
                    resolve ({ nombre: encontrado.nombre,rol: encontrado.rol});
                } else {
                    reject (new Error ('Nombre o rol incorrecto'))
                }
            }, 800);
        });
    };
    return { login };
})();

export default autorizacionesService; 