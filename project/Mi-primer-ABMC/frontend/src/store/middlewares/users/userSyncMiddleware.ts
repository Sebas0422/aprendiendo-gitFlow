import { RootState } from "../..";
import { createUsuario, deleteUsuario } from "../../../services/user";
import { rollbackUser } from "../../../features/users/slice";
import { Middleware } from "@reduxjs/toolkit";
import { Action, ActionTypesUser } from "../../../types.d";

export const useSyncMiddleware: Middleware = store => next => (action) => {
    if (!isMyAction(action)) return next(action);

    const { type } = action;
    const previousState = store.getState() as RootState;

    next(action);
    if (type === ActionTypesUser.ADD_USER) {
        const newUser = action.payload;
        const usersToNew = previousState.users;
        createUsuario(newUser).catch((error) => {
            if (usersToNew) store.dispatch(rollbackUser(newUser));
            throw error;
        });
    }

    if (type === ActionTypesUser.DELETE_USER) {
        const id = action.payload;
        const usersToDelete = previousState.users;
        deleteUsuario(id).catch((error) => {
            if (usersToDelete) store.dispatch(rollbackUser(id));
            throw error;
        });
    }
}

function isMyAction(action: unknown): action is Action {
    return (
        typeof action === "object" &&
        action !== null &&
        "type" in action &&
        Object.values(ActionTypesUser).includes((action as Action).type)
    );
}
