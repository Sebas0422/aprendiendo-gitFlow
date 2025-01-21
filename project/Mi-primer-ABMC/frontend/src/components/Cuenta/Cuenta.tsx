import { Box, TextInput } from '@palmetto/palmetto-components';
import { useSearch } from '../../hooks/useSearch';
import { useCuentasSearch } from '../../hooks/useCuentas';
import { useDebouncedGetUsuarios } from '../../hooks/useDebounce';
import CuentaCard from './CuentaCard';
export default function Cuenta() {
    const { search, updateSearch } = useSearch()
    const { cuentas, getCuentas, removeCuentaLocal } = useCuentasSearch({ search })
    const debouncedGetUsuarios = useDebouncedGetUsuarios(getCuentas)
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
                    label="Buscar Cuenta"
                    onChange={handleChange}
                    autoFocus
                />
            </Box>
            <CuentaCard cuentas={cuentas} onRemoveCuenta={removeCuentaLocal} />
        </>
    )
}