import { UsuarioDTO } from "../dto/usuarioDto";
const BASE_URL = 'http://localhost:4000/api';

export async function getUsuarios() {
    const res = await fetch(`${BASE_URL}/usuarios`)
    const data = await res.json()
    return data;
}

export async function getUsuarioSearch(search: string) {
    const res = await fetch(`${BASE_URL}/usuarios/search?search=${search}`)
    const data = await res.json()
    return data;
}

export async function createUsuario(usuario: UsuarioDTO) {
    const res = await fetch(`${BASE_URL}/usuarios`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    const data = await res.json()
    return data;
}

export async function deleteUsuario(id: string) {
    const res = await fetch(`${BASE_URL}/usuarios/${id}`, {
        method: 'DELETE'
    })
    const data = await res.json()
    return data;
}