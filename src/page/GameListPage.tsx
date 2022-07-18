import {TemplatePage} from "./TemplatePage";
import {GameListForm} from "../components/game_list_page/GameListForm";
import {RequiredRoles} from "../components/RequiredRoles";

export const GameListPage = () => {
    return (
        <RequiredRoles roles={["USER", "ADMIN"]} isPage={true}>
            <TemplatePage>
                <GameListForm/>
            </TemplatePage>
        </RequiredRoles>
    );
}