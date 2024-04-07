import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";
import {UserDataType} from "../models/UserDataType";


const initialState: UserDataType = {
    name: "",
    index: 0,
    group:1
};

const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        setUserData(state, action: PayloadAction<UserDataType>) {
            state.name = action.payload.name;
            state.index = action.payload.index;
            state.group = action.payload.group;
        },
    },
});

export const { setUserData } = userDataSlice.actions;
export const getUserData = (state: RootState) => state.userData;

export default userDataSlice.reducer;