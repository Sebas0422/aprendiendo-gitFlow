import { Box, TextInput } from "@palmetto/palmetto-components";
import UsuarioCreate from "./UsuarioCreate";
import UsuarioCard from "./UsuarioCard";
import { useSearch } from "../../hooks/useSearch";
import { useDebouncedGetUsuarios } from "../../hooks/useDebounce";
import { useAppSelector } from "../../hooks/store";
import { getUsuarios } from "../../services/user";
import { useUserActions } from "../../hooks/useUsuarioActions";

export default function Usuario() {
    const { list: users, loading } = useAppSelector((state) => state.users);
    useUserActions();
    const { search, updateSearch } = useSearch()
    const debouncedGetUsuarios = useDebouncedGetUsuarios(getUsuarios);


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
            {loading ? <p>Cargando...</p> : <UsuarioCard usuarios={users} />}
        </>
    )
}