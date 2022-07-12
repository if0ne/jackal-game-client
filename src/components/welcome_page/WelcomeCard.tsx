import {Card, Col} from "react-bootstrap";
import {useEffect} from "react";

type WelcomeCardProps = {
    title: string,
    picture: string
};

export const WelcomeCard = (props: WelcomeCardProps) => {
    return (
        <Col>
            <Card className="welcome-card">
                <Card.Img variant="top" src={props.picture}/>
                <Card.Body className="welcome-card-body">
                    <Card.Title className="welcome-card-title">{props.title}</Card.Title>
                </Card.Body>
            </Card>
        </Col>
    );
}