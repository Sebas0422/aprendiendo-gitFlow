import {
    Box,
    Button,
    Card
} from '@palmetto/palmetto-components';
import { CuentaDTO, CuentaId } from '../../types/Account';
import { useRemoveAccount } from '../../hooks/useCuentas';

interface CuentaInfoProps {
    label: string;
    value: string | number | undefined;
}

interface CuentaCardProps {
    cuentas?: ReadonlyArray<CuentaDTO>;
    onRemoveCuenta: (id: CuentaId) => void;
}

const CuentaInfo = ({ label, value }: CuentaInfoProps) => {
    return (
        <Box gap="2xs">
            <Box fontSize="sm" color="black">
                {label}
            </Box>
            <Box>{value ?? 'No disponible'}</Box>
        </Box>
    )
}

const CuentaCard = ({ cuentas = [], onRemoveCuenta }: CuentaCardProps) => {
    const { removeAccount } = useRemoveAccount();

    const handleRemove = (id: string) => {
        removeAccount(id);
        onRemoveCuenta(id);
    };

    if (cuentas.length === 0) {
        return (
            <Box as="p" color="black" fontSize="sm">
                No hay cuentas para mostrar
            </Box>
        )
    }

    return (
        <Box gap="lg" padding="lg" direction="row" wrap maxWidth="6x1">
            {cuentas.map((cuenta) => (
                <Box key={cuenta.id} background="primary-300">
                    <Card>
                        <Card.Header title="Cuenta">
                            <Box as="p" color="black" fontSize="sm">
                                Información de la cuenta
                            </Box>
                        </Card.Header>
                        <Card.Section title="Descripción">
                            <Box direction="column" gap="lg">
                                <Box flex="auto" gap="lg">
                                    <CuentaInfo label="Nombre" value={cuenta.nombre} />
                                    <CuentaInfo label="Numero de cuenta: " value={cuenta.cuenta} />
                                    <CuentaInfo label="Saldo" value={cuenta.monto} />
                                </Box>
                                <Box>
                                    <Button onClick={() => handleRemove(cuenta.id!)}
                                        variant='secondary'
                                        tone='danger'
                                        size='sm'
                                    >
                                        Eliminar
                                    </Button>
                                </Box>
                            </Box>
                        </Card.Section>
                    </Card>
                </Box>
            ))}
        </Box>
    )
}

export default CuentaCard;