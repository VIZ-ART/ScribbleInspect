import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import { getUserFromLocalStorage } from "../../utils/localStorage";

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
});

export const { handleChange, clearValues } = taskSlice.actions;
export default taskSlice.reducer;
