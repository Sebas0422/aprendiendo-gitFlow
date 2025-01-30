import { Box, TextInput } from "@palmetto/palmetto-components";
import UsuarioCreate from "./UsuarioCreate";

interface UsuarioHeaderProps {
    search: string;
    onSearchChange: (value: string) => void;
}

export default function UsuarioHeader({ search, onSearchChange }: UsuarioHeaderProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(event.target.value);
    };

    return (
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
    );
}
