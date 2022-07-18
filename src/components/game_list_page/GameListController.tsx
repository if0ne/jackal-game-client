import {Button, Card, Form, FormControl} from "react-bootstrap";
import {ContainerComponent} from "../ContainerComponent";
import {useState} from "react";
import {WsLobby} from "../models/WsLobby";

type GameListControllerProps = {
    joinFunction: (title: string, password: string) => Promise<void>,
    refreshFunction: () => Promise<void>,
    lobby: WsLobby | null,
};

export const GameListController = (props: GameListControllerProps) => {

    const [lobbyTitle, setLobbyTitle] = useState("");
    const [lobbyPassword, setLobbyPassword] = useState("");
    const [isJoinButtonDisabled, setJoinButtonDisabled] = useState(false);
    const [isRefreshButtonDisabled, setRefreshButtonDisabled] = useState(false);

    return (
        <ContainerComponent className="mt-4 p-0">
            <Card>
                <Card.Body>
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Название лобби"
                            className="me-2"
                            onChange={(event) => setLobbyTitle(event.target.value)}
                        />
                        <FormControl
                            type="password"
                            placeholder="Пароль"
                            className="me-2"
                            autoComplete="off"
                            onChange={(event) => setLobbyPassword(event.target.value)}
                        />
                        <Button variant="success" disabled={props.lobby !== null || isJoinButtonDisabled}
                            onClick={() => {
                                setJoinButtonDisabled(true);
                                props.joinFunction(lobbyTitle, lobbyPassword).then(() => setJoinButtonDisabled(false));
                            }
                        }>
                            Подключиться
                        </Button>
                        <Button variant="dark" disabled={isRefreshButtonDisabled} className="ms-2"
                            onClick={() => {
                                setRefreshButtonDisabled(true);
                                props.refreshFunction().then(() => setRefreshButtonDisabled(false));
                            }
                        }>
                            Обновить
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </ContainerComponent>
    );
}