import { getCuentasSearch, getCuentas, deleteCuenta } from "../services/cuenta";
import { CuentaDTO } from "../types/Account";
import accountState from '../features/cuentas/accountState';
import { useCallback, useMemo, useState } from "react";

export const useAccountBySearch = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { setList } = accountState;
    const getAccount = useCallback(async ({ search }: { search: string }) => {
        try {
            setLoading(true);
            setError(null);
            let cuentas: CuentaDTO[] = [];
            if (search === "") {
                cuentas = await getCuentas();
            } else {
                cuentas = await getCuentasSearch(search);
            }
            setList(cuentas);
        }
        catch (error) {
            if (error instanceof Error) setError("Error al obtener las cuentas");
        }
        finally {
            setLoading(false);
        }
    }, [setList])

    const sortedAccount = useMemo(() => {
        return accountState.list.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }, []);

    return { accounts: sortedAccount, getAccount, loading, error };
};

export const useRemoveAccount = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { deleteAccount } = accountState;
    const removeAccount = useCallback(async (id: string) => {
        try {
            setError(null);
            setLoading(true);
            await deleteCuenta(id);
            deleteAccount(id);
        }
        catch (error) {
            if (error instanceof Error) setError("Error al eliminar la cuenta");
        }
        finally {
            setLoading(false);
        }
    }, [deleteAccount]);

    return { removeAccount, loading, error };
}