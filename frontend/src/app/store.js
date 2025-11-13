import { configureStore } from "@reduxjs/toolkit";
import talentReducer from "../features/talents/talentSlice.js";

export const store = configureStore({
  reducer: {
    talents: talentReducer,
  },
});
