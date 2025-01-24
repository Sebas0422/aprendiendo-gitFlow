import { CuentaDTO } from '../dto/cuentaDto';

const API_URL: string = `${import.meta.env.VITE_BASE_URL}/api/cuentas`;
export const getCuentasSearch = async (search: string) => {
    const res = await fetch(`${API_URL}/search?search=${search}`);
    const data = await res.json();
    return data;
}

export const getCuentas = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    return data;
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