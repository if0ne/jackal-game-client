import {UserRole} from "./Roles";
import JwtDecode from "jwt-decode";

type AccessTokenType = {
    exp: number,
    iat: number,
    permissions: string,
    sub: string,
    username: string,
    picture_url: string,
}

export type User = {
    id: string,
    role: UserRole,
    name: string,
    pictureUrl: string,
};

export const GUEST_USER: User = {
    id: "0",
    role: "GUEST",
    name: "Гость",
    pictureUrl: ""
}

function getUserRoleFromString(permission: string) {
    let splitted = permission.split(", ");

    return splitted[0] as UserRole;
}

export function getUserFromToken(token: string) {
    const decoded = JwtDecode<AccessTokenType>(token);
    const role = getUserRoleFromString(decoded.permissions);

    return {
        id: decoded.sub,
        name: decoded.username,
        role: role,
        pictureUrl: decoded.picture_url
    } as User;
}