import { UsuarioDTO } from "../types/User";
const API_URL = `${import.meta.env.VITE_BASE_URL}/api/usuarios`;

export async function getUsuarios(): Promise<UsuarioDTO[]> {
    const res = await fetch(API_URL)
    const data = await res.json()
    return data.map((user: UsuarioDTO) => ({
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        edad: user.edad,
        telefono: user.telefono,
        correo: user.correo
    }));
}

export async function getUsuarioSearch(search: string) {
    const res = await fetch(`${API_URL}/search?search=${search}`)
    const data = await res.json()
    return data.map((user: UsuarioDTO) => ({
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        edad: user.edad,
        telefono: user.telefono,
        correo: user.correo
    }));
}

export async function createUsuario(usuario: UsuarioDTO) {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    const data = await res.json()
    return data.map((user: UsuarioDTO) => ({
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        edad: user.edad,
        telefono: user.telefono,
        correo: user.correo
    }));
}

export async function deleteUsuario(id: string) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
    const data = await res.json()
    return data;
}