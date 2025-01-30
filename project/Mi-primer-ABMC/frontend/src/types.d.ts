export interface StateUsuarios {
    usuarios: UsuarioDTO[]
}

export enum ActionTypesUser {
    ADD_USER = "users/addUser",
    UPDATE_USER = "users/updateUser",
    DELETE_USER = "users/deleteUser",
    SET_USERS = "users/setUsers"
}

export type Action =
    | { type: ActionTypesUser.ADD_USER; payload: UsuarioDTO }
    | { type: ActionTypesUser.DELETE_USER; payload: string }
    | { type: ActionTypesUser.UPDATE_USER; payload: UsuarioDTO };


