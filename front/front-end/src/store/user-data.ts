import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { UserData } from "../models/UserData";


const initialState: UserData = new UserData();

const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        setUserData(state, action: PayloadAction<UserData>) {
            state.name = action.payload.name;
            state.index = action.payload.index;
            state.group = action.payload.group;
            return state;
        },
    },
});

export const { setUserData } = userDataSlice.actions;
export const getUserData = (state: RootState) => state.userData;

export default userDataSlice.reducer;