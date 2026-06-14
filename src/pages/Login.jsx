import { useState, useContext } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { AdminContext } from '../context/AdminContext'; 
import autorizacionesService from '../Services/autorizacionesService';

const Login = () => {
    
    const [form, setForm] = useState({ nombre: '', rol: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [erroresCampo, setErroresCampo] = useState({});
    
    // Consumimos el contexto
    const { guardarSesion } = useContext(AdminContext);
    const navigate = useNavigate();

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));

        if (erroresCampo[name]) {
            setErroresCampo((prev) => ({ ...prev, [name]: null }));
        }
    };

    const validarForm = ({ nombre, rol }) => {
        const errores = {};
        if (!nombre.trim()) {
            errores.nombre = 'El nombre es obligatorio';
        }

        if (!rol) {
            errores.rol = 'Debe seleccionar un rol';
        }

        return errores;
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();
        setError(null);

        const errores = validarForm(form);
        if (Object.keys(errores).length > 0) {
            setErroresCampo(errores);
            return;
        }

        setLoading(true);

        try {
            // Se mandan nombre y rol al servicio simulado
            const adminData = await autorizacionesService.login(form.nombre, form.rol);

            // Guardamos en el estado global (se activa el useEffect y va al localStorage)
            guardarSesion(adminData);

            
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    // si falta rellenar algún campo
    const formularioIncompleto = !form.nombre.trim() || !form.rol;

    return (
        <Container className="mt-5">
            <Card className="mx-auto shadow" style={{ maxWidth: '450px' }}>
                <Card.Header>
                    <h2 className="text-center m-0">Iniciar Sesión</h2>
                </Card.Header>

                <Card.Body>
                    {error && (
                        <Alert variant="danger" className="text-center">
                            {error}
                        </Alert>
                    )}

                    <Form onSubmit={manejarEnvio}>
                        {/* Campo Nombre del Administrador */}
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre del Administrador</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                value={form.nombre}
                                onChange={manejarCambio}
                                isInvalid={!!erroresCampo.nombre}
                                placeholder="Ingrese su nombre"
                            />
                            <Form.Control.Feedback type="invalid">
                                {erroresCampo.nombre}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Campo Rol */}
                        <Form.Group className="mb-4">
                            <Form.Label>Rol / Sector</Form.Label>
                            <Form.Select
                                name="rol"
                                value={form.rol}
                                onChange={manejarCambio}
                                isInvalid={!!erroresCampo.rol}
                            >
                                <option value="">Seleccione una opción</option>
                                <option value="soporte">Soporte</option>
                                <option value="gerencia">Gerencia</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {erroresCampo.rol}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Botón Ingresar */}
                        <Button
                            type="submit"
                            variant="primary"
                            className="w-100"
                            disabled={loading || formularioIncompleto}
                        >
                            {loading ? (
                                <>
                                    <Spinner
                                        animation="border"
                                        size="sm"
                                        className="me-2"
                                    />
                                    Verificando...
                                </>
                            ) : (
                                'Ingresar'
                            )}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Login;