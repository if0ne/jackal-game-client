import "./GameListPage.css";

import {ContainerComponent} from "../ContainerComponent";
import {GameListReconnection} from "./GameListReconnection";
import {GameListController} from "./GameListController";
import {GameList} from "./GameList";
import {Col, Row} from "react-bootstrap";
import {GameListCurrentLobby} from "./GameListCurrentLobby";
import {useLobby} from "../../hook/useLobby";
import {useEffect, useState} from "react";
import {Lobby} from "../models/Lobby";
import {useAuth} from "../../hook/useAuth";
import {CondRenderComponent} from "../CondRenderComponent";
import {GameListLobbyCreation} from "./GameListLobbyCreation";

export const GameListForm = () => {

    const [lobbies, setLobbies] = useState<Array<Lobby>>(Array(0));
    const { lobby, createLobby, joinLobby } = useLobby();
    const { getAuthRequest, postAuthRequest } = useAuth();

    const [inGame, setInGame] = useState(false);

    useEffect(() => {
        refreshLobbies().then(() => {});
        getAuthRequest("/api/game/get-connection-info", {}).then((response: any) => {
            if (response.data.responseStatus === "OK") {
                setInGame(true);
            }
            //TODO: отлов ошибок
        });
    }, []);

    const refreshLobbies = async () => {
        setLobbies(Array(0));
        let response = await getAuthRequest("/api/lobby/all", {});
        if (response.data.responseStatus === "OK") {
            setLobbies(response.data.lobbiesInfo);
        }
    };

    const createLobbyCallback = async (title: string, password: string, gameMode: number) => {
        await createLobby(title, password);
    };

    const joinLobbyCallback = async (title: string, password: string) => {
        await joinLobby(title, password);
    }

    return (
        <ContainerComponent className="py-4">
            <Row className="m-0">
                <Col sm={3} className="p-0">
                    <CondRenderComponent cond={lobby}>
                        <GameListCurrentLobby/>
                    </CondRenderComponent>
                    <CondRenderComponent cond={!lobby}>
                        <GameListLobbyCreation createFunction={createLobbyCallback}/>
                    </CondRenderComponent>
                </Col>
                <Col sm={9} className="p-0">
                    <CondRenderComponent cond={inGame}>
                        <GameListReconnection/>
                    </CondRenderComponent>
                    <GameListController joinFunction={joinLobbyCallback} refreshFunction={refreshLobbies} lobby={lobby}/>
                    <GameList lobbies={lobbies}/>
                </Col>
            </Row>
        </ContainerComponent>
    );
}