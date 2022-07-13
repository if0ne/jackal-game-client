import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {ContainerComponent} from "./ContainerComponent";
import {useNavigate} from "react-router";
import {useAuth} from "../hook/useAuth";

export const NavbarComponent = () => {

    const navigate = useNavigate();
    const { user, logOut } = useAuth();

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
                            {
                                user.role === "GUEST" &&
                                <Button onClick={() => navigate('/login')}>Войти</Button>
                            }
                            {
                                user.role !== "GUEST" &&
                                <div>
                                    <span>{user.name}</span>
                                    <Button onClick={() => logOut(() => {})}>Выйти</Button>
                                </div>
                            }
                        </Nav>
                    </div>
                </Navbar.Collapse>
            </ContainerComponent>
        </Navbar>
    );

}