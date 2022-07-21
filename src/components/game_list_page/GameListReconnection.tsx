import {Alert, Button} from "react-bootstrap";
import {useNavigate} from "react-router";

export const GameListReconnection = () => {

    const navigate = useNavigate();

    return (
        <Alert variant={"info"}>
            <p>Вы уже участвуете в игре</p>
            <Button variant={"info"} onClick={() => navigate("/game")}>Переподключиться</Button>
        </Alert>
    );
}