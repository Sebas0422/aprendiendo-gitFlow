import { useState, useEffect, useRef, useCallback } from 'react';
import debounce from 'just-debounce-it'

export function useDebouncet(value: string, delay: number): string {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => clearTimeout(handler)
    }, [value, delay])

    return debouncedValue
}

export function useDebounce(getListSearch: (params: { search: string }) => void) {
    const debouncedGetUsuarios = useRef(
        debounce((params: { search: string }) => {
            getListSearch(params);
        }, 1000)
    );

    const debouncedCallback = useCallback(
        (search: string = "") => {
            debouncedGetUsuarios.current({ search });
        }, []);

    return debouncedCallback;
};