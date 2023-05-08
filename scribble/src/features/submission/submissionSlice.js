import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { customFetch } from "../../utils/axios";
import { getObjectFromLocalStorage } from "../../utils/localStorage";
import { logoutUser } from "../user/userSlice";

const initialState = {
  isLoading: false,
  submission: null,
  taskId: null,
  taskName: "",
  teacherName: "",
  subjectName: "",
};

export const uploadFile = createAsyncThunk(
  "task/uploadFile",
  async (filedata, thunkAPI) => {
    try {
      const { file, callback } = filedata;
      const formData = new FormData();
      formData.append("pdf", file);
      const token = getObjectFromLocalStorage("token");

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
        thunkAPI.dispatch(
          logoutUser({ type: "error", message: "Session expired..." })
        );
        return;
      }
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const submitTask = createAsyncThunk(
  "submission/submitTask",
  async (submission, thunkAPI) => {
    try {
      const token = getObjectFromLocalStorage("token").access;
      const userId = getObjectFromLocalStorage("user").id;
      const { taskId } = thunkAPI.getState().submission;
      console.log(submission);
      const resp = await customFetch.patch(
        "/tasks/submit/",
        {
          task_id: taskId,
          stud_id: userId,
          submission_link: submission,
        },
        {
          Authorization: `Bearer ${token.access}`,
        }
      );

      return resp;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

const submissionSlice = createSlice({
  name: "submission",
  initialState,
  reducers: {
    setSubmissionMode: (state, { payload }) => {
      const { id, taskName, teacherName, subjectName } = payload;
      state.taskId = id;
      state.taskName = taskName;
      state.teacherName = teacherName;
      state.subjectName = subjectName;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.isLoading = true;
        state.fileLink = null;
      })
      .addCase(uploadFile.fulfilled, (state, { payload }) => {
        const { data, callback } = payload;
        const fileLink = data.pdf;
        state.isLoading = false;
        callback(fileLink);
      })
      .addCase(uploadFile.rejected, (state, { payload }) => {
        state.isLoading = false;
        payload && toast.error(payload);
      })
      .addCase(submitTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submitTask.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload.status === 200) toast.success("Submitted task");
      })
      .addCase(submitTask.rejected, (state, { payload }) => {
        state.isLoading = false;
        console.log(payload);
        payload && toast.error(payload);
      });
  },
});

export default submissionSlice.reducer;
export const { setSubmissionMode } = submissionSlice.actions;
