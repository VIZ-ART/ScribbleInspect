import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { customFetch } from "../../utils/axios";
import {
  addObjectToLocalStorage,
  getObjectFromLocalStorage,
} from "../../utils/localStorage";

const initialState = {
  isLoading: false,
  taskName: "",
  teacherName: "",
  subjectName: "",
  endDate: "2023-01-01",
  endTime: "00:00",
  difficultyOptions: ["easy", "medium", "hard"],
  difficulty: "easy",
  statusOptions: ["pending", "submitted", "graded", "requested", "reviewed"],
  status: "pending",
  task: "",
  answerKey: "",
  isEditing: false,
  editTaskId: "",
};

export const uploadFile = createAsyncThunk(
  "task/uploadFile",
  async (filedata, thunkAPI) => {
    try {
      const { name, file } = filedata;
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

      return { name: name, pdf: resp.data.link };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.pdf.shift());
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,

  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      console.log("reducer ", name, value, typeof value);
      state[name] = value;
    },
    clearValues: () => {
      return initialState;
    },
  },

  extraReducers: {
    [uploadFile.pending]: (state) => {
      state.isLoading = true;
    },
    [uploadFile.fulfilled]: (state, { payload }) => {
      const { name, link } = payload;
      state.isLoading = false;
      state[name] = link;
    },
    [uploadFile.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload || "Something went wrong!");
    },
  },
});

export const { handleChange, clearValues } = taskSlice.actions;
export default taskSlice.reducer;
