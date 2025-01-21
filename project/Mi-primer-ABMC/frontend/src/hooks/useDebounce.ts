import { useState, useEffect, useRef, useCallback } from 'react';
import debounce from 'just-debounce-it'

export function useDebounce(value: string, delay: number): string {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => clearTimeout(handler)
    }, [value, delay])

    return debouncedValue
}

export function useDebouncedGetUsuarios(getUsuarios: (params: { search: string }) => void) {
    const debouncedGetUsuarios = useRef(
        debounce((search: string) => {
            getUsuarios({ search });
        }, 1000)
    );

    const debouncedCallback = useCallback(
        (search: string) => {
            debouncedGetUsuarios.current(search);
        },
        []
    );

    return debouncedCallback;
};