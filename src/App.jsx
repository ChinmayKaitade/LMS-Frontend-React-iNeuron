import "./App.css";

import { Route, Routes } from "react-router-dom";

import RequireAuth from "./Components/Auth/RequireAuth";
import AboutUs from "./Pages/AboutUs";
import Contact from "./Pages/Contact";
import CourseDescription from "./Pages/Course/CourseDescription";
import CourseList from "./Pages/Course/CourseList";
import CreateCourse from "./Pages/Course/CreateCourse";
import AddLecture from "./Pages/Dashboard/AddLecture";
import DisplayLectures from "./Pages/Dashboard/DisplayLectures";
import Denied from "./Pages/Denied";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import Checkout from "./Pages/Payment/Checkout";
import CheckoutFailure from "./Pages/Payment/CheckoutFailure";
import CheckoutSuccess from "./Pages/Payment/CheckoutSuccess";
import Signup from "./Pages/Signup";
import EditProfile from "./Pages/User/EditProfile";
import Profile from "./Pages/User/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<AboutUs />}></Route>
        <Route path="/courses" element={<CourseList />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/denied" element={<Denied />}></Route>

        <Route
          path="/course/description"
          element={<CourseDescription />}
        ></Route>

        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>

        {/* user is admin or not  */}
        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/course/create" element={<CreateCourse />}></Route>
          <Route path="/course/addlecture" element={<AddLecture />}></Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/editprofile" element={<EditProfile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/checkout/fail" element={<CheckoutFailure />} />
          <Route path="/course/displaylectures" element={<DisplayLectures />} />
        </Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
