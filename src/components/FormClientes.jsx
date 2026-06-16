import { useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";

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

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    const nivel = name.split(".");
    setFormulario((prev) => {
      // Nivel 1 (ej: email, phone)
      if (nivel.length === 1) {
        return { ...prev, [name]: value };
      }
      // Nivel 2 (ej: name.firstname, address.city)
      else if (nivel.length === 2) {
        return {
          ...prev,
          [nivel[0]]: {
            ...prev[nivel[0]],
            [nivel[1]]: value,
          },
        };
      }
      // Nivel 3 (ej: address.geolocation.lat)
      else if (nivel.length === 3) {
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
    e.preventDefault();
    // Llamamos a la función que pasaste por props y le mandamos el estado final
    agregarUsuario(formulario);
  };

  return (
    <Card className="shadow p-4 mb-5">
      <h3 className="mb-4 text-primary">Registrar Nuevo Cliente</h3>
      <Form onSubmit={manejarEnvio}>
        {/* --- DATOS DE LA CUENTA --- */}
        <h5 className="mb-3 text-secondary">Datos de la Cuenta</h5>
        <Row className="mb-3">
          <Form.Group as={Col} md="6">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="pepito@gmail.com"
              value={formulario.email}
              onChange={manejarCambio}
              required
            />
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Nombre de Usuario</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="johnd"
              value={formulario.username}
              onChange={manejarCambio}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col} md="6">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formulario.password}
              onChange={manejarCambio}
              required
            />
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              placeholder="+54 388 4154283"
              value={formulario.phone}
              onChange={manejarCambio}
              required
            />
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
              required
            />
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              name="name.lastname"
              placeholder="Perez Ibarra"
              value={formulario.name.lastname}
              onChange={manejarCambio}
              required
            />
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
              value={formulario.address.city}
              onChange={manejarCambio}
              required
            />
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Calle</Form.Label>
            <Form.Control
              type="text"
              name="address.street"
              value={formulario.address.street}
              onChange={manejarCambio}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col} md="6">
            <Form.Label>Número</Form.Label>
            <Form.Control
              type="number"
              name="address.number"
              value={formulario.address.number}
              onChange={manejarCambio}
              required
            />
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Código Postal</Form.Label>
            <Form.Control
              type="text"
              name="address.zipcode"
              value={formulario.address.zipcode}
              onChange={manejarCambio}
              required
            />
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
              value={formulario.address.geolocation.lat}
              onChange={manejarCambio}
            />
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Longitud</Form.Label>
            <Form.Control
              type="text"
              name="address.geolocation.long"
              value={formulario.address.geolocation.long}
              onChange={manejarCambio}
            />
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
