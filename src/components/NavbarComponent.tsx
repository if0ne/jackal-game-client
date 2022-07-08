import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {ContainerComponent} from "./ContainerComponent";
import {useNavigate} from "react-router";

export const NavbarComponent = () => {

    const navigate = useNavigate();

    return (
        <Navbar bg="light" expand="lg">
            <ContainerComponent>
                <Navbar.Brand href="/">JackaL</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/games">Поиск игр</Nav.Link>
                        <Nav.Link href="#link">Правила</Nav.Link>
                    </Nav>
                    <div className="d-flex">
                        <Nav className="me-auto">
                            <Button onClick={() => navigate('/login')}>Войти</Button>
                        </Nav>
                    </div>
                </Navbar.Collapse>
            </ContainerComponent>
        </Navbar>
    );

}