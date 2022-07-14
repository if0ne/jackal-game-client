import {AuthorizationForm} from "../components/auth_page/AuthorizationForm";
import {RequiredRoles} from "../components/RequiredRoles";

export const AuthorizationPage = () => {
    return (
        <RequiredRoles roles={["GUEST"]} isPage={true}>
            <AuthorizationForm/>
        </RequiredRoles>
    );
}