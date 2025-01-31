
import { useAppSelector } from "../../hooks/store";
import UsuarioCard from "./UsuarioCard";


export default function UsuarioList() {

    const { loading } = useAppSelector((state) => state.users);
    if (loading) {
        return <p>Cargando...</p>;
    }

    return <UsuarioCard />;
}
