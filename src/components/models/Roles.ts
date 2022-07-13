export type UserRole = Admin | Guest | Player;

export type Guest = "GUEST";
export type Player = "USER";
export type Admin = "ADMIN";

export type Roles = [Admin, Guest, Player];