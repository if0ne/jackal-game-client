import "./GameListPage.css";

import {ContainerComponent} from "../ContainerComponent";
import {GameListReconnection} from "./GameListReconnection";
import {GameListController} from "./GameListController";
import {GameList} from "./GameList";

export const GameListForm = () => {
    return (
        <ContainerComponent className="py-4">
            <GameListReconnection/>
            <GameListController/>
            <GameList/>
        </ContainerComponent>
    );
}