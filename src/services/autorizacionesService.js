import usuarios from '../data/usuariosService';

const autorizacionesService = (() => {
    
    const login = (nombre, rol, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // 1. Buscamos al usuario únicamente por el nombre
                const usuarioEncontrado = usuarios.find(u => u.nombre === nombre);

                // Si no se encuentra el usuario, cortamos la ejecución y enviamos el error específico
                if (!usuarioEncontrado) {
                    return reject(new Error('El usuario ingresado no existe'));
                }

                // 2. Si el usuario existe, verificamos que la contraseña coincida
                if (usuarioEncontrado.password !== password) {
                    return reject(new Error('Contraseña incorrecta'));
                }

                // 3. Si la contraseña es correcta, verificamos el rol
                if (usuarioEncontrado.rol !== rol) {
                    return reject(new Error('El rol seleccionado no corresponde a este usuario'));
                }

                // 4. Si pasa todas las validaciones anteriores, el login es exitoso
                resolve({ nombre: usuarioEncontrado.nombre, rol: usuarioEncontrado.rol });
                
            }, 800);
        });
    };
    
    return { login };
})();

export default autorizacionesService;