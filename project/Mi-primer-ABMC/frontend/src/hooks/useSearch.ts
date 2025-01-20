import { useEffect, useRef, useState } from "react"

export function useSearch() {
    const [search, updateSearch] = useState("")
    const [error, setError] = useState<string | null>(null)
    const isFirstInput = useRef(true)

    useEffect(() => {
        if (isFirstInput.current) {
            isFirstInput.current = search === ""
            return
        }
        setError(null)
    }, [search])

    return { search, updateSearch, error }
}