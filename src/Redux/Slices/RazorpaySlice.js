import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  key: "",
  subscription_id: "",
  isPaymentVerified: false,
  allPayments: {},
  finalMonths: {},
  monthlySalesRecord: [],
};

// creating asynchronous thunk for getting razorPay id
export const getRazorPayId = createAsyncThunk("/razorpay/getId", async () => {
  try {
    const response = await axiosInstance.get("/payments/razorpay-key");
    return response.data;
  } catch (error) {
    toast.error("Failed to Load Data");
  }
});

// creating asynchronous thunk for purchase course bundle
export const purchaseCourseBundle = createAsyncThunk(
  "/purchaseCourse",
  async () => {
    try {
      const response = await axiosInstance.post("/payments/subscribe");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// creating asynchronous thunk for verify user payment
export const verifyUserPayment = createAsyncThunk(
  "/payments/verify",
  async (data) => {
    try {
      const response = await axiosInstance.post("/payments/verify", {
        razorpay_payment_id: data.razorpay_payment_id,
        razorpay_subscription_id: data.razorpay_subscription_id,
        razorpay_signature: data.razorpay_signature,
      });
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// creating asynchronous thunk for get payment record
export const getPaymentRecord = createAsyncThunk(
  "/payments/record",
  async () => {
    try {
      const response = axiosInstance.get("/payments?count=100");
      toast.promise(response, {
        loading: "Getting the Payment Records",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to get Payment Records",
      });
      return (await response).data;
    } catch (error) {
      toast.error("Operation Failed");
    }
  }
);

// creating asynchronous thunk for cancel course subscription
export const cancelCourseBundle = createAsyncThunk(
  "/payments/cancel",
  async () => {
    try {
      const response = axiosInstance.post("/payments/unsubscribe");
      toast.promise(response, {
        loading: "Unsubscribing the Course Bundle",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to Unsubscribe",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const razorpaySlice = {
  name: "razorpay",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRazorPayId.fulfilled, (state, action) => {
        state.key = action?.payload?.key;
      }) // --> getting razorpay id
      .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
        state.subscription_id = action?.payload?.subscription_id;
      }) // --> paid subscription
      .addCase(verifyUserPayment.fulfilled, (state, action) => {
        // console.log(action);
        toast.success(action?.payload?.message);
        state.isPaymentVerified = action?.payload?.success;
      }) // --> verification for payment success
      .addCase(verifyUserPayment.rejected, (state, action) => {
        // console.log(action)
        toast.success(action?.payload?.message);
        state.isPaymentVerified = action?.payload?.success;
      }) // --> verification for payment failed
      .addCase(getPaymentRecord.fulfilled, (state, action) => {
        state.allPayments = action?.payload?.allPayments;
        state.finalMonths = action?.payload?.finalMonths;
        state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
      }); // --> get payment records
  },
};

export default razorpaySlice.reducer;
