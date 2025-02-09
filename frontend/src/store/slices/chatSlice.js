import { chatSvc } from "@/pages/chat/chatService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMessages = createAsyncThunk("chat/fetchMessages", async (otherUserId, { rejectWithValue }) => {
    try {
        const messages = await chatSvc.getChats(otherUserId);

        return messages.data;
    } catch (error) {
        console.error("Failed to fetch messages:", error);
        return rejectWithValue(error.response?.data || "Failed to fetch messages");
    }
});

export const sendMessage = createAsyncThunk("chat/sendMessage", async ({ receiver, message }, { getState, rejectWithValue }) => {
    try {
        const loggedInUser = getState().auth.user._id;
        const newMessage = await chatSvc.sendMessage({
            sender: loggedInUser,
            receiver,
            message,
            seen: false,
        });

        return newMessage.data;
    } catch (error) {
        console.error("Error sending message:", error.response ? error.response.data : error.message);
        return rejectWithValue(error.response?.data || "Failed to send message");
    }
});

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        messages: [],
        activeChat: null,
        error: null,
        loading: false,
    },
    reducers: {
        setActiveChat: (state, action) => {
            state.activeChat = action.payload;
            state.messages = [];
        },
        resetActiveChat: (state) => {
            state.activeChat = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.messages = action.payload;
                state.error = null;
                state.loading = false;
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                if (action.payload) {
                    state.messages.push(action.payload);
                }
                state.loading = false;
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export const { setActiveChat, resetActiveChat } = chatSlice.actions;
export default chatSlice.reducer;
