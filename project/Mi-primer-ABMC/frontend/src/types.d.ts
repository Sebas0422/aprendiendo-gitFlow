export interface StateUsuarios {
    usuarios: UsuarioDTO[]
}

export type Action =
    | { type: "users/addUser"; payload: UsuarioDTO }
    | { type: "users/deleteUser"; payload: string }
    | { type: "users/updateUser"; payload: UsuarioDTO };