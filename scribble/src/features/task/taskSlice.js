import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import { getUserFromLocalStorage } from "../../utils/localStorage";

const initialState = {
  isLoading: false,
  taskName: "",
  teacherName: "",
  subjectName: "",
  deadline: "",
  difficultyOptions: ["easy", "medium", "hard"],
  difficulty: "medium",
  statusOptions: ["pending", "submitted", "graded", "requested", "reviewed"],
  status: "pending",
  task: null,
  isEditing: false,
  editTaskId: "",
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      console.log("reducer ", name, value);
      state[name] = value;
    },
  },
});

export const { handleChange } = taskSlice.actions;
export default taskSlice.reducer;
