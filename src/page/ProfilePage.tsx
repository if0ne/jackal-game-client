import {RequiredRoles} from "../components/RequiredRoles";
import {ProfileForm} from "../components/profile_page/ProfileForm";
import {TemplatePage} from "./TemplatePage";

export const ProfilePage = () => {
    return (
        <RequiredRoles roles={["USER", "ADMIN"]} isPage={true}>
            <TemplatePage>
                <ProfileForm/>
            </TemplatePage>
        </RequiredRoles>
    );
}