import { Card, Button, CardBody } from "react-bootstrap";

const ClienteCard = ({ cliente }) => {
  const { id, name, email, phone, address } = cliente;

  return (
    <Card className="tarjeta shadow-sm h-100">
      <CardBody className="d-flex flex-column align-items-center text-center w-100 h-100">
        <Card.Title as="h3" className="mb-3 text-capitalize text-primary">
          {name.firstname} {name.lastname}
        </Card.Title>
        
        <Card.Text className="mb-2">
          <strong>ID:</strong> {id}
        </Card.Text>

        <Card.Text className="mb-2">
          <strong>Email:</strong> {email}
        </Card.Text>
        
        <Card.Text className="mb-2">
          <strong>Teléfono:</strong> {phone}
        </Card.Text>

        <Card.Text className="mb-4">
          <strong>Ciudad:</strong> <span className="text-capitalize">{address.city}</span>
        </Card.Text>
        
        {/* Botones listos visualmente para futuras implementaciones */}
        <div className="d-flex flex-column gap-3 mt-auto w-100">
            <Button variant="outline-info">
                Eliminar
            </Button>
        
            <Button variant="primary" className="boton-accion">
                Ver Detalle
            </Button>
        </div>
        
      </CardBody>
    </Card>
  );
};

export default ClienteCard;