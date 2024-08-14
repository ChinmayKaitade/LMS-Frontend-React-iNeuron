import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
  data:
    localStorage.getItem("data") != undefined
      ? JSON.parse(localStorage.getItem("data"))
      : {},
};

// creating Create Account asynchronous thunk
export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const res = axiosInstance.post("user/register", data);
    toast.promise(res, {
      loading: "Wait! Creating your account",
      success: (data) => {
        return data?.data?.message;
      },

      error: "Failed to Create an User account",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

// creating Login asynchronous thunk
export const login = createAsyncThunk("/auth/login", async (data) => {
  try {
    const res = axiosInstance.post("user/login", data);
    toast.promise(res, {
      loading: "Wait! Authentication in Progress",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to Login account",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

// creating Logout asynchronous thunk
export const logout = createAsyncThunk("/auth/logout", async () => {
  try {
    const res = axiosInstance.post("user/logout");
    toast.promise(res, {
      loading: "Wait! Logout in Progress",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to Logout account",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

// creating update profile asynchronous thunk
export const updateProfile = createAsyncThunk(
  "/user/update/profile",
  async (data) => {
    try {
      const res = axiosInstance.put(`user/update/${data[0]}`, data[1]);
      toast.promise(res, {
        loading: "Wait! Profile Update in Progress",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to Update Profile",
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// creating get user data asynchronous thunk
export const getUserData = createAsyncThunk("/user/details", async () => {
  try {
    const res = axiosInstance.get("user/me");

    return (await res).data;
  } catch (error) {
    toast.error(error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.data = {};
        state.isLoggedIn = false;
        state.role = "";
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      });
  },
});

// export const {} = authSlice.actions;
export default authSlice.reducer;
