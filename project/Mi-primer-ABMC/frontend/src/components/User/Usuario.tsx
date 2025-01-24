import { Box, TextInput } from "@palmetto/palmetto-components";
import UsuarioCreate from "./UsuarioCreate";
import UsuarioCard from "./UsuarioCard";
import { useSearch } from "../../hooks/useSearch";
import { useDebouncedGetUsuarios } from "../../hooks/useDebounce";
import { useAppSelector } from "../../hooks/store";
import { useEffect } from "react";
import { getUsuarios } from "../../services/user";
import { useUserActions } from "../../hooks/useUsuarioActions";

export default function Usuario() {
    const { setUsers } = useUserActions()
    const users = useAppSelector((state) => state.users);
    const { search, updateSearch } = useSearch()
    const debouncedGetUsuarios = useDebouncedGetUsuarios(getUsuarios);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await getUsuarios()
                setUsers(users)
            } catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message)
                }
            }
        }
        fetchUsers()
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSearch = event.target.value
        updateSearch(newSearch)
        debouncedGetUsuarios(newSearch)
    }

    return (
        <>
            <Box gap="lg" direction="row" wrap>
                <TextInput
                    id="user-search"
                    value={search}
                    label="Buscar usuario"
                    onChange={handleChange}
                    autoFocus
                />
                <UsuarioCreate />
            </Box>
            <UsuarioCard usuarios={users} />

        </>
    )
}