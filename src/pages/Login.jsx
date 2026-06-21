import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert, Spinner, InputGroup } from 'react-bootstrap';
import { useAdmin } from '../hooks/useAdmin';
import autorizacionesService from '../Services/autorizacionesService';
// Importamos los íconos para el botón de la contraseña
import { BsEye, BsEyeSlash } from 'react-icons/bs';

const Login = () => {
    
    const [form, setForm] = useState({ nombre: '', rol: '', password: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [erroresCampo, setErroresCampo] = useState({});
    
    const [mostrarPassword, setMostrarPassword] = useState(false);
    
    // Consumimos el contexto
    const { guardarSesion } = useAdmin();
    const navigate = useNavigate();

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));

        if (erroresCampo[name]) {
            setErroresCampo((prev) => ({ ...prev, [name]: null }));
        }
    };

    const validarForm = ({ nombre, rol, password }) => {
        const errores = {};
        if (!nombre.trim()) {
            errores.nombre = 'El nombre es obligatorio';
        }

        if (!password.trim()) {
            errores.password = 'La contraseña es obligatoria';
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
            // Se mandan nombre, rol y contraseña al servicio simulado
            const adminData = await autorizacionesService.login(form.nombre, form.rol, form.password);

            // Guardamos en el estado global (se activa el useEffect y va al localStorage)
            guardarSesion(adminData);
            
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

   

    return (
        <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Card className="shadow w-100" style={{ maxWidth: '450px' }}>
                <Card.Header>
                    <h2 className="text-center m-0">Iniciar Sesión</h2>
                </Card.Header>

                <Card.Body>
                    {error && (
                        <Alert variant="danger" className="text-center">
                            {error}
                        </Alert>
                    )}

                    <Form onSubmit={manejarEnvio} noValidate> 
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

                        {/* Campo contraseña con el botón del ojito */}
                        <Form.Group className="mb-3">
                            <Form.Label>Contraseña</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type={mostrarPassword ? "text" : "password"}
                                    name="password"
                                    value={form.password}
                                    onChange={manejarCambio}
                                    isInvalid={!!erroresCampo.password}
                                    placeholder="Ingrese su contraseña"
                                />
                                <Button 
                                    variant="outline-secondary" 
                                    onClick={() => setMostrarPassword(!mostrarPassword)}
                                >
                                    {mostrarPassword ? <BsEyeSlash /> : <BsEye />}
                                </Button>
                                <Form.Control.Feedback type="invalid">
                                    {erroresCampo.password}
                                </Form.Control.Feedback>
                            </InputGroup>
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
                                <option value="" disabled hidden>Seleccione un rol</option>
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
                            disabled={loading}
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