import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";

const initialFiltersState = {
  search: "",
  searchStatus: "all",
  statusOptions: ["pending", "submitted", "graded", "requested", "reviewed"],
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: true,
  tasks: [1, 2, 3],
  totalTasks: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  ...initialFiltersState,
};

const viewTasksSlice = createSlice({
  name: "viewJobs",
  initialState,
});

export default viewTasksSlice.reducer;
