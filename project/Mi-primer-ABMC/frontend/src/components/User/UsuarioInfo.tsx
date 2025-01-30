import { Box } from "@palmetto/palmetto-components";

interface UsuarioInfoProps {
    label: string;
    value: string | number | undefined;
}

export default function UsuarioInfo({ label, value }: UsuarioInfoProps) {
    return (
        <Box gap="2xs">
            <Box fontSize="sm" color="black">
                {label}
            </Box>
            <Box>{value ?? "No disponible"}</Box>
        </Box>
    );
}
