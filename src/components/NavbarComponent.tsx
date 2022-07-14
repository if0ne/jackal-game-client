import "./NavbarComponent.css";

import {Button, Dropdown, DropdownButton, Nav, Navbar, Spinner} from "react-bootstrap";
import {ContainerComponent} from "./ContainerComponent";
import {useNavigate} from "react-router";

import {useAuth} from "../hook/useAuth";
import {RequiredRoles} from "./RequiredRoles";

export const NavbarComponent = () => {
    const navigate = useNavigate();
    const { user, logOut, isLoading } = useAuth();

    const profileTitle = () => {
        return (
            <span>
                <span><img src={user.pictureUrl} className="navbar-profile-picture mx-2"/></span>
                <span>{user.name}</span>
            </span>
        );
    };

    const navbarButtons = () => {
        if (isLoading) {
            return (
                <Spinner animation={"border"}/>
            );
        } else {
            return (
                <Nav className="me-auto">
                    <RequiredRoles roles={["GUEST"]}>
                        <Button onClick={() => navigate('/login')}>Войти</Button>
                    </RequiredRoles>
                    <RequiredRoles roles={["USER", "ADMIN"]}>
                        <DropdownButton align="end" id="dropdown-basic" variant="light" title={profileTitle()} className="dropdown-profile">
                            <Dropdown.Item href="/profile">Профиль</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={() => logOut(() => {})}>Выйти</Dropdown.Item>
                        </DropdownButton>
                    </RequiredRoles>
                </Nav>
            );
        }
    }

    return (
        <Navbar bg="light" expand="lg">
            <ContainerComponent>
                <Navbar.Brand href="/">JackaL</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/games">Поиск игр</Nav.Link>
                        <Nav.Link href="/rules">Правила</Nav.Link>
                    </Nav>
                    <div className="d-flex">
                        {navbarButtons()}
                    </div>
                </Navbar.Collapse>
            </ContainerComponent>
        </Navbar>
    );
}