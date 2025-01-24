import { setUsers as setUsersAction, addUser, deleteUserById, updateUser } from "../features/users/slice";
import { UsuarioDTO } from "../types/User";
import { useAppDispacth } from "./store";

export const useUserActions = () => {
    const dispatch = useAppDispacth();

    const setUsers = (users: UsuarioDTO[]) => {
        if (users.length === 0) {
            return;
        }
        dispatch(setUsersAction(users));
    }

    const addNewUser = (user: UsuarioDTO) => {
        dispatch(addUser(user));
    }

    const deleteExistingUser = (id: string) => {
        dispatch(deleteUserById(id));
    }

    const updateExistingUser = (user: UsuarioDTO) => {
        dispatch(updateUser(user));
    }
    return { setUsers, addNewUser, deleteExistingUser, updateExistingUser };
};