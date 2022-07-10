import {Alert, Button} from "react-bootstrap";

export const GameListReconnection = () => {
    return (
        <Alert variant={"info"}>
            <p>Вы уже участвуете в игре</p>
            <Button variant={"info"}>Переподключиться</Button>
        </Alert>
    );
}