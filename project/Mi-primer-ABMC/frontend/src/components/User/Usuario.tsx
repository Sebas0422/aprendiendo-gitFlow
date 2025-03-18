import { useSearch } from "../../hooks/useSearch";
import { useDebounce } from "../../hooks/useDebounce";
import { useUserActions } from "../../hooks/useUsuarioActions";
import UsuarioHeader from "./UserHeader";
import UsuarioList from "./UserList";
import { Table } from "@palmetto/palmetto-components";
import BasicDateInput from "./DateInput";


export default function Usuario() {
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
            <UsuarioList />
            <MiTabla />
            <BasicDateInput />
        </>
    );
}
const data = [
    { id: 1, nombre: "Juan Pérez", edad: 30 },
    { id: 2, nombre: "María Gómez", edad: 25 },
    { id: 3, nombre: "Carlos López", edad: 35 }
];

const columns = [
    { heading: "ID", dataKey: "id", render: (cell, row) => <span className={row.id === 2 ? "bg-yellow-200 p-2" : "p-2"}>{cell}</span> },
    { heading: "Nombre", dataKey: "nombre", render: (cell, row) => <span className={row.id === 2 ? "bg-yellow-200 p-2" : "p-2"}>{cell}</span> },
    { heading: "Edad", dataKey: "edad", render: (cell, row) => <span className={row.id === 2 ? "bg-yellow-200 p-2" : "p-2"}>{cell}</span> }
];

function MiTabla() {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Lista de Usuarios</h2>
            <Table
                columns={columns}
                rows={data}
                rowKey="id"
            />
        </div>
    );
}

