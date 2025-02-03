import { CuentaDTO } from '../types/Account';

const API_URL: string = `${import.meta.env.VITE_API_URL}/api/cuentas`;

export const getCuentasSearch = async (search: string) => {
    const res = await fetch(`${API_URL}/search?search=${search}`);
    const data = await res.json();
    return data.map((cuenta: CuentaDTO) => {
        return {
            id: cuenta._id,
            nombre: cuenta.nombre,
            cuenta: cuenta.cuenta,
            monto: cuenta.monto,
            usuarioId: cuenta.usuarioId
        }
    });
}

export const getCuentas = async (): Promise<CuentaDTO[]> => {
    const res = await fetch(API_URL);
    const data = await res.json();
    return data.map((cuenta: CuentaDTO) => {
        return {
            id: cuenta.id,
            nombre: cuenta.nombre,
            cuenta: cuenta.cuenta,
            monto: cuenta.monto,
            usuarioId: cuenta.usuarioId
        }
    });
}

export const createCuenta = async (cuenta: CuentaDTO) => {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cuenta)
    });
    const data = await res.json();
    return data;
}

export const deleteCuenta = async (id: string) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    const data = await res.json();
    return data;
}