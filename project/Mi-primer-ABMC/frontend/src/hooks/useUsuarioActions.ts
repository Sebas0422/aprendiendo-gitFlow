import { useEffect } from "react";
import { setUsers as setUsersAction, addUser, deleteUserById, updateUser, getUsersList, getUsersListSearch } from "../features/users/slice";
import { UsuarioDTO } from "../types/User";
import { useAppDispacth, useAppSelector } from "./store";

export const useUserActions = () => {
    const dispatch = useAppDispacth();
    const { isLoaded } = useAppSelector((state) => state.users);

    const getUsersListSearchs = ({ search }: { search: string }) => {
        dispatch(getUsersListSearch(search));
    }

    const getUsers = () => {
        dispatch(getUsersList());
    }

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
        if (!isLoaded) {
            dispatch(getUsersList());
        }
    }, [isLoaded, dispatch]);

    return { getUsers, getUsersListSearchs, setUsers, addNewUser, deleteExistingUser, updateExistingUser, getUsersListSearch };
};