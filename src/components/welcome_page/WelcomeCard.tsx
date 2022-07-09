import {Card, Col} from "react-bootstrap";

type WelcomeCardProps = {
    title: string,
    text: string,
    picture: any
};

export const WelcomeCard = (props: WelcomeCardProps) => {
    return (
        <Col>
            <Card className="welcome-card">
                <Card.Img variant="top" src={props.picture}/>
                <Card.Body className="welcome-card-body">
                    <Card.Title className="welcome-card-title">{props.title}</Card.Title>
                    <Card.Text>{props.text}</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
}