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
  isLoading: false,
  tasks: [
    {
      _id: "A001",
      name: "Lexical Analyser",
      teacher: "Jasiya Jabbar",
      subject: "Compiler Design",
      difficulty: "Medium",
      end_date: "2023-04-25",
      end_time: "00:00",
      task_pdf_link: "www.google.com",
    },
    {
      _id: "A002",
      name: "AVL Tree Rotation",
      teacher: "Fabi A K",
      subject: "Algorithm Analysis and Design",
      difficulty: "Easy",
      end_date: "2023-04-19",
      end_time: "23:59",
      task_pdf_link: "www.google.com",
    },
    {
      _id: "A003",
      name: "SRS Document",
      teacher: "Aneesh G Nath",
      subject: "Mini Project",
      difficulty: "Hard",
      end_date: "2023-04-30",
      end_time: "16:00",
      task_pdf_link: "www.google.com",
    },
    {
      _id: "A004",
      name: "Graphics Modelling",
      teacher: "Shyna A",
      subject: "Computer Graphics and Image Processing",
      difficulty: "Hard",
      end_date: "2023-04-16",
      end_time: "00:00",
      task_pdf_link: "www.google.com",
    },
  ],
  totalTasks: 2,
  numOfPages: 1,
  page: 1,
  stats: {},
  ...initialFiltersState,
};

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
  },
});

export const { showLoading, hideLoading } = viewTasksSlice.actions;
export default viewTasksSlice.reducer;
