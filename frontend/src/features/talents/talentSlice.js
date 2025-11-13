import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/talents";

export const fetchTalents = createAsyncThunk("talents/fetchTalents", async (skill) => {
  const url = skill ? `${API_URL}?skill=${skill}` : API_URL;
  const res = await axios.get(url);
  return res.data;
});

export const addTalent = createAsyncThunk("talents/addTalent", async (talent) => {
  const res = await axios.post(API_URL, talent);
  return res.data;
});

const talentSlice = createSlice({
  name: "talents",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    
      .addCase(fetchTalents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTalents.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTalents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTalent.fulfilled, (state, action) => {
        state.data.push(action.payload);
      });
  },
});

export default talentSlice.reducer;
