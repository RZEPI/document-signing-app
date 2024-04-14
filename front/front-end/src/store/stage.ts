import { createSlice } from "@reduxjs/toolkit";
import { Stage } from "../models/Stage";
import { RootState } from ".";

type StageState = {
  stage: Stage;
};
const initialState: StageState = { stage: Stage.Pin };

const stageSlice = createSlice({
  name: "stage",
  initialState,
  reducers: {
    setStage(state, action: { payload: Stage }) {
      state.stage = action.payload;
    },
    setNextStage(state) {
      if (state.stage === Stage.Pin) {
        state.stage = Stage.Users_data;
      } else if (state.stage === Stage.Users_data) {
        state.stage = Stage.File_input;
      } else if (state.stage === Stage.File_input) {
        state.stage = Stage.Submit;
      }else if (state.stage === Stage.Submit) {
        state.stage = Stage.Download;
      }
    },
  },
});

export const { setStage,setNextStage } = stageSlice.actions;
export const getStage = (state: RootState) => state.stage.stage;
export default stageSlice.reducer;
