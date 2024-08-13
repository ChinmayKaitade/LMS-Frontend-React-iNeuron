import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";

function Profile() {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state?.auth?.data);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center">
        {/* Profile Card  */}
        <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
          {/* profile user image */}
          <img
            src={userData?.avatar?.secure_url}
            className="w-40 m-auto rounded-full border-black"
          />

          {/* profile user full name */}
          <h1 className="text-xl font-semibold text-center capitalize">
            {userData?.fullName}
          </h1>

          <div className="grid grid-cols-2">
            {/* user email */}
            <p>
              Email: <p>{userData?.email}</p>
            </p>

            {/* user role */}
            <p>
              Role: <p>{userData?.role}</p>
            </p>

            {/* user subscription */}
            <p>
              Subscription:{" "}
              <p>
                {userData?.subscription?.status === "active"
                  ? "Active"
                  : "Inactive"}
              </p>
            </p>
          </div>

          {/* Buttons section */}
          <div className="flex items-center justify-between gap-2">
            {/* Change Password button */}
            <Link
              to="/changepassword"
              className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center"
            >
              <button>Change Password</button>
            </Link>

            {/* Edit Profile button */}
            <Link
              to="/user/editprofile"
              className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center"
            >
              <button>Edit Profile</button>
            </Link>
          </div>

          {/* subscription cancel logic and cancel button */}
          {userData?.subscription?.status === "active" && (
            <button className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center">
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </HomeLayout>
  );
}

export default Profile;
