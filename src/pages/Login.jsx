import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import autorizacionesService from '../Services/autorizacionesService';

const Login = () => {

    const [form, setForm] = useState({nombre: '',rol: ''});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [erroresCampo, setErroresCampo] = useState({});
    const { guardarSesion } = useAutorizaciones();
    const navigate = useNavigate();

    const manejarCambio = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({...prev,[name]: value}));

        if (erroresCampo[name]) {
            setErroresCampo((prev) => ({...prev,[name]: null}));
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
            const admin = await autorizacionesService.login(form.nombre,form.rol);

            guardarSesion(admin);

            navigate('/dashboard');

        } catch (err) {

            setError(err.message);

        } finally {

            setLoading(false);

        }
    };

    const formularioIncompleto =!form.nombre.trim() ||!form.rol;

    return (
        <Container className="mt-5">

            <Card
                className="mx-auto shadow"
                style={{ maxWidth: '450px' }}
            >

                <Card.Header>
                    <h2 className="text-center m-0">
                        Iniciar Sesión
                    </h2>
                </Card.Header>

                <Card.Body>

                    {error && (
                        <Alert variant="danger">
                            {error}
                        </Alert>
                    )}

                    <Form onSubmit={manejarEnvio}>

                        <Form.Group className="mb-3">

                            <Form.Label>
                                Nombre del Administrador
                            </Form.Label>

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

                        <Form.Group className="mb-4">

                            <Form.Label>
                                Sector
                            </Form.Label>

                            <Form.Select
                                name="sector"
                                value={form.rol}
                                onChange={manejarCambio}
                                isInvalid={!!erroresCampo.rol}
                            >
                                <option value="">
                                    Seleccione un sector
                                </option>

                                <option value="soporte">
                                    Soporte
                                </option>

                                <option value="gerencia">
                                    Gerencia
                                </option>

                            </Form.Select>

                            <Form.Control.Feedback type="invalid">
                                {erroresCampo.rol}
                            </Form.Control.Feedback>

                        </Form.Group>

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