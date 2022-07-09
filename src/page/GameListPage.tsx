import {ContainerComponent} from "../components/ContainerComponent";
import {NavbarComponent} from "../components/NavbarComponent";
import {Alert, Button, Card, Col, Form, FormControl, Row} from "react-bootstrap";
import {FooterComponent} from "../components/FooterComponent";

export const GameListPage = () => {
    return (
        <div>
            <div className="d-flex flex-column min-vh-100">
                <NavbarComponent/>
                <ContainerComponent className="py-4">
                    <Alert variant={"info"} style={{margin: "0"}}>
                        <p>Вы уже участвуете в игре</p>
                        <Button variant={"info"}>Переподключиться</Button>
                    </Alert>

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
                                    <Button variant="outline-success">Подключиться</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </ContainerComponent>

                    <ContainerComponent>
                        <Row className="justify-content-md-center row-cols-1">
                            <Col className="my-4">
                                <Card>
                                    <Card.Img variant="top" src="" />
                                    <Card.Body>
                                        <Card.Title>Card Title</Card.Title>
                                        <Card.Text>
                                            Some quick example text to build on the card title and make up the bulk of
                                            the card's content.
                                        </Card.Text>
                                        <Button variant="primary">Go somewhere</Button>
                                    </Card.Body>
                                </Card>

                                <Card className="my-4">
                                    <Card.Img variant="top" src="" />
                                    <Card.Body>
                                        <Card.Title>Card Title</Card.Title>
                                        <Card.Text>
                                            Some quick example text to build on the card title and make up the bulk of
                                            the card's content.
                                        </Card.Text>
                                        <Button variant="primary">Go somewhere</Button>
                                    </Card.Body>
                                </Card>

                                <Card className="my-4">
                                    <Card.Img variant="top" src="" />
                                    <Card.Body>
                                        <Card.Title>Card Title</Card.Title>
                                        <Card.Text>
                                            Some quick example text to build on the card title and make up the bulk of
                                            the card's content.
                                        </Card.Text>
                                        <Button variant="primary">Go somewhere</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </ContainerComponent>
                </ContainerComponent>
            </div>
            <FooterComponent/>
        </div>
    );
}