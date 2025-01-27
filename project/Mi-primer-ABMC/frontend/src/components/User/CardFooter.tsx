import { Box, Button } from "@palmetto/palmetto-components";

interface CardFooterProps {
    onEdit: () => void;
    onDelete: () => void;
}

export default function CardFooter({ onEdit, onDelete }: CardFooterProps) {
    return (
        <Box display="flex" direction="row" justify="between" gap="md">
            <Button size="sm" variant="secondary" tone="neutral" onClick={onEdit}>
                Editar
            </Button>
            <Button size="sm" variant="secondary" tone="danger" onClick={onDelete}>
                Eliminar
            </Button>
        </Box>
    );
}
