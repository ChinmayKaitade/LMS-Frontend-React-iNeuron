import { useEffect } from "react";
import toast from "react-hot-toast";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import {
  getRazorPayId,
  purchaseCourseBundle,
  verifyUserPayment,
} from "../../Redux/Slices/RazorpaySlice";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // states for fetching razorpay data, i.e razorpayKey, razorpayId, subscriptionId, etc.
  const razorpayKey = useSelector((state) => state?.razorpay?.key);
  const subscription_id = useSelector(
    (state) => state?.razorpay?.subscription_id
  );

  // payment details object
  const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_subscription_id: "",
    razorpay_signature: "",
  };

  // handle subscriptions for course bundle
  async function handleSubscription(e) {
    e.preventDefault();

    // logic to subscription id or razorpayId exist or not if not exist don't proceed further, directly return back
    if (!razorpayKey || !subscription_id) {
      toast.error("Something went Wrong");
      return;
    }

    // options object for processing razorpay data --> razorpayKey, subscriptionId, etc. to Razorpay SDK
    const options = {
      key: razorpayKey,
      subscription: subscription_id,
      name: "Coursify Pvt. Ltd.",
      description: "Subscription",
      theme: {
        color: "#F37254",
      },

      handler: async function (response) {
        paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
        paymentDetails.razorpay_signature = response.razorpay_signature;
        paymentDetails.razorpay_subscription_id =
          response.razorpay_subscription_id;

        toast.success("Payment Successful");

        const res = await dispatch(verifyUserPayment(paymentDetails));

        console.log(res);
        // navigate on the basis of payment status --> success or failed payment
        res?.payload?.success
          ? navigate("/checkout/success")
          : navigate("/checkout/fail");
      },
    };

    // razorpay payment window with custom name and email (with user details)
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  async function load() {
    await dispatch(getRazorPayId());
    await dispatch(purchaseCourseBundle());
  }

  useEffect(() => {
    load();
  }, []);

  // Checkout Page UI
  return (
    <HomeLayout>
      <form
        onSubmit={handleSubscription}
        className="min-h-[90vh] flex items-center justify-center text-white"
      >
        <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
          {/* form heading */}
          <h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">
            Subscription Bundle
          </h1>

          {/* purchase details */}
          <div className="px-4 space-y-5 text-center">
            <p className="text-[17px] ">
              This purchase will allow you to access all available course of our
              platform for{" "}
              <span className="text-yellow-500 font-bold">
                <br />1 Year Duration
              </span>{" "}
              All the existing and new launched courses will be also available
            </p>

            {/* pricing */}
            <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
              <BiRupee /> <span>499</span> Only
            </p>

            {/* terms and conditions */}
            <div className="text-gray-200">
              <p>100% Refund on Cancellation</p>
              <p>* Terms and Conditions Applied *</p>
            </div>

            {/* buy now button */}
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full left-0 text-xl font-bold rounded-bl-lg rounded-br-lg py-2"
            >
              Buy Now
            </button>
          </div>
        </div>
      </form>
    </HomeLayout>
  );
}

export default Checkout;
