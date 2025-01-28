import { UsuarioDTO } from "../../types/User";
import UsuarioCard from "./UsuarioCard";

interface UsuarioListProps {
    usuarios: UsuarioDTO[]
    loading: boolean;
}

export default function UsuarioList({ usuarios, loading }: UsuarioListProps) {
    if (loading) {
        return <p>Cargando...</p>;
    }

    return <UsuarioCard usuarios={usuarios} />;
}
