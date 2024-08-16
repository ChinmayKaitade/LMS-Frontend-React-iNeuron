import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import {
  deleteCourseLectures,
  getCourseLectures,
} from "../../Redux/Slices/LectureSlice";

function DisplayLectures() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { lectures } = useSelector((state) => state.lectures);
  const { role } = useSelector((state) => state.auth);

  // local state for fetching which video user is playing (current video)
  const [currentVideo, setCurrentVideo] = useState(0);

  // on lecture delete
  async function onLectureDelete(courseId, lectureId) {
    console.log(courseId, lectureId);
    await dispatch(
      deleteCourseLectures({ courseId: courseId, lectureId: lectureId })
    );
    await dispatch(getCourseLectures(state._id));
  }

  useEffect(() => {
    if (!state) navigate("/courses");
    dispatch(getCourseLectures(state._id));
  }, []);

  return (
    <HomeLayout>
      {/* display course container */}
      <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 to-white px-[5%]">
        {/* course title */}
        <div className="text-center text-2xl font-semibold text-yellow-500">
          Course Name: {state?.title}
        </div>

        {/* lectures create, view and delete */}
        {lectures && lectures.length > 0 ? (
          <div className="flex justify-center gap-10 w-full">
            {/* left side section for playing video lectures and displaying course details to admin */}
            <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
              {/* lecture video */}
              <video
                src={lectures && lectures[currentVideo]?.lecture?.secure_url}
                className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                controls={true}
                disablePictureInPicture
                muted
                controlsList="nodownload"
              ></video>

              <div>
                {/* lecture title */}
                <h1>
                  <span className="text-yellow-500">Title: </span>
                  {lectures && lectures[currentVideo]?.title}
                </h1>
                <p>
                  <span className="text-yellow-500 line-clamp-4">
                    Description:{" "}
                  </span>
                  {lectures?.lectures[currentVideo]?.description}
                </p>
              </div>
            </div>

            {/* right side section for displaying list of lectures */}
            <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
              <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                <p>Lectures List</p>
                {role === "ADMIN" && (
                  <button
                    onClick={() =>
                      navigate("/course/addlecture", { state: { ...state } })
                    }
                    className="btn-primary px-2 py-1 rounded-md font-semibold text-sm"
                  >
                    Add New Lecture
                  </button>
                )}
              </li>

              {lectures &&
                lectures.map((lecture, idx) => {
                  return (
                    <li key={lecture._id} className="space-y-2">
                      <p
                        className="cursor-pointer"
                        onClick={() => setCurrentVideo(idx)}
                      >
                        <span> Lecture {idx + 1} : </span>
                        {lecture?.title}
                      </p>

                      {role === "ADMIN" && (
                        <button
                          onClick={() =>
                            onLectureDelete(state?._id, lecture?._id)
                          }
                          className="btn-accent px-2 py-1 rounded-md font-semibold text-sm"
                        >
                          Delete Lecture
                        </button>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
        ) : (
          role &&
          role === "ADMIN" && (
            <button
              onClick={() =>
                navigate("/course/addlecture", { state: { ...state } })
              }
              className="btn-primary px-2 py-1 rounded-md font-semibold text-sm"
            >
              Add New Lecture
            </button>
          )
        )}
      </div>
    </HomeLayout>
  );
}

export default DisplayLectures;
