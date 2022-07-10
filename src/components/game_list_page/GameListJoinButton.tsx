import {Button} from "react-bootstrap";

type GameListJoinButtonProps = {
    isEnabled: boolean
}

export const GameListJoinButton = (props: GameListJoinButtonProps) => {
    return (
        <div className="game-list-card p-2">
            <div>
                <Button variant={"secondary"} disabled={!props.isEnabled} className="game-list-join-card-button">+</Button>
            </div>
        </div>
    )
}