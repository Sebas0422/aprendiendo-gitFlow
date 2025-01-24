import { setUsers as setUsersAction } from "../store/users/slice";
import { UsuarioDTO } from "../dto/usuarioDto";
import { useAppDispacth } from "./store";

export const useUserActions = () => {
    const dispatch = useAppDispacth();

    const setUsers = (users: UsuarioDTO[]) => {
        if (users.length === 0) {
            return;
        }
        dispatch(setUsersAction(users));
    }
    return { setUsers }
};