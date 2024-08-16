import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from "./Slices/AuthSlice";
import courseSliceReducer from "./Slices/CourseSlice";
import lectureSliceReducer from "./Slices/LectureSlice";
import razorpaySliceReducer from "./Slices/RazorpaySlice";
import StatSlice from "./Slices/StatSlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    course: courseSliceReducer,
    razorpay: razorpaySliceReducer,
    lecture: lectureSliceReducer,
    stat: StatSlice,
  },
  devTools: true,
});

export default store;
