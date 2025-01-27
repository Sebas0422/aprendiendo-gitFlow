import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/users/slice";
import { useSyncMiddleware } from "./middlewares/users/userSyncMiddleware";

export const store = configureStore({
    reducer: {
        users: usersReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(useSyncMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;