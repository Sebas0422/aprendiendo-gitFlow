export interface StateUsuarios {
    usuarios: UsuarioDTO[]
}

export type Action =
    | { type: 'add', usuario: UsuarioDTO }
    | { type: 'remove', id: string }
    | { type: 'update', usuario: UsuarioDTO }