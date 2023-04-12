import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import taskSlice from "./features/task/taskSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    task: taskSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["task/uploadFile/fulfilled"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: ["items.dates"],
      },
    }),
});
