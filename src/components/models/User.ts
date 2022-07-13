import {UserRole} from "./Roles";
import JwtDecode from "jwt-decode";

type AccessTokenType = {
    exp: number,
    iat: number,
    permissions: string,
    sub: string,
    username: string
}

export type User = {
    id: number,
    role: UserRole,
    name: string,
};

export const GUEST_USER: User = {
    id: 0,
    role: "GUEST",
    name: "Гость"
}

function getUserRoleFromString(permission: string) {
    let splitted = permission.split(", ");
    
    return splitted[0] as UserRole;
}

export function getUserFromToken(token: string) {
    let decoded = JwtDecode<AccessTokenType>(token);

    return {
        //@ts-ignore
        id: decoded.sub as number,
        //@ts-ignore
        name: decoded.username,
        //@ts-ignore
        role: getUserRoleFromString(decoded.permissions)
    } as User;
}