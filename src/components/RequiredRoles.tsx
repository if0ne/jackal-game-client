import {useAuth} from "../hook/useAuth";
import {Navigate} from "react-router";

export const RequiredRoles = (props: any) => {
    const { user, isLoading } = useAuth();

    if (!isLoading && (!user || !props.roles.includes(user.role))) {
        if (props.isPage) {
            return <Navigate to="/"/>;
        } else {
            return;
        }
    }

    return props.children;
}