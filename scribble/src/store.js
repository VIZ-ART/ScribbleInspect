import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import taskSlice from "./features/task/taskSlice";
import viewTasksSlice from "./features/viewTasks/viewTasksSlice";
import submissionSlice from "./features/submission/submissionSlice";
import statsSlice from "./features/stats/statsSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    task: taskSlice,
    viewTasks: viewTasksSlice,
    submission: submissionSlice,
    stats: statsSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          "task/uploadFile/fulfilled",
          "task/createTask/fulfilled",
          "task/editTask/fulfilled",
          "user/registerUser/fulfilled",
          "tasks/getTeacherTasks/rejected",
          "task/editTask/rejected",
          "submission/submitTask/fulfilled",
          "task/updateScore/fulfilled",
          "task/gradeTask/fulfilled",
        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: ["items.dates"],
      },
    }),
});
