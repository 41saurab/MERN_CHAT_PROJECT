import { authSvc } from "@/pages/auth/authService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const registerUserSlice = createAsyncThunk("auth/registerUserSlice", async (userData, { rejectWithValue }) => {
    try {
        const response = await authSvc.registerUser(userData);

        return response.data;
    } catch (exception) {
        return rejectWithValue(exception.response.data);
    }
});

export const loginUserSlice = createAsyncThunk("auth/loginUserSlice", async (userData, { rejectWithValue }) => {
    try {
        const response = await authSvc.loginUser(userData);

        return response.data;
    } catch (exception) {
        return rejectWithValue(exception.response.data);
    }
});

export const getLoggedInUser = createAsyncThunk("auth/getLoggedInUser", async (_, { rejectWithValue }) => {
    try {
        const response = await authSvc.getLoggedInUser();

        return response.data;
    } catch (exception) {
        return rejectWithValue(exception.response.message);
    }
});

export const getUsers = createAsyncThunk("/auth/getUsers", async ({ search = null }, { rejectWithValue }) => {
    try {
        const response = await authSvc.getUserList({ search });

        return response.data;
    } catch (exception) {
        return rejectWithValue(exception.response.message);
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        error: null,
        isLoggedIn: false,
        userList: [],
    },

    reducers: {
        setLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        clearAuthState: (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;
            state.isLoggedIn = false;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            localStorage.clear();
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(registerUserSlice.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUserSlice.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(registerUserSlice.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(loginUserSlice.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUserSlice.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isLoggedIn = true;
                localStorage.setItem("token", action.payload.token);
                state.error = null;
            })
            .addCase(loginUserSlice.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getLoggedInUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getLoggedInUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isLoggedIn = true;
                state.error = null;
            })
            .addCase(getLoggedInUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isLoggedIn = false;
                localStorage.clear();
            })
            .addCase(getUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.userList = action.payload;
                state.error = null;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setLoggedIn, logout, clearAuthState } = authSlice.actions;

export default authSlice.reducer;
