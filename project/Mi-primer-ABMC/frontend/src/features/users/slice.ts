import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UsuarioDTO } from "../../types/User";

const initialState: UsuarioDTO[] = [];
export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<UsuarioDTO>) => {
            state.push(action.payload);
        },
        updateUser: (state, action: PayloadAction<UsuarioDTO>) => {
            const index = state.findIndex((user) => user.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        deleteUserById: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            return state.filter(user => user.id !== id)
        },
        setUsers: (_, action: PayloadAction<UsuarioDTO[]>) => {
            return action.payload;
        },
        rollbackUser: (state, action: PayloadAction<UsuarioDTO>) => {
            return state.filter(user => user.id !== action.payload.id);
        }
    }
});

export default userSlice.reducer;

export const { deleteUserById, setUsers, addUser, updateUser, rollbackUser } = userSlice.actions;