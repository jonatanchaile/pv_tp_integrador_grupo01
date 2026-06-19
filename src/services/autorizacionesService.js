import usuarios from '../data/usuariosService';

const autorizacionesService = ( () => {
    
    const login = (nombre, rol,password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const encontrado = usuarios.find (
                    u => u.nombre === nombre && u.rol === rol && u.password === password
                );
                if (encontrado) {
                    resolve ({ nombre: encontrado.nombre,rol: encontrado.rol});
                } else {
                    reject (new Error ('Nombre o rol o contraseña incorrecto'))
                }
            }, 800);
        });
    };
    return { login };
})();

export default autorizacionesService; 