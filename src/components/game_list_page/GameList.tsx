import {Col, Row} from "react-bootstrap";
import {ContainerComponent} from "../ContainerComponent";
import {GameListLobby} from "./GameListLobby";

export const GameList = () => {
    return (
        <ContainerComponent>
            <Row className="justify-content-md-center row-cols-1">
                <Col className="my-4">
                    <GameListLobby lobbyName="Test Name №1" hasPassword={true} gameMode="1-1" maxNumberPlayers={2} members={[
                        {
                            nickname: "Pavel",
                            id: "1",
                            avatar: "https://sun9-west.userapi.com/sun9-66/s/v1/ig1/esmsKNjQxnNLb68WdorFW0FeUH662sqK-79QdS45kiztt3jN-JsC0pDc-eiF8E18NR1epjm4.jpg?size=1080x675&quality=96&type=album",
                            isHost: true
                        }
                    ]}/>

                    <GameListLobby lobbyName="Test Name №2" hasPassword={true} gameMode="1-1" maxNumberPlayers={3} members={[
                        {
                            nickname: "Pavel",
                            id: "1",
                            avatar: "https://sun9-west.userapi.com/sun9-66/s/v1/ig1/esmsKNjQxnNLb68WdorFW0FeUH662sqK-79QdS45kiztt3jN-JsC0pDc-eiF8E18NR1epjm4.jpg?size=1080x675&quality=96&type=album",
                            isHost: true
                        }
                    ]}/>

                    <GameListLobby lobbyName="Test Name №3" hasPassword={true} gameMode="1-1" maxNumberPlayers={4} members={[
                        {
                            nickname: "Pavel",
                            id: "1",
                            avatar: "https://sun9-west.userapi.com/sun9-66/s/v1/ig1/esmsKNjQxnNLb68WdorFW0FeUH662sqK-79QdS45kiztt3jN-JsC0pDc-eiF8E18NR1epjm4.jpg?size=1080x675&quality=96&type=album",
                            isHost: true
                        }
                    ]}/>
                </Col>
            </Row>
        </ContainerComponent>
    );
}