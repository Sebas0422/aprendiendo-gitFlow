import { useSearch } from "../../hooks/useSearch";
import { useDebounce } from "../../hooks/useDebounce";
import { useAppSelector } from "../../hooks/store";
import { useUserActions } from "../../hooks/useUsuarioActions";
import UsuarioHeader from "./UserHeader";
import UsuarioList from "./UserList";

export default function Usuario() {
    const { list: users, loading } = useAppSelector((state) => state.users);
    const { getUsersListSearchs } = useUserActions();
    const { search, updateSearch } = useSearch();
    const debouncedGetUsuarios = useDebounce(getUsersListSearchs);

    const handleSearchChange = (newSearch: string) => {
        updateSearch(newSearch);
        debouncedGetUsuarios(newSearch);
    };

    return (
        <>
            <UsuarioHeader search={search} onSearchChange={handleSearchChange} />
            <UsuarioList usuarios={users} loading={loading} />
        </>
    );
}
