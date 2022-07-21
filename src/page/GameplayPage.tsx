import {RequiredRoles} from "../components/RequiredRoles";
import {JackalGameComponent} from "../components/jackal_game/JackalGameComponent";

export const GameplayPage = () => {
    return (
        <RequiredRoles roles={["GUEST", "USER", "ADMIN"]} isPage={true}>
            <JackalGameComponent/>
        </RequiredRoles>
    );
}