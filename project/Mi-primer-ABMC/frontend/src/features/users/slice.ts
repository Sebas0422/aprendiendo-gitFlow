import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UsuarioDTO } from "../../types/User";
import { getUsuarios, getUsuarioSearch } from "../../services/user";

interface UserState {
    list: UsuarioDTO[];
    loading: boolean;
    error: string | null;
    isLoaded: boolean
}

const initialState: UserState = {
    list: [],
    loading: false,
    error: null,
    isLoaded: false
};

export const getUsersList = createAsyncThunk("users/getUsersList", () => {
    console.log('getUsersList');
    return getUsuarios();
})

export const getUsersListSearch = createAsyncThunk("users/getUsersListSearch", (search: string) => {
    return getUsuarioSearch(search);
});

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<UsuarioDTO>) => {
            state.list.push(action.payload);
        },
        updateUser: (state, action: PayloadAction<UsuarioDTO>) => {
            const index = state.list.findIndex((user) => user.id === action.payload.id);
            if (index !== -1) {
                state.list[index] = action.payload;
            }
        },
        deleteUserById: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            const index = state.list.findIndex((user) => user.id === id);
            if (index !== -1) {
                state.list.splice(index, 1);
            }
        },
        setUsers: (state, action: PayloadAction<UsuarioDTO[]>) => {
            state.list = action.payload;
        },
        rollbackUser: (state, action: PayloadAction<UsuarioDTO | string>) => {
            const id = typeof action.payload === "string" ? action.payload : action.payload.id;
            state.list = state.list.filter(user => user.id !== id);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsersList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUsersList.fulfilled, (state, action: PayloadAction<UsuarioDTO[]>) => {
                console.log('getUsersList.fulfilled');
                state.list = action.payload;
                state.loading = false;
                state.isLoaded = true
            })
            .addCase(getUsersList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch users";
            })
            .addCase(getUsersListSearch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUsersListSearch.fulfilled, (state, action: PayloadAction<UsuarioDTO[]>) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(getUsersListSearch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch users";
            });
    }
});

export default userSlice.reducer;

export const { deleteUserById, setUsers, addUser, updateUser, rollbackUser } = userSlice.actions;