import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";

interface UserDataState {
    name: string;
    index: number;
    group:number;
}

const initialState: UserDataState = {
    name: "",
    index: 0,
    group:1
};

const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        setUserData(state, action: PayloadAction<UserDataState>) {
            state.name = action.payload.name;
            state.index = action.payload.index;
            state.group = action.payload.group;
        },
    },
});

export const { setUserData } = userDataSlice.actions;
export const getUserData = (state: RootState) => state.userData;

export default userDataSlice.reducer;