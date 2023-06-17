import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { customFetch } from "../../utils/axios";
import {
  addObjectToLocalStorage,
  getObjectFromLocalStorage,
  removeObjectFromLocalStorage,
} from "../../utils/localStorage";

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getObjectFromLocalStorage("user"),
  token: getObjectFromLocalStorage("token"),
  isTeacher:
    getObjectFromLocalStorage("user")?.userType === "Teacher" ? true : false,
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/users/register", {
        name: user.userName,
        email: user.email,
        password: user.password,
        user_type: user.userType,
      });
      let token = null;
      if (resp.status === 201) {
        token = await customFetch.post("/token/", {
          email: user.email,
          password: user.password,
        });
      }
      return { data: resp.data, token: token.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        Object.values(error.response.data).shift().shift()
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    try {
      const tokenResp = await customFetch.post("/token/", user);
      const Response = { token: tokenResp.data };

      if (tokenResp.status === 200) {
        const userResponse = await customFetch.get("/users/login", {
          headers: { Authorization: `Bearer ${Response.token.access}` },
        });

        Response.data = userResponse.data;
      }

      return Response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state, { payload }) => {
      const { type, message } = payload;
      state.user = null;
      state.isSidebarOpen = false;
      removeObjectFromLocalStorage("user");
      removeObjectFromLocalStorage("token");
      toast[type](message);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const { data, token } = payload;
        const user = {
          userName: data.name,
          email: data.email,
          userType: data.user_type,
          id: data.id,
        };
        state.isLoading = false;
        state.user = user;
        addObjectToLocalStorage("user", user);
        addObjectToLocalStorage("token", token);
        state.isTeacher = user.userType === "Teacher" ? true : false;
        toast.success(`Hello There ${user.userName.split(" ").shift()}`);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { token, data } = payload;
        state.isLoading = false;
        state.token = token;
        const user = {
          userName: data.name,
          email: data.email,
          userType: data.user_type,
          id: data.id,
        };
        state.user = user;
        state.isTeacher = user.userType === "Teacher" ? true : false;
        addObjectToLocalStorage("token", token);
        addObjectToLocalStorage("user", user);
        toast.success(`Welcome Back ${user.userName.split(" ").shift()}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer;
