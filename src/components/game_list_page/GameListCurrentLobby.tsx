import {ContainerComponent} from "../ContainerComponent";
import {useAuth} from "../../hook/useAuth";
import {Button} from "react-bootstrap";
import {WsLobby} from "../models/WsLobby";
import {CondRenderComponent} from "../CondRenderComponent";
import {useEffect} from "react";
import {useLobby} from "../../hook/useLobby";

type GameListCurrentLobbyProps = {
    lobby: WsLobby
}

export const GameListCurrentLobby = (props: GameListCurrentLobbyProps) => {

    const { user, isLoading } = useAuth();

    const { lobby } = useLobby();

    useEffect(() => {
        getMemberList();
    }, [lobby]);

    const getMemberList = () => {
        const members = Array.from(lobby.members.keys());
        console.log(members);
        const users = members.map((id) => lobby.members.get(id));
        console.log(users);

    };

    return (
        <ContainerComponent className="mt-4 px-2">
            <div>

            </div>
            <CondRenderComponent cond={!isLoading}>
                <div>
                    <Button variant="dark" className="w-100">Готов</Button>
                </div>
            </CondRenderComponent>
        </ContainerComponent>
    );
}