import {Col, Row} from "react-bootstrap";
import {ContainerComponent} from "../ContainerComponent";
import {GameListLobby} from "./GameListLobby";
import {Lobby} from "../models/Lobby";

type GameListProps = {
    lobbies: Array<Lobby>
};
//.filter((value) => value.isPublic)
export const GameList = (props: GameListProps) => {
    return (
        <ContainerComponent className="p-0">
            <Row className="justify-content-md-center row-cols-1 m-0">
                <Col className="my-4">
                    {
                        //TODO: Вывод скрытых лобби
                        props.lobbies.map((value, index) => <GameListLobby key={index} lobby={value}/>)
                    }
                </Col>
            </Row>
        </ContainerComponent>
    );
}