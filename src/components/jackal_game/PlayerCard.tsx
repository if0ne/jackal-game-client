import {Card} from "react-bootstrap";
import {getPirateTeamColorByNumber} from "./Cell";

export const PlayerCard = (props: any) => {
    return (
        <div className="d-flex my-4 player-card">
            <div className="d-flex player-card-img-container">
                <Card.Img style={{border: `0.5vh solid ${getPirateTeamColorByNumber(props.player.number)}`}} src={props.player.picture} className="player-card-img"/>
            </div>
            <div className="player-card-info">
                <h3 className="m-0 player-card-info-name">{props.player.name}</h3>
                <p className="m-0 player-card-info-text">Монет: <b>{props.player.coins}</b></p>
            </div>
        </div>
    );
}