import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { customFetch } from "../../utils/axios";
import { getObjectFromLocalStorage } from "../../utils/localStorage";

const initialFiltersState = {
  search: "",
  searchStatus: "all",
  searchSubject: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "nearest", "farthest", "a-z", "z-a"],
};

const initialState = {
  isLoading: false,
  tasks: [],
  totalTasks: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  submissions: {},
  ...initialFiltersState,
};

export const getAllTasks = createAsyncThunk(
  "tasks/getTasks",
  async (_, thunkAPI) => {
    try {
      const { search, searchStatus, searchSubject, sort, page } =
        thunkAPI.getState().viewTasks;
      const token = getObjectFromLocalStorage("token");
      const id = getObjectFromLocalStorage("user").id;

      let url = `/tasks/alltasks/?status=${searchStatus}&subject=${searchSubject}&sort=${sort}&page=${page}&student=${id}`;
      search && (url = url + `&search=${search}`);
      const resp = await customFetch.get(url, {
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
  async (_, thunkAPI) => {
    try {
      const token = getObjectFromLocalStorage("token");
      const id = getObjectFromLocalStorage("user").id;
      const { search, searchStatus, searchSubject, sort, page } =
        thunkAPI.getState().viewTasks;
      let url = `/tasks/gettasks/${id}?status=${searchStatus}&subject=${searchSubject}&sort=${sort}&page=${page}`;
      search && (url = url + `&search=${search}`);
      const resp = await customFetch.get(url, {
        headers: { Authorization: `Bearer ${token.access}` },
      });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getSubmissions = createAsyncThunk(
  "tasks/getSubmissions",
  async (taskId, thunkAPI) => {
    try {
      const token = getObjectFromLocalStorage("token");
      const resp = await customFetch.get("/tasks/getsub/" + taskId, {
        headers: { Authorization: `Bearer ${token.access}` },
      });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
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
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTasks.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.totalTasks = payload.count;
        state.numOfPages = payload.num_pages;
        state.tasks = payload.results.map((item) => {
          let score = Number(item.score);
          score = Number.isInteger(score) ? parseInt(item.score) : score;
          return {
            id: item.id,
            taskName: item.name,
            subjectName: item.subject,
            teacherName: item.teacher,
            maxMarks: item.max_marks,
            endDate: item.end_date,
            endTime: item.end_time,
            task: item.task_pdf_link,
            submission: item.answer_link,
            status: item.status,
            score: score,
          };
        });
      })
      .addCase(getAllTasks.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload || "Get task went wrong :)");
      })
      .addCase(getTeacherTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTeacherTasks.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.totalTasks = payload.count;
        state.numOfPages = payload.num_pages;
        state.tasks = payload.results.map((item) => {
          return {
            id: item.id,
            taskName: item.name,
            subjectName: item.subject,
            teacherName: item.teacher,
            maxMarks: item.max_marks,
            endDate: item.end_date,
            endTime: item.end_time,
            task: item.task_pdf_link,
            answerKey: item.answer_link,
            status: item.status,
            submissionCount: item.submission_count,
          };
        });
      })
      .addCase(getTeacherTasks.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload || "Get task went wrong :)");
      })
      .addCase(getSubmissions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSubmissions.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.submissions = payload.map((item) => {
          return {
            studentName: item.student_name,
            submissionLink: item.submission_link,
            score: item.score,
            status: item.status,
          };
        });
      })
      .addCase(getSubmissions.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload || "Get submissions went wrong :)");
      });
  },
});

export const {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
  openModal,
  closeModal,
} = viewTasksSlice.actions;
export default viewTasksSlice.reducer;
