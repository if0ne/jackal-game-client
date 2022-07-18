import {Button, Form} from "react-bootstrap";
import {ContainerComponent} from "../ContainerComponent";
import {useState} from "react";

type GameListLobbyCreationProps = {
    createFunction: (title: string, password: string, gameMode: number) => Promise<void>
}

export const GameListLobbyCreation = (props: GameListLobbyCreationProps) => {

    const [lobbyTitle, setLobbyTitle] = useState("");
    const [lobbyPassword, setLobbyPassword] = useState("");
    const [gameMode, setGameMode] = useState(0);

    const [isCreateButtonDisabled, setCreateButtonDisabled] = useState(false);

    return (
        <ContainerComponent className="mt-4 px-2">
            <Form>
                <Form.Group className="mb-2">
                    <Form.Text>Название</Form.Text>
                    <Form.Control type="search" placeholder="Название лобби" aria-label="ID" onChange={
                        (event) => setLobbyTitle(event.target.value)
                    }/>
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Text>Пароль</Form.Text>
                    <Form.Control type="password" placeholder="Пароль" aria-label="ID" autoComplete="off" onChange={
                        (event) => setLobbyPassword(event.target.value)
                    }/>
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Text>Режим игры</Form.Text>
                    <Form.Select aria-label="Default select example" defaultValue={0} onChange={
                        (event) => setGameMode(Number.parseInt(event.target.value))
                    }>
                        <option value="0">1 vs 1 vs 1 vs 1</option>
                        <option value="1" disabled>1 vs 1 vs 1</option>
                        <option value="2" disabled>1 vs 1</option>
                        <option value="3" disabled>2 vs 2</option>
                    </Form.Select>
                </Form.Group>
                <Button variant="success" className="w-100" disabled={isCreateButtonDisabled} onClick={() => {
                    setCreateButtonDisabled(true)
                    props.createFunction(lobbyTitle, lobbyPassword, gameMode)
                        .then(() => setCreateButtonDisabled(false));
                }}>Создать</Button>
            </Form>
        </ContainerComponent>
    );
}