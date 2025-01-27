import {
    Box,
    Button,
    Card,
} from "@palmetto/palmetto-components";
import { UsuarioDTO } from "../../types/User";
import { useUserActions } from "../../hooks/useUsuarioActions";

interface UsuarioInfoProps {
    label: string;
    value: string | number | undefined;
}

function UsuarioInfo({ label, value }: UsuarioInfoProps) {
    return (
        <Box gap="2xs">
            <Box fontSize="sm" color="black">
                {label}
            </Box>
            <Box>{value ?? "No disponible"}</Box>
        </Box>
    );
}

interface UsuarioCardProps {
    usuarios?: UsuarioDTO[];
}

export default function UsuarioCard({ usuarios = [] }: UsuarioCardProps) {
    const { deleteExistingUser } = useUserActions();

    const handleRemove = (id: string) => {
        deleteExistingUser(id);
    };

    if (usuarios.length === 0) {
        return (
            <Box as="p" color="black" fontSize="sm">
                No hay usuarios para mostrar
            </Box>
        );
    }

    return (
        <Box gap="lg" padding="lg" direction="row" wrap maxWidth="6x1">
            {usuarios.map((usuario) => (
                <Box key={usuario.id} background="primary-300">
                    <Card>
                        <Card.Header title="Usuario">
                            <Box as="p" color="black" fontSize="sm">
                                Información personal del usuario
                            </Box>
                        </Card.Header>
                        <Card.Section title="Perfil">
                            <Box direction="column" gap="lg">
                                <Box flex="auto" gap="lg">
                                    <UsuarioInfo label="Nombre Completo" value={`${usuario.nombre} ${usuario.apellido}`} />
                                    <UsuarioInfo label="Teléfono" value={usuario.telefono} />
                                </Box>
                                <Box flex="auto" gap="lg">
                                    <UsuarioInfo label="Correo" value={usuario.correo} />
                                    <UsuarioInfo label="Edad" value={usuario.edad ? `${usuario.edad} años` : undefined} />
                                </Box>
                            </Box>
                        </Card.Section>
                        <Card.Footer>
                            <Box display="flex" direction="row" justify="between" gap="md">
                                <Button size="sm" variant="secondary" tone="neutral">
                                    Editar
                                </Button>
                                <Button
                                    onClick={() => handleRemove(usuario.id)}
                                    variant="secondary"
                                    tone="danger"
                                    size="sm"
                                >
                                    Eliminar
                                </Button>
                            </Box>
                        </Card.Footer>
                    </Card>
                </Box>
            ))}
        </Box>
    );
}
