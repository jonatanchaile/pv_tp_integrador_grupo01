import { Nav as BootstrapNav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Nav = () => {
    return (
        <div className="bg-light border-bottom mb-4">
            <Container>
                <BootstrapNav variant="tabs" className="pt-3">
                    <BootstrapNav.Item>
                        <BootstrapNav.Link as={NavLink} to="/dashboard">
                            Panel Principal
                        </BootstrapNav.Link>
                    </BootstrapNav.Item>
                     <BootstrapNav.Item>
                        <BootstrapNav.Link as={NavLink} to="/clientes">
                            Gestión de Clientes
                        </BootstrapNav.Link>
                    </BootstrapNav.Item>
                     <BootstrapNav.Item>
                        <BootstrapNav.Link as={NavLink} to="/nuevos">
                            Agregar Clientes
                        </BootstrapNav.Link>
                    </BootstrapNav.Item>
                </BootstrapNav>
            </Container>
        </div>
    )
};

export default Nav;
