import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import taskSlice from "./features/task/taskSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    task: taskSlice,
  },
});
