import "./WelcomePage.css"
import "bootstrap/dist/css/bootstrap.min.css"

import {Button, Card, Container, Col, Row, Image} from "react-bootstrap"
import {NavbarComponent} from "../components/NavbarComponent";
import {FooterComponent} from "../components/FooterComponent";

// @ts-ignore
import navbarImage from "../assets/test_image.jpg";
import {ContainerComponent} from "../components/ContainerComponent";

export const WelcomePage = () => {

    return (
        <div>
            <div className="d-flex flex-column min-vh-100">
                <NavbarComponent/>
                <div className="main-image">
                    <ContainerComponent>
                        <Image src={navbarImage} fluid={true} className="w-100" style={{ height: "426px" }}/>
                    </ContainerComponent>
                </div>
                <ContainerComponent className="py-4">
                    <Row className="justify-content-md-center row-cols-1 row-cols-md-3 g-4">
                        <Col>
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
                        </Col>
                        <Col>
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
                        </Col>
                        <Col>
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
                        </Col>

                        <Col>
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
                        </Col>
                        <Col>
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
                        </Col>
                        <Col>
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
                        </Col>
                    </Row>
                </ContainerComponent>
            </div>

            <FooterComponent/>
        </div>
    )
}