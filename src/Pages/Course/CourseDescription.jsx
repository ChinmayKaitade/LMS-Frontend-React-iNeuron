import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";

function CourseDescription() {
  const { state } = useLocation();

  const navigate = useNavigate();

  const { role, data } = useSelector((state) => state.auth);

  return (
    <HomeLayout>
      {/* Page / Parent container  */}
      <div className="min-h-[90vh] pt-12 px-20 flex flex-col items-center justify-center text-white">
        {/* Course Card container  */}
        <div className="grid grid-cols-2 gap-10 py-10 relative">
          {/* left part of container containing image, instructor name and no. of lectures  */}
          <div className="space-y-5">
            {/* Course Image  */}
            <img
              src={state?.thumbnail?.secure_url}
              alt="thumbnail"
              className="w-full h-64"
            />

            {/* Course Information  */}
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-between text-xl">
                {/* Number of Lectures  */}
                <p className="font-semibold">
                  <span className="text-yellow-500 font-bold">
                    Total Lectures :{" "}
                  </span>
                  {state?.numberofLectures}
                </p>

                {/* Instructor Name  */}
                <p className="font-semibold">
                  <span className="text-yellow-500 font-bold">
                    Instructor :{" "}
                  </span>
                  {state?.createdBy}
                </p>
              </div>

              {/* Buttons  */}
              {role === "ADMIN" || data?.subscription?.status === "ACTIVE" ? (
                <button className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300">
                  Watch Lectures
                </button>
              ) : (
                <button
                  onClick={() => navigate("/checkout")}
                  className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300"
                >
                  Subscribe
                </button>
              )}
            </div>
          </div>

          {/* right part of container containing course Description and course title  */}
          <div className="space-y-2 text-xl">
            <h1 className="text-3xl font-bold text-yellow-500 mb-5 text-center">
              {state?.title}
            </h1>

            {/* Paragraph Info  */}
            <p className="text-yellow-500">Course Description</p>
            <p>{state?.description}</p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CourseDescription;
