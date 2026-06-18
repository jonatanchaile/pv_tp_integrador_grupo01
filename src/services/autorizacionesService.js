import usuarios from '../data/usuariosService';

const autorizacionesService = ( () => {
    
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