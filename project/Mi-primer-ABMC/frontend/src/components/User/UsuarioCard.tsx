import { Box, Card } from "@palmetto/palmetto-components";
import UsuarioInfo from "./UsuarioInfo";
import CardFooter from "./CardFooter";
import { useUserActions } from "../../hooks/useUsuarioActions";
import { useAppSelector } from "../../hooks/store";

export default function UsuarioCard() {
    const { deleteExistingUser } = useUserActions();

    const { list: usuarios } = useAppSelector((state) => state.users);

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
        <Box gap="lg" padding="lg" direction="row" wrap maxWidth="6x1" key={"usuario-card"}>
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
                                    <UsuarioInfo
                                        label="Nombre Completo"
                                        value={`${usuario.nombre} ${usuario.apellido}`}
                                    />
                                    <UsuarioInfo label="Teléfono" value={usuario.telefono} />
                                </Box>
                                <Box flex="auto" gap="lg">
                                    <UsuarioInfo label="Correo" value={usuario.correo} />
                                    <UsuarioInfo
                                        label="Edad"
                                        value={usuario.edad ? `${usuario.edad} años` : undefined}
                                    />
                                </Box>
                            </Box>
                        </Card.Section>
                        <Card.Footer>
                            <CardFooter
                                onEdit={() => console.log("Editar")}
                                onDelete={() => handleRemove(usuario.id)}
                            />
                        </Card.Footer>
                    </Card>
                </Box>
            ))}
        </Box>
    );
}
