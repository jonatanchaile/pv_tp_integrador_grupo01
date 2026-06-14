import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { Navbar, Container, Button } from "react-bootstrap";

const Header = () => {
  const { admin, cerrarSesion } = useContext(AdminContext);
  const navigate = useNavigate();

  const manejarCerrarSesion = () => {
    cerrarSesion();
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Sistema de Gestión de Clientes</Navbar.Brand>

        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="me-3">
            {admin?.nombre} - {admin?.rol}
          </Navbar.Text>

          <Button variant="outline-light" onClick={manejarCerrarSesion}>
            Cerrar Sesión
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;