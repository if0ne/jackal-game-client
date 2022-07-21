import {LobbyMember} from "../models/LobbyMember";
import {ContainerComponent} from "../ContainerComponent";
import {Button, Col, Row} from "react-bootstrap";

type GameListCurrentLobbyMemberProps = {
    kickable: boolean,
    kickFunction: () => void,
    member: {
        id: string,
        info: LobbyMember
    }
}

export const GameListCurrentLobbyMember = (props: GameListCurrentLobbyMemberProps) => {

    const star = () => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 className="bi bi-star-fill center-align" viewBox="0 0 16 16">
                <path
                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
        );
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "NOT_READY":
                return "not-ready-status";
            case "READY":
                return "ready-status";
            case "IN_GAME":
                return "in-game-status";
        }
    }

    return (
        <ContainerComponent className="p-0 py-2">
            <Row className="m-0">
                <Col sm={2} className="p-0 d-flex">
                    <img src={props.member.info.pictureUrl}
                         className={`game-list-current-lobby-avatar ${getStatusStyle(props.member.info.status)}`}
                    />
                </Col>
                <Col sm={8} className="px-2">
                    <p className="game-list-current-lobby-name py-0">
                        <span className="center-align">{props.member.info.name}</span>
                    </p>
                </Col>
                <Col sm={2} className="px-0">
                    {
                        props.member.info.isHost &&
                        <div className="star">
                            {star()}
                        </div>
                    }
                    {
                        props.kickable && <Button variant="light" onClick={props.kickFunction}>X</Button>
                    }
                </Col>
            </Row>
        </ContainerComponent>
    );
}