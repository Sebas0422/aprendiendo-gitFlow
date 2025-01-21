import { useCallback, useMemo, useRef, useState } from "react"
import { CuentaDTO } from "../dto/cuentaDto"
import { deleteCuenta, getCuentasSearch } from "../services/cuenta"

export const useCuentasSearch = ({ search }: { search: string }) => {
    const [cuentas, setCuentas] = useState<CuentaDTO[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const prevSearch = useRef(search)

    const removeCuentaLocal = useCallback((cuentaId: string) => {
        setCuentas((prevCuentas) => prevCuentas.filter((cuenta) => cuenta.id! === cuentaId))
    }, [])

    const getCuentas = useCallback(async ({ search }: { search: string }) => {
        if (search === prevSearch.current) return
        try {
            setLoading(true)
            setError(null)
            prevSearch.current = search
            const newCuentas = await getCuentasSearch(search)
            if (newCuentas.error) {
                setCuentas([])
                setError(newCuentas.error)
                return
            }
            setCuentas(newCuentas)
        }
        catch (error) {
            setError(error instanceof Error ? error.message : 'Error desconocido')
        }
        finally {
            setLoading(false)
        }
    }, [])

    const sortedCuenta = useMemo(() => {
        if (cuentas.length === 0) return cuentas

        return [...cuentas].sort((a, b) => a.nombre.localeCompare(b.nombre))
    }, [cuentas])

    return { cuentas: sortedCuenta, loading, error, removeCuentaLocal, getCuentas }
}

export const useDeleteCuenta = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const remove = useCallback(async (id: string) => {
        try {
            setLoading(true)
            setError(null)
            await deleteCuenta(id)
        }
        catch (error) {
            setError(error instanceof Error ? error.message : 'Error desconocido')
        }
        finally {
            setLoading(false)
        }
    }, [])

    return { remove, loading, error }
}