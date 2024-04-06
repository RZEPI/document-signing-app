import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { UserType } from "../models/UserType";

interface UserTypeState {
  userType: UserType;
}
const initialState: UserTypeState = {
  userType: UserType.User_a,
};

const userTypeSlice = createSlice({
  name: "userType",
  initialState,
  reducers: {
    setUserType(state, action: PayloadAction<UserType>) {
      state.userType = action.payload;
    },
  },
});

export const { setUserType } = userTypeSlice.actions;
export const getUserType = (state: RootState) => state.userType.userType;

export default userTypeSlice.reducer;