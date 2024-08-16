import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  allUsersCount: 0,
  subscribedCount: 0,
};

// creating asynchronous thunk for getting stats data
export const getStatsData = createAsyncThunk("stats/get", async () => {
  try {
    const response = axiosInstance.get("/admin/stats/users");
    toast.promise(response, {
      loading: "Getting the Stats",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to Load Data Stats",
    });
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const statSlice = createSlice({
  name: "stat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStatsData.fulfilled, (state, action) => {
      state.allUsersCount = action?.payload?.allUsersCount;
      state.subscribedCount = action?.payload?.subscribedUsersCount;
    });
  },
});

export default statSlice.reducer;
