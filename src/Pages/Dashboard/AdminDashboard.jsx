import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { deleteCourse, getAllCourses } from "../../Redux/Slices/CourseSlice";
import { getPaymentRecord } from "../../Redux/Slices/RazorpaySlice";
import { getStatsData } from "../../Redux/Slices/StatSlice";

// register ChartJS
ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip
);

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allUsersCount, subscribedCount } = useSelector((state) => state.stat);

  const { allPayments, monthlySalesRecord } = useSelector(
    (state) => state.razorpay
  );

  // handling chart structure
  const userData = {
    labels: ["Registered User", "Enrolled User"],
    fontColor: "white",
    datasets: [
      {
        label: "User Details",
        data: [allUsersCount, subscribedCount],
        backgroundColor: ["yellow", "green"],
        borderWidth: 1,
        borderColor: ["yellow", "green"],
      },
    ],
  };

  const salesData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    fontColor: "white",
    datasets: [
      {
        label: "Sales / Month",
        data: monthlySalesRecord,
        backgroundColor: ["red"],
        borderColor: ["white"],
        borderWidth: 2,
      },
    ],
  };

  const myCourses = useSelector((state) => state?.course?.courseData);

  async function onCourseDelete(id) {
    if (window.confirm("Are You Sure to want to Delete the Course")) {
      const res = await dispatch(deleteCourse(id));
      if (res?.payload?.success) {
        await dispatch(getAllCourses());
      }
    }
  }

  useEffect(() => {
    (async () => {
      await dispatch(getAllCourses());
      await dispatch(getStatsData());
      await dispatch(getPaymentRecord());
    })();
  }, []);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-white">
        {/* dashboard heading */}
        <h1 className="text-center text-5xl font-semibold text-yellow-500">
          Admin Dashboard
        </h1>

        {/* dashboard charts */}
        <div className="grid grid-cols-2 gap-5 m-auto mx-10">
          {/* left side / pie chart side */}
          <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
            {/* pie chart */}
            <div className="w-80 h-80">
              <Pie data={userData} />
            </div>
            {/* Registered Users */}
            <div className="grid grid-cols-2 gap-5">
              <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow">
                {/* registered users count */}
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Registered Users</p>
                  <h3 className="text-4xl font-bold">{allUsersCount}</h3>
                </div>

                {/* users icon */}
                <FaUsers className="text-yellow-500 text-5xl" />
              </div>

              {/* Enrolled Users */}
              <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow">
                {/* enrolled users count */}
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Subscribed Users</p>
                  <h3 className="text-4xl font-bold">{subscribedCount}</h3>
                </div>

                {/* users icon */}
                <FaUsers className="text-green-500 text-5xl" />
              </div>
            </div>
          </div>

          {/* right side /sales data side */}
          <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded">
            {/* bar chart */}
            <div className="h-80 w-full relative">
              <Bar className="absolute bottom-0 h-80 w-full" data={salesData} />
            </div>

            {/* subscription count and revenue */}
            <div className="grid grid-cols-2 gap-5">
              <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow">
                {/* subscription count */}
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Subscription Count</p>
                  <h3 className="text-4xl font-bold">{allPayments?.count}</h3>
                </div>

                {/* count icon */}
                <FcSalesPerformance className="text-yellow-500 text-5xl" />
              </div>

              <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow">
                {/* total revenue */}
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Total Revenue</p>
                  <h3 className="text-4xl font-bold">
                    {allPayments?.count * 499}
                  </h3>
                </div>

                {/* revenue icon */}
                <GiMoneyStack className="text-green-500 text-5xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-[10%] w-[80%] self-center flex flex-col items-center justify-center gap-10 mb-10">
          <div className="flex w-full items-center justify-between">
            {/* courses overview heading */}
            <h1 className="text-center text-3xl font-semibold">
              Courses Overview
            </h1>

            {/* navigate to create new course page */}
            <button
              onClick={() => navigate("/course/create")}
              className="w-fit bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded py-2 px-4 font-semibold text-lg cursor-pointer"
            >
              Create New Course
            </button>
          </div>

          {/* course related data */}
          <table className="table overflow-x-scroll ">
            <thead>
              <tr>
                <th>S No</th>
                <th>Course Title</th>
                <th>Course Category</th>
                <th>Instructor</th>
                <th>Total Lectures</th>
                <th>Descriptions</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {myCourses.map((course, idx) => {
                return (
                  <tr key={course._id}>
                    <td>{idx + 1}</td>
                    <td>
                      <textarea
                        readOnly
                        value={course?.title}
                        className="w-40 h-auto bg-transparent resize-none"
                      ></textarea>
                    </td>
                    <td>{course?.category}</td>
                    <td>{course?.createdBy}</td>
                    <td>{course?.numberOfLectures}</td>
                    <td className="max-w-28 overflow-hidden text-ellipsis whitespace-nowrap">
                      <textarea
                        value={course?.description}
                        readOnly
                        className="w-80 h-auto bg-transparent resize-none"
                      ></textarea>
                    </td>

                    {/* buttons */}
                    <td className="flex items-center gap-4">
                      {/* play video lectures button */}
                      <button
                        className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                        onClick={() =>
                          navigate("/course/displaylectures", {
                            state: { course },
                          })
                        }
                      >
                        <BsCollectionPlayFill />
                      </button>

                      {/* delete course button */}
                      <button
                        className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                        onClick={() => onCourseDelete(course?._id)}
                      >
                        <BsTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </HomeLayout>
  );
}

export default AdminDashboard;
