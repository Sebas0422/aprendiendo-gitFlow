import { Box, TextInput } from '@palmetto/palmetto-components';
import { useSearch } from '../../hooks/useSearch';
import { useDebounce } from '../../hooks/useDebounce';
import accountState from '../../features/cuentas/accountState';
import { useSnapshot } from 'valtio';
import { useAccountBySearch } from '../../hooks/useCuentas';
import CuentaCard from './CuentaCard';

export default function Cuenta() {
    const snap = useSnapshot(accountState)
    const { getAccount } = useAccountBySearch()
    const { search, updateSearch } = useSearch()
    const debouncedGetUsuarios = useDebounce(getAccount)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSearch = event.target.value
        updateSearch(newSearch)
        debouncedGetUsuarios(newSearch)
    }
    const filteredAccount = snap.filter
        ? snap.list.filter((cuenta) => {
            return cuenta.nombre.toLowerCase().includes(search.toLowerCase());
        }) : snap.list;
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
            <CuentaCard cuentas={filteredAccount} onRemoveCuenta={snap.deleteAccount} />
        </>
    )
}