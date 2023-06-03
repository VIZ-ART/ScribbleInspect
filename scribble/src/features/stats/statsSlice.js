import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { customFetch } from "../../utils/axios";
import { getObjectFromLocalStorage } from "../../utils/localStorage";

const initialState = {
  isLoading: false,
  pendingTasks: null,
  submittedTasks: null,
  gradedTasks: null,
  ongoingTasks: null,
  completedTasks: null,
  prevResults: [
    { date: "Jul 2021", count: 1 },
    { date: "Aug 2021", count: 4 },
    { date: "Sep 2021", count: 3 },
    { date: "Oct 2021", count: 2 },
    { date: "Nov 2021", count: 2 },
    { date: "Dec 2021", count: 5 },
  ],
};

export const getStats = createAsyncThunk(
  "tasks/getStats",
  async (_, thunkAPI) => {
    try {
      const token = getObjectFromLocalStorage("token");
      const user = getObjectFromLocalStorage("user");
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      };
      const resp = await customFetch.get(
        "/tasks/stats/" + user.id,
        axiosConfig
      );
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStats.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getStats.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.pendingTasks = payload.pending_count || null;
        state.submittedTasks = payload.submitted_count || null;
        state.gradedTasks = payload.graded_count || null;
        state.completedTasks = payload.completed_count || null;
        state.ongoingTasks = payload.ongoing_count || null;
      })
      .addCase(getStats.rejected, (state, { payload }) => {
        state.isLoading = false;
        console.log("Get stats went wrong");
        payload && toast.error(payload);
      });
  },
});

export default statsSlice.reducer;
