import { useState } from "react";
import { Form, Button, Row, Col, Card, InputGroup } from "react-bootstrap";
import { BsEye, BsEyeSlash } from "react-icons/bs"; // Importamos los íconos del ojito

const FormClientes = ({ agregarUsuario }) => {
  const [formulario, setFormulario] = useState({
    email: "",
    username: "",
    password: "",
    phone: "",
    name: {
      firstname: "",
      lastname: "",
    },
    address: {
      city: "",
      street: "",
      number: "",
      zipcode: "",
      geolocation: {
        lat: "",
        long: "",
      },
    },
  });

  const [validated, setValidated] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    const nivel = name.split(".");
    
    setFormulario((prev) => {
      if (nivel.length === 1) {
        return { ...prev, [name]: value };
      } else if (nivel.length === 2) {
        return {
          ...prev,
          [nivel[0]]: {
            ...prev[nivel[0]],
            [nivel[1]]: value,
          },
        };
      } else if (nivel.length === 3) {
        return {
          ...prev,
          [nivel[0]]: {
            ...prev[nivel[0]],
            [nivel[1]]: {
              ...prev[nivel[0]][nivel[1]],
              [nivel[2]]: value,
            },
          },
        };
      }
      return prev;
    });
  };

  const manejarEnvio = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      agregarUsuario(formulario);
    }
    setValidated(true);
  };

  return (
    <Card className="shadow p-4 mb-5">
      <h3 className="mb-4 text-primary">Registrar Nuevo Cliente</h3>
      
      <Form noValidate validated={validated} onSubmit={manejarEnvio}>
        
        {/* --- DATOS DE LA CUENTA --- */}
        <h5 className="mb-3 text-secondary">Datos de la Cuenta</h5>
        <Row className="mb-3">
          <Form.Group as={Col} md="6">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="pepito.perez@gmail.com"
              value={formulario.email}
              onChange={manejarCambio}
              required
            />
            <Form.Control.Feedback type="invalid">
              Por favor, ingresa un correo electrónico válido (ej. usuario@correo.com).
            </Form.Control.Feedback>
          </Form.Group>
          
          <Form.Group as={Col} md="6">
            <Form.Label>Nombre de Usuario</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="pepito_admin"
              value={formulario.username}
              onChange={manejarCambio}
              pattern="^[a-z0-9_]+$"
              minLength="4" // Exigimos al menos 4 caracteres
              required
            />
            <Form.Control.Feedback type="invalid">
              Debe tener al menos 4 caracteres (solo minúsculas, números y guiones bajos).
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        
        <Row className="mb-4">
          {/* CAMPO DE CONTRASEÑA CON BOTÓN DE VISIBILIDAD */}
          <Form.Group as={Col} md="6">
            <Form.Label>Contraseña</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type={mostrarPassword ? "text" : "password"} // Cambia dinámicamente
                name="password"
                placeholder="••••••••"
                value={formulario.password}
                onChange={manejarCambio}
                minLength="6"
                required
              />
              <Button 
                variant="outline-secondary" 
                onClick={() => setMostrarPassword(!mostrarPassword)}
              >
                {/* Mostramos un ícono distinto según el estado */}
                {mostrarPassword ? <BsEyeSlash /> : <BsEye />}
              </Button>
              <Form.Control.Feedback type="invalid">
                La contraseña debe tener al menos 6 caracteres.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          
          <Form.Group as={Col} md="6">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              placeholder="+54 388 4154283"
              value={formulario.phone}
              onChange={manejarCambio}
              pattern="^\+?[0-9\s\-]{10,16}$"
              required
            />
            <Form.Control.Feedback type="invalid">
              Ingresa un teléfono válido (entre 10 y 16 caracteres permitidos).
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        {/* --- DATOS PERSONALES --- */}
        <h5 className="mb-3 text-secondary">Datos Personales</h5>
        <Row className="mb-4">
          <Form.Group as={Col} md="6">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="name.firstname"
              placeholder="Marcelo"
              value={formulario.name.firstname}
              onChange={manejarCambio}
              pattern="^[a-zA-ZÀ-ÿ\s]+$"
              minLength="3" // Mínimo 3 letras
              required
            />
            <Form.Control.Feedback type="invalid">
              Ingresa un nombre válido.
            </Form.Control.Feedback>
          </Form.Group>
          
          <Form.Group as={Col} md="6">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              name="name.lastname"
              placeholder="Pérez Ibarra"
              value={formulario.name.lastname}
              onChange={manejarCambio}
              pattern="^[a-zA-ZÀ-ÿ\s]+$"
              minLength="3" // Mínimo 3 letras
              required
            />
            <Form.Control.Feedback type="invalid">
              Ingresa un apellido válido.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        {/* --- DIRECCIÓN --- */}
        <h5 className="mb-3 text-secondary">Dirección</h5>
        <Row className="mb-3">
          <Form.Group as={Col} md="6">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control
              type="text"
              name="address.city"
              placeholder="San Salvador"
              value={formulario.address.city}
              onChange={manejarCambio}
              pattern="^[0-9\s\.,]*[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ0-9\s\.,]*$"
              minLength="4" 
              required
            />
            <Form.Control.Feedback type="invalid">
              Ingresa una ciudad válida.
            </Form.Control.Feedback>
          </Form.Group>
          
          <Form.Group as={Col} md="6">
            <Form.Label>Calle</Form.Label>
            <Form.Control
              type="text"
              name="address.street"
              placeholder="Av. Belgrano"
              value={formulario.address.street}
              onChange={manejarCambio}
              pattern="^[0-9\s\.,]*[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ0-9\s\.,]*$"
              minLength="4" 
              required
            />
            <Form.Control.Feedback type="invalid">
              Ingresa un nombre de calle válido.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        
        <Row className="mb-4">
          <Form.Group as={Col} md="6">
            <Form.Label>Número</Form.Label>
            <Form.Control
              type="number"
              name="address.number"
              placeholder="123"
              value={formulario.address.number}
              onChange={manejarCambio}
              min="1"
              required
            />
            <Form.Control.Feedback type="invalid">
              Debe ser un número válido mayor a 0.
            </Form.Control.Feedback>
          </Form.Group>
          
          <Form.Group as={Col} md="6">
            <Form.Label>Código Postal</Form.Label>
            <Form.Control
              type="text"
              name="address.zipcode"
              placeholder="4608"
              value={formulario.address.zipcode}
              onChange={manejarCambio}
              pattern="^[0-9]{4}$"
              required
            />
            <Form.Control.Feedback type="invalid">
              El código postal debe tener exactamente 4 números.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        {/* --- GEOLOCALIZACIÓN --- */}
        <h5 className="mb-3 text-secondary">Geolocalización (Opcional)</h5>
        <Row className="mb-4">
          <Form.Group as={Col} md="6">
            <Form.Label>Latitud</Form.Label>
            <Form.Control
              type="text"
              name="address.geolocation.lat"
              placeholder="-24.383"
              value={formulario.address.geolocation.lat}
              onChange={manejarCambio}
              pattern="^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$"
            />
            <Form.Control.Feedback type="invalid">
              Formato de latitud inválido (ej. -24.383).
            </Form.Control.Feedback>
          </Form.Group>
          
          <Form.Group as={Col} md="6">
            <Form.Label>Longitud</Form.Label>
            <Form.Control
              type="text"
              name="address.geolocation.long"
              placeholder="-65.116"
              value={formulario.address.geolocation.long}
              onChange={manejarCambio}
              pattern="^-?([1]?[1-7][1-9]|[1]?[1-8][0]|[1-9]?[0-9])\.{1}\d{1,6}$"
            />
            <Form.Control.Feedback type="invalid">
              Formato de longitud inválido (ej. -65.116).
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        {/* BOTÓN DE ENVÍO */}
        <div className="d-flex justify-content-end mt-4">
          <Button variant="success" type="submit" className="px-5">
            Guardar Cliente
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default FormClientes;