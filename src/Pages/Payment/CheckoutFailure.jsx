import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";

function CheckoutFailure() {
  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center text-white">
        {/* card container */}
        <div className="w-80 h-[26rem] flex flex-col justify-center items-center shadow-[0_0_10px_black] rounded-lg relative">
          {/* card heading */}
          <h1 className="bg-red-500 absolute top-0 w-full py-4 text-2xl font-bold rounded rounded-tl-lg rounded-tr-lg text-center">
            Payment Failure
          </h1>

          {/* card desc */}
          <div className="px-4 flex flex-col items-center justify-center space-y-2">
            <div className="text-center space-y-2">
              <h2 className="text-lg font-semibold">
                Oops ! Your Payment Failed
              </h2>
              <p className="text-left">Please try again later.</p>
            </div>

            {/* payment failure icon */}
            <RxCrossCircled className="text-red-500 text-5xl" />
          </div>

          {/* retry link */}
          <Link
            to="/checkout"
            className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full py-2 text-lg font-semibold text-center rounded-br-lg rounded-bl-lg"
          >
            <button>Retry</button>
          </Link>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CheckoutFailure;
