import {ContainerComponent} from "../ContainerComponent";
import {useAuth} from "../../hook/useAuth";
import {Button} from "react-bootstrap";
import {CondRenderComponent} from "../CondRenderComponent";
import {useEffect, useState} from "react";
import {useLobby} from "../../hook/useLobby";
import {GameListCurrentLobbyMember} from "./GameListCurrentLobbyMember";

export const GameListCurrentLobby = () => {

    const [members, setMembers] = useState(Array(0));

    const { user, isLoading } = useAuth();
    const { lobby, kickLobbyMember, toggleReady, leaveLobby, newMessage } = useLobby();

    const [owner, setOwner] = useState(null);

    useEffect(() => {
        getMemberList();
    }, [lobby, newMessage])

    useEffect(() => {
        setOwner(findOwn());
    }, [members])

    const isHost = () => {
        if (members.length === 0) {
            return false;
        }

        try {
            const hostId = members.find((value) => value.info.isHost).id;
            return hostId == user.id;
        } catch (err) {
            return false;
        }
    }

    const findOwn = () => {
        if (members.length === 0) {
            return null;
        }
        return members.find((value) => value.id == user.id);
    }

    const isAllReady = () => {
        //TODO: В зависимости от режима
        const needCount = members.length === 4;
        let isAllReady = true;
        members.forEach((value) => {
           isAllReady &&= (value.info.status === "READY");
        });

        return needCount && isAllReady;
    }

    const isKickable = (member: any) => {
        const isOwnId = (member.id == user.id);
        return isHost() && !isOwnId;
    }

    const kickLobbyMemberCallback = (id: string) => {
        kickLobbyMember(id);
    }

    const toggleReadyCallback = () => {
        toggleReady();
    }

    const leaveLobbyCallback = () => {
        leaveLobby();
    }

    const getMemberList = () => {
        const members = Array.from(lobby.members.keys());
        const users = members.map((id) => {
            return {
                id: id,
                info: lobby.members.get(id)
            }
        });
        setMembers(users);
    };

    return (
        <ContainerComponent className="mt-4 px-2">
            <div>
                {
                    members.map((value, index) =>
                        <GameListCurrentLobbyMember
                            kickable={isKickable(value)}
                            member={value}
                            kickFunction={() => kickLobbyMemberCallback(value.id)}
                            key={index}
                        />
                    )
                }
            </div>
            <CondRenderComponent cond={!isLoading}>
                <Button
                    variant="dark"
                    className="w-100"
                    //@ts-ignore
                    disabled={owner?.info.status === "IN_GAME"}
                    onClick={toggleReadyCallback}
                >
                    {
                        // @ts-ignore
                        owner && owner.info.status === "NOT_READY" ? "Готов" : "Не готов"
                    }
                </Button>
                <CondRenderComponent cond={isHost()}>
                    <Button
                        variant="primary"
                        className="w-100 mt-2"
                        //@ts-ignore
                        disabled={!isAllReady()}
                        onClick={toggleReadyCallback}
                    >
                        Начать игру
                    </Button>
                </CondRenderComponent>
                <Button
                    variant="dark"
                    className="w-100 mt-2"
                    //@ts-ignore
                    disabled={owner?.info.status === "IN_GAME"}
                    onClick={leaveLobbyCallback}
                >
                    Выйти
                </Button>
            </CondRenderComponent>
        </ContainerComponent>
    );
}