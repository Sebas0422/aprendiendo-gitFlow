import { useReducer } from "react";
import { UsuarioDTO } from "../dto/usuarioDto";
import { StateUsuarios, type Action } from "../types";


const initialState: StateUsuarios = { usuarios: [] };

function reducer(state: StateUsuarios, action: Action) {
    const { type } = action
    if (type === 'add') {
        return { usuarios: [...state.usuarios, action.usuario] }
    }
    if (type === 'remove') {
        return { usuarios: state.usuarios.filter(usuario => usuario.id !== action.id) }
    }
    if (type === 'update') {
        return { usuarios: state.usuarios.map(usuario => usuario.id === action.usuario.id ? action.usuario : usuario) }
    }
    return state
}

export const useUsuarios = () => {
    const [{ usuarios }, dispatch] = useReducer(reducer, initialState)
    const addUsuario = (usuario: UsuarioDTO) => dispatch({ type: 'add', usuario })
    const removeUsuario = (id: string) => dispatch({ type: 'remove', id })
    const updateUsuario = (usuario: UsuarioDTO) => dispatch({ type: 'update', usuario })
    return { usuarios, addUsuario, removeUsuario, updateUsuario }
}