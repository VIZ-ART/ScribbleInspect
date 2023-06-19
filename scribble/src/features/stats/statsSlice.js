import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { customFetch } from "../../utils/axios";
import { getObjectFromLocalStorage } from "../../utils/localStorage";

const initialState = {
  isLoading: false,
  pendingTasks: null,
  submittedTasks: null,
  requestedTasks: null,
  ongoingTasks: null,
  completedTasks: null,
  prevResults: [],
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
      .addCase(getStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStats.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.pendingTasks = payload.pending_count || null;
        state.submittedTasks = payload.submitted_count || null;
        state.requestedTasks = payload.requested_count || null;
        state.completedTasks = payload.completed_count || null;
        state.ongoingTasks = payload.ongoing_count || null;
        state.prevResults = payload.graph_stats?.map((item) => {
          return {
            normalizedScore: item.normalized_score,
            taskName: item.task_name,
          };
        });
      })
      .addCase(getStats.rejected, (state, { payload }) => {
        state.isLoading = false;
        payload && toast.error(payload || "Unable to retrieve stats");
      });
  },
});

export default statsSlice.reducer;
