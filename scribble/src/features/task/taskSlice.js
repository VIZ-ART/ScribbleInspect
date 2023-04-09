import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { customFetch } from "../../utils/axios";
import {
  addObjectToLocalStorage,
  getObjectFromLocalStorage,
} from "../../utils/localStorage";

const initialState = {
  isLoading: false,
  task: null,
  user: getObjectFromLocalStorage("user"),
};

export const uploadFile = createAsyncThunk(
  "task/uploadFile",
  async (filedata, thunkAPI) => {
    try {
      const { file } = filedata;
      console.log("file : ", file);
      const formData = new FormData();
      formData.append("pdf", file);

      const axiosConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const resp = await customFetch.post(
        "/pdfs/files/",
        formData,
        axiosConfig
      );

      return { pdf: resp.data.link };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.pdf.shift());
    }
  }
);

export const createTask = createAsyncThunk(
  "task/createTask",
  async (task, thunkAPI) => {
    try {
      console.log(task);
      const resp = await customFetch.post("/tasks/addtask", {
        name: task.taskName,
        subject: task.subjectName,
        teacher: task.teacherName,
        difficulty: task.difficulty,
        end_date: task.endDate,
        end_time: task.endTime,
        task_pdf_link: task.taskFile,
        answer_key_link: task.answerKey,
      });
    } catch (error) {
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
    },
    [uploadFile.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      console.log(payload.link);
      return payload.link;
    },
    [uploadFile.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload || "Something went wrong!");
      return null;
    },
    [createTask.pending]: (state) => {
      state.isLoading = true;
    },
    [createTask.fulfilled]: (state, { payload }) => {
      const { task } = payload;
      state.isLoading = false;
      state.task = task;
      toast.success("Created a new task");
    },
    [createTask.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload || "Something went wrong!");
      return null;
    },
  },
});

// export const { handleChange, clearValues } = taskSlice.actions;
export default taskSlice.reducer;
