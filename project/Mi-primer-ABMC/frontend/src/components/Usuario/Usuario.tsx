import { Box, TextInput } from "@palmetto/palmetto-components";
import UsuarioCreate from "./UsuarioCreate";
import UsuarioCard from "./UsuarioCard";
import { useSearch } from "../../hooks/useSearch";
import { useUsuariosSearch } from "../../hooks/useUsuarios";
import { useDebouncedGetUsuarios } from "../../hooks/useDebounce";

export default function Usuario() {
    const { search, updateSearch } = useSearch()
    const { usuarios, getUsuarios, removeUsuarioLocal } = useUsuariosSearch({ search });
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
            <UsuarioCard usuarios={usuarios} onRemoveUsuario={removeUsuarioLocal} />

        </>
    )
}