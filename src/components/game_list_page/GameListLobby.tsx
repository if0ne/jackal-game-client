import {Card} from "react-bootstrap";

import LobbyMember from "./LobbyMember";
import {ContainerComponent} from "../ContainerComponent";
import {GameListMemberCard} from "./GameListMemberCard";
import {GameListJoinButton} from "./GameListJoinButton";

type GameListLobbyProps = {
    lobbyName: string,
    gameMode: string,
    hasPassword: boolean,
    maxNumberPlayers: number,
    members: Array<LobbyMember>
};

export const GameListLobby = (props: GameListLobbyProps) => {

    const getLobbyCards = () => {
        let cards = [];

        for (let i = 0; i < 4; i++) {
            if (typeof props.members[i] !== "undefined") {
                cards.push(<GameListMemberCard member={props.members[i]} key={i}/>);
            } else {
                cards.push(<GameListJoinButton isEnabled={i < props.maxNumberPlayers} key={i}/>)
            }
        }

        return cards;
    }

    const padlock = () => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor"
                 className="bi bi-lock-fill" viewBox="0 0 16 16">
                <path
                    d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
            </svg>
        );
    }

    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Title>{props.lobbyName} {props.hasPassword && padlock()}</Card.Title>
                <Card.Text>
                    Режим игры: {props.gameMode}
                </Card.Text>
            </Card.Body>
            <ContainerComponent className="pb-4">
                <div className="game-list-card-member-list">
                    {
                        getLobbyCards().map((item, i) =>
                            item
                        )
                    }
                </div>
            </ContainerComponent>
        </Card>
    );
}