import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { customFetch } from "../../utils/axios";
import { getObjectFromLocalStorage } from "../../utils/localStorage";
import { logoutUser } from "../user/userSlice";

const initialState = {
  isLoading: false,
  task: null,
};

export const uploadFile = createAsyncThunk(
  "task/uploadFile",
  async (filedata, thunkAPI) => {
    try {
      const { name, file, callback } = filedata;
      const formData = new FormData();
      formData.append("pdf", file);
      const token = getObjectFromLocalStorage("token");
      console.log(token.access);

      const axiosConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token.access}`,
        },
      };

      const resp = await customFetch.post(
        "/pdfs/files/",
        formData,
        axiosConfig
      );

      return { data: resp.data, callback: callback };
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser("Session expired..."));
        return;
      }
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const createTask = createAsyncThunk(
  "task/createTask",
  async (task, thunkAPI) => {
    try {
      const token = getObjectFromLocalStorage("token");
      const resp = await customFetch.post(
        "/tasks/addtask",
        {
          name: task.taskName,
          subject: task.subjectName,
          teacher: task.teacherName,
          difficulty: task.difficulty,
          end_date: task.endDate,
          end_time: task.endTime,
          task_pdf_link: task.task,
          answer_key_link: task.answerKey,
        },
        {
          headers: { Authorization: `Bearer ${token.access}` },
        }
      );
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser("Session expired..."));
        return;
      }
      return thunkAPI.rejectWithValue(
        Object.values(error.response.data).shift().shift()
      );
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,

  reducers: {},

  extraReducers: {
    [uploadFile.pending]: (state) => {
      state.isLoading = true;
      state.fileLink = null;
    },
    [uploadFile.fulfilled]: (state, { payload }) => {
      const { data, callback } = payload;
      const fileLink = data.pdf;
      state.isLoading = false;
      console.log("fulfilled  ", data.pdf);
      callback(fileLink);
    },
    [uploadFile.rejected]: (state, { payload }) => {
      state.isLoading = false;
      payload && toast.error(payload);
    },
    [createTask.pending]: (state) => {
      state.isLoading = true;
    },
    [createTask.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.task = payload;
      toast.success("Created a new task");
    },
    [createTask.rejected]: (state, { payload }) => {
      state.isLoading = false;
      payload && toast.error(payload);
    },
  },
});

export default taskSlice.reducer;
