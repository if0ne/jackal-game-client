import {TemplatePage} from "./TemplatePage";
import {GameListForm} from "../components/game_list_page/GameListForm";

export const GameListPage = () => {
    return (
        <TemplatePage>
            <GameListForm/>
        </TemplatePage>
    );
}