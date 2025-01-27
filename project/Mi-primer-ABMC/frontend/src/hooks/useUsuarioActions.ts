import { useEffect } from "react";
import { setUsers as setUsersAction, addUser, deleteUserById, updateUser, getUsersList } from "../features/users/slice";
import { UsuarioDTO } from "../types/User";
import { useAppDispacth, useAppSelector } from "./store";

export const useUserActions = () => {
    const { list: users, loading } = useAppSelector((state) => state.users);
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

    useEffect(() => {
        if (!users.length && !loading) {
            dispatch(getUsersList());
        }
    }, [dispatch, users.length, loading]);

    return { setUsers, addNewUser, deleteExistingUser, updateExistingUser };
};