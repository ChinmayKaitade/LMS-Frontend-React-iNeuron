import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  lectures: [],
};

// creating asynchronous thunk for getting Course lectures
export const getCourseLectures = createAsyncThunk(
  "/course/lecture/get",
  async (cid) => {
    try {
      const response = axiosInstance.get(`/courses/${cid}`);
      toast.promise(response, {
        loading: "Fetching Course Lectures",
        success: "Lectures Fetched Successfully",
        error: "Failed to Load Lectures",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// creating asynchronous thunk for adding Course lectures
export const addCourseLectures = createAsyncThunk(
  "/course/lecture/add",
  async (data) => {
    try {
      // form data for taking input from user to add course lecture
      const formData = new FormData();
      formData.append("lecture", data.lecture);
      formData.append("title", data.title);
      formData.append("description", data.description);

      const response = axiosInstance.post(`/courses/${data.id}`, formData);
      toast.promise(response, {
        loading: "Adding Course Lectures",
        success: "Lectures Added Successfully",
        error: "Failed to Add Lectures",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// creating asynchronous thunk for delete Course lectures
export const deleteCourseLectures = createAsyncThunk(
  "/course/lecture/delete",
  async (data) => {
    try {
      const response = axiosInstance.delete(
        `/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`
      );
      toast.promise(response, {
        loading: "Deleting Course Lectures",
        success: "Lectures Deleted Successfully",
        error: "Failed to Delete Lectures",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourseLectures.fulfilled, (state, action) => {
        // console.log(action)
        state.lectures = action?.payload?.lectures;
      })
      .addCase(addCourseLectures.fulfilled, (state, action) => {
        // console.log(action)
        state.lectures = action?.payload?.course?.lectures;
      });
  },
});

export default lectureSlice.reducer;
