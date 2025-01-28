import { proxy } from "valtio";
import { CuentaDTO, CuentaId } from "../../types/Account";

interface AccountState {
    list: CuentaDTO[];
    filter: string;
    addAccount: (CuentaDTO: CuentaDTO) => void;
    updateAccount: (id: CuentaId, updateCuenta: Partial<CuentaDTO>) => void;
    deleteAccount: (id: CuentaId) => void;
    setFilters: (search: { search: string }) => void;
    setList: (list: CuentaDTO[]) => void;
}

const accountState = proxy<AccountState>({
    list: [
        {
            id: "1",
            nombre: "Cuenta 1",
            cuenta: "123456789",
            monto: 1000,
            usuarioId: "1",
        },
        {
            id: "2",
            nombre: "Cuenta 2",
            cuenta: "987654321",
            monto: 2000,
            usuarioId: "2",
        },
    ],
    filter: "",
    addAccount(newCuenta) {
        accountState.list = [...accountState.list, newCuenta];
    },
    updateAccount(id, updateCuenta) {
        accountState.list = accountState.list.map((cuenta) =>
            cuenta.id === id ? { ...cuenta, ...updateCuenta } : cuenta
        );
    },
    deleteAccount(id) {
        accountState.list = accountState.list.filter((cuenta) => cuenta.id !== id);
    },
    setFilters({ search = "" }) {
        accountState.filter = search;
    },
    setList(list) {
        accountState.list = [...list];
    }
});

export default accountState;    