import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { UsuarioDTO } from '../dto/usuarioDto';
import { getUsuarios, getUsuarioSearch, createUsuario, deleteUsuario } from '../services/user';

export function useUsuarios() {
    const [usuarios, setUsuarios] = useState<UsuarioDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        getUsuarios()
            .then((usuarios) => {
                setUsuarios(usuarios);
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { usuarios, loading, error };
}

export function useUsuariosSearch({ search }: { search: string }) {
    const [usuarios, setUsuarios] = useState<UsuarioDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [, setError] = useState<string | null>(null);
    const prevSearch = useRef(search);

    const removeUsuarioLocal = useCallback((usuarioId: string) => {
        setUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario.id !== usuarioId));
    }, []);

    const getUsuarios = useCallback(async ({ search }: { search: string }) => {
        if (search === prevSearch.current) return
        try {
            setLoading(true)
            setError(null)
            prevSearch.current = search
            const newUsuarios = await getUsuarioSearch(search)
            if (newUsuarios.error) {
                setUsuarios([])
                setError(newUsuarios.error)
                return
            }
            setUsuarios(newUsuarios)
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Error desconocido');
        } finally {
            setLoading(false)
        }
    }, [])

    const sortedUsuarios = useMemo(() => {
        if (usuarios.length === 0) return usuarios

        return [...usuarios].sort((a, b) => a.nombre.localeCompare(b.nombre))
    }, [usuarios])
    return { usuarios: sortedUsuarios, getUsuarios, loading, removeUsuarioLocal };
}

export function useCreateUsuario() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const create = async (usuario: UsuarioDTO) => {
        setLoading(true);
        try {
            const newUsuario = await createUsuario(usuario);
            setError(null);
            return newUsuario;
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Error desconocido');
        } finally {
            setLoading(false);
        }
    };
    return { create, loading, error };
}


export function useDeleteUsuario() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const remove = async (id: string) => {
        setLoading(true);
        try {
            await deleteUsuario(id);
            setError(null);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Error desconocido');
        } finally {
            setLoading(false);
        }
    };
    return { remove, loading, error };
}