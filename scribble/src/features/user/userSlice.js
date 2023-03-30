import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { customFetch, setHeader } from "../../utils/axios";
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
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/users/register", {
        ...user,
        user_type: user.user,
      });
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    try {
      const tokenResp = await customFetch.post("/token/", user);
      const Response = { token: tokenResp.data };
      console.log(Response.token);
      if (tokenResp.status == 200) {
        const userResponse = await customFetch.get("/users/me", {
          headers: { Authorization: `Bearer ${Response.token.access}` },
        });
        Response.user = userResponse.data;
        console.log(userResponse);
      }

      return Response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

// export const getUserData = createAsyncThunk(
//   "user/getUserData",
//   async (token, thunkAPI) => {
//     try {
//       const resp = await customFetch.post("/users/me", user);
//       console.log(resp.data);
//       return resp.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data.msg);
//     }
//   }
// );

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeObjectFromLocalStorage("user");
      removeObjectFromLocalStorage("token");
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      toast.success(`Hello There ${user.name}`);
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const { token, user } = payload;
      state.isLoading = false;
      state.token = token;
      state.user = user;
      addObjectToLocalStorage("token", token);
      addObjectToLocalStorage("user", user);
      // toast.success(`Welcome Back ${user.name.split(" ").shift()}`);
      toast.success(`Welcome Back ${user.name}`);
    },
    [loginUser.rejected]: (state, { response }) => {
      console.log("Invliad details");
      state.isLoading = false;
      toast.error(response);
    },
  },
});

export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer;
