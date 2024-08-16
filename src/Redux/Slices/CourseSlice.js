import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  courseData: [],
};

// creating asynchronous thunk for getAllCourses
export const getAllCourses = createAsyncThunk("/course/get", async () => {
  try {
    const response = axiosInstance.get("/courses");
    toast.promise(response, {
      loading: "Loading course data",
      success: "Courses Loaded Successfully",
      error: "Failed to get the courses",
    });
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

// creating asynchronous thunk for delete course
export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
  try {
    const response = axiosInstance.delete(`/courses/${id}`);
    toast.promise(response, {
      loading: "Deleting course data",
      success: "Courses Deleted Successfully",
      error: "Failed to delete the courses",
    });
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

// creating asynchronous thunk for createNewCourse
export const createNewCourse = createAsyncThunk(
  "/course/create",
  async (data) => {
    try {
      let formData = new FormData();
      formData.append("title", data?.title);
      formData.append("description", data?.description);
      formData.append("category", data?.category);
      formData.append("createdBy", data?.createdBy);
      formData.append("thumbnail", data?.thumbnail);

      const response = axiosInstance.post("/courses", formData);

      toast.promise(response, {
        loading: "Creating New Course",
        success: "Course Created Successfully",
        error: "Failed to Create Course",
      });

      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      if (action.payload) {
        console.log(action.payload);
        state.courseData = [...action.payload];
      }
    });
  },
});

export default courseSlice.reducer;
