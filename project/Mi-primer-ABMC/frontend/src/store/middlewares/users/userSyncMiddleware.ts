import { RootState } from "../..";
import { createUsuario, deleteUsuario } from "../../../services/user";
import { rollbackUser } from "../../../features/users/slice";
import { Middleware } from "@reduxjs/toolkit";

enum ActionTypes {
    ADD_USER = "users/addUser",
    UPDATE_USER = "users/updateUser",
    DELETE_USER = "users/deleteUser",
    SET_USERS = "users/setUsers"
}

export const useSyncMiddleware: Middleware = store => next => (action: Any) => {
    const { type } = action;
    const previousState = store.getState() as RootState;

    next(action);
    if (type === ActionTypes.ADD_USER) {
        const newUser = action.payload;
        const usersToNew = previousState.users;
        createUsuario(newUser).catch((error) => {
            if (usersToNew) store.dispatch(rollbackUser(newUser));
            throw error;
        });
    }

    if (type === ActionTypes.DELETE_USER) {
        const id = action.payload;
        const usersToDelete = previousState.users;
        deleteUsuario(id).catch((error) => {
            if (usersToDelete) store.dispatch(rollbackUser(id));
            throw error;
        });
    }
}