// src/App.jsx
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { StudentAuthProvider, useStudentAuth } from "./context/StudentAuthContext";
import StudentApplyLayout, {
  PublicRoute,
  ProtectedRoute,
  StudentApplyIndex,
} from "./student_apply/StudentApplyLayout";

import StaffLayout, {
  PublicRoute as StaffPublicRoute,
  ProtectedRoute as StaffProtectedRoute,
  StaffIndex,
} from "./staff_apply/StaffLayout";

// Public
import Hero from './Components/HeroSection/Hero'

// Student Auth Pages
import StudentSignup from './student_apply/student_auth/Signup'
import StudentLogin from './student_apply/student_auth/Login'
import VerifyEmail from './student_apply/student_auth/VerifyEmail'
import ForgotPassword from './student_apply/student_auth/ForgotPassword'
import ResetPassword from './student_apply/student_auth/ResetPassword'

// Steps + Profile
import MultiPartForm from './student_apply/Multipartform/Multi_part_form'
import Dashboard from './student_apply/Dashboard'

// Staff / Job Portal Pages
import StaffLogin from './pages/staff/Login'
import StaffSignup from './pages/staff/Signup'
import StaffForgotPassword from './pages/staff/ForgotPassword'
import StaffJobListing from './pages/staff/JobListing'
import StaffApplicationForm from './pages/staff/StaffApplicationForm'
import StaffDashboard from './pages/staff/Dashboard'
import VarifyMail from "./pages/staff/verify-email";
// Faculty
import FacultyLogin from './FacultyDashboard/Form/Login'
import FacultyDashboard from './FacultyDashboard/Pages/FacultyDashboard'
import FacultyProfile from './FacultyDashboard/Pages/FacultyProfile'
import AddClass from './FacultyDashboard/Pages/AddNewClass'
import AddResult from './FacultyDashboard/Pages/AddResult'
import FacDashHome from './FacultyDashboard/Pages/FacDashHome'
import MarkAttendance from './FacultyDashboard/Pages/Attendance/MarkAttendance'
import AttendanceReport from './FacultyDashboard/Pages/Attendance/AttendanceReport'
import Activities from './FacultyDashboard/Pages/Activities'
import MarkingList from './FacultyDashboard/Pages/MarkingList'

function App() {
  return (
    <>
      <StudentAuthProvider>
        <Router>
          <Routes>

            {/* Public home */}
            <Route path="/" element={<Hero />} />

            {/* ============================================== */}
            {/* STUDENT APPLY — nested routes */}
            {/* ============================================== */}
            <Route path="/student/apply" element={<StudentApplyLayout />}>

              {/* /student/apply — smart redirect */}
              <Route index element={<StudentApplyIndex />} />

              {/* Public routes */}
              <Route
                path="signup"
                element={
                  <PublicRoute>
                    <StudentSignup />
                  </PublicRoute>
                }
              />
              <Route
                path="login"
                element={
                  <PublicRoute>
                    <StudentLogin />
                  </PublicRoute>
                }
              />

              {/* Public — accessible without login (email links) */}
              <Route path="verify-email/:token" element={<VerifyEmail />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password/:token" element={<ResetPassword />} />

              {/* Protected routes */}
              <Route
                path="steps"
                element={
                  <ProtectedRoute>
                    <MultiPartForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

            </Route>

            {/* Old routes — redirect */}
            <Route path="/student/signup" element={<Navigate to="/student/apply/signup" replace />} />
            <Route path="/student/login" element={<Navigate to="/student/apply/login" replace />} />
            <Route path="/student/register" element={<Navigate to="/student/apply/steps" replace />} />
            <Route path="/student/dashboard" element={<Navigate to="/student/apply/profile" replace />} />

            {/* ============================================== */}
            {/* STAFF / JOB PORTAL — nested routes */}
            {/* ============================================== */}
            <Route path="/staff/apply" element={<StaffLayout />}>

              {/* /staff/apply — smart redirect */}
              <Route index element={<StaffIndex />} />

              {/* Public routes */}
              <Route
                path="signup"
                element={
                  <StaffPublicRoute>
                    <StaffSignup />
                  </StaffPublicRoute>
                }
              />
              <Route
                path="login"
                element={
                  <StaffPublicRoute>
                    <StaffLogin />
                  </StaffPublicRoute>
                }
              />
              <Route path="forgot-password" element={<StaffForgotPassword />} />
              <Route path="varify-email/:token" element={<VarifyMail />} />

              {/* Protected routes */}
              <Route
                path="jobs"
                element={
                  <StaffProtectedRoute>
                    <StaffJobListing />
                  </StaffProtectedRoute>
                }
              />
              <Route
                path="application"
                element={
                  <StaffProtectedRoute>
                    <StaffApplicationForm />
                  </StaffProtectedRoute>
                }
              />
              <Route
                path="dashboard"
                element={
                  <StaffProtectedRoute>
                    <StaffDashboard />
                  </StaffProtectedRoute>
                }
              />

            </Route>

            {/* ============================================== */}
            {/* FACULTY */}
            {/* ============================================== */}
            <Route path='/faculty/login' element={<FacultyLogin />} />
            <Route path="/faculty" element={<FacultyDashboard />}>
              <Route path="dashboard" element={<FacDashHome />} />
              <Route path="addnewclass" element={<AddClass />} />
              <Route path="addresult" element={<AddResult />} />
              <Route path="profile" element={<FacultyProfile />} />
              <Route path="/faculty/attendance/mark/:classId" element={<MarkAttendance />} />
              <Route path="/faculty/attendance/report/:classId" element={<AttendanceReport />} />
              <Route path="activities" element={<Activities />} />
              <Route path="grading/:activityId" element={<MarkingList />} />
              <Route index element={<Navigate to="dashboard" replace />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </Router>
      </StudentAuthProvider>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;