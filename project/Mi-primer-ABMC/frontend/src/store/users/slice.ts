import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UsuarioDTO } from "../../dto/usuarioDto";

const initialState: UsuarioDTO[] = [];
export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        deletUserById: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            return state.filter(user => user.id !== id)
        },
        setUsers: (_, action: PayloadAction<UsuarioDTO[]>) => {
            return action.payload;
        }
    }
});

export default userSlice.reducer;

export const { deletUserById, setUsers } = userSlice.actions;