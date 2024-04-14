import { createSlice } from "@reduxjs/toolkit";
import { FileType } from "../models/File";
import { RootState } from ".";

const initialState: FileType = {
  file: null,
};

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setFile(state, action: { payload: File  }) {
      state.file = action.payload;
    },
  },
});

export const { setFile } = fileSlice.actions;
export const getFile = (state: RootState) => state.file.file;
export default fileSlice.reducer;
