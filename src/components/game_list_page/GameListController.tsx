import {Button, Card, Form, FormControl} from "react-bootstrap";
import {ContainerComponent} from "../ContainerComponent";

export const GameListController = () => {
    return (
        <ContainerComponent className="mt-4">
            <Card>
                <Card.Body>
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="ID"
                            className="me-2"
                            aria-label="ID"
                        />
                        <FormControl
                            type="password"
                            placeholder="Пароль"
                            className="me-2"
                            aria-label="ID"
                            autoComplete="off"
                        />
                        <Button variant="success">Подключиться</Button>
                        <Button variant="dark" className="ms-2">Обновить</Button>
                    </Form>
                </Card.Body>
            </Card>
        </ContainerComponent>
    );
}