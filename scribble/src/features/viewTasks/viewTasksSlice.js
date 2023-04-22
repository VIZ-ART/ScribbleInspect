import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { customFetch } from "../../utils/axios";
import { getObjectFromLocalStorage } from "../../utils/localStorage";

const initialFiltersState = {
  search: "",
  searchStatus: "all",
  statusOptions: ["pending", "submitted", "graded", "requested", "reviewed"],
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: false,
  tasks: [],
  totalTasks: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  ...initialFiltersState,
};

export const getAllTasks = createAsyncThunk(
  "tasks/getTasks",
  async (thunkAPI) => {
    try {
      const token = getObjectFromLocalStorage("token");
      const resp = await customFetch.get("/tasks/alltasks", {
        headers: { Authorization: `Bearer ${token.access}` },
      });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getTeacherTasks = createAsyncThunk(
  "tasks/getTeacherTasks",
  async (thunkAPI) => {
    try {
      const token = getObjectFromLocalStorage("token");
      const name = getObjectFromLocalStorage("user").name;
      const resp = await customFetch.get("/tasks/alltasks/" + name, {
        headers: { Authorization: `Bearer ${token.access}` },
      });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.detail.shift().shift()
      );
    }
  }
);

const viewTasksSlice = createSlice({
  name: "viewTasks",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    // getCurrentTaskDetails: (state, { id, callback }) => {
    //   const task = state.tasks.find((item) => item.id === id);
    //   callback(task);
    // },
  },
  extraReducers: {
    [getAllTasks.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllTasks.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.totalTasks = payload.length;
      state.numOfPages = Math.ceil(payload.length / 10);
      state.tasks = payload.map((item) => {
        return {
          id: item.id,
          taskName: item.name,
          subjectName: item.subject,
          teacherName: item.teacher,
          maxMarks: item.max_marks,
          endDate: item.end_date,
          endTime: item.end_time,
          task: item.task_pdf_link,
        };
      });
    },
    [getAllTasks.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload || "Get task went wrong :)");
    },
    [getTeacherTasks.pending]: (state) => {
      state.isLoading = true;
    },
    [getTeacherTasks.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.totalTasks = payload.length;
      state.numOfPages = Math.ceil(payload.length / 10);
      state.tasks = payload.map((item) => {
        return {
          id: item.id,
          taskName: item.name,
          subjectName: item.subject,
          teacherName: item.teacher,
          maxMarks: item.max_marks,
          endDate: item.end_date,
          endTime: item.end_time,
          task: item.task_pdf_link,
          answerKey: item.answer_key_link,
        };
      });
    },
    [getTeacherTasks.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload || "Get task went wrong :)");
    },
  },
});

export const { showLoading, hideLoading } = viewTasksSlice.actions;
export default viewTasksSlice.reducer;
