import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './Components/Navbar/Navigationbar'
import Hero from './Components/HeroSection/Hero'
import StudentRegistrationForm from './Forms/Student/ApplyNow'
import Footer from './Components/Footer/Footer'
import { ToastContainer} from "react-toastify";
import LoginPage from './Forms/Student/Login'
import {StdDashboard} from './StudentDashboard/StdDashboard'
import DashboardHome from './StudentDashboard/DashboardHome'
import StudentProfile from './StudentDashboard/StudentProfile'
import StudentFee from './StudentDashboard/StudentFee'
import StudentResult from './StudentDashboard/StudentResult'
import StudentNotes from './StudentDashboard/StudentNotes'
import StudentAttendance from './StudentDashboard/StudentAttendance/StudentAttendance'
import FacultyLogin from './FacultyDashboard/Form/Login'
import FacultyDashboard from './FacultyDashboard/Pages/FacultyDashboard'
import FacultyProfile from './FacultyDashboard/Pages/FacultyProfile'
import AddClass from './FacultyDashboard/Pages/AddNewClass'

import AddResult from './FacultyDashboard/Pages/AddResult'
import FacDashHome from './FacultyDashboard/Pages/FacDashHome'
import MultiPartForm from './Forms/Multipartform/Multi_part_form'
import StudentReg from './Forms/Student/StudentReg'
import MarkAttendance from './FacultyDashboard/Pages/Attendance/MarkAttendance'
import AttendanceReport from './FacultyDashboard/Pages/Attendance/AttendanceReport';
import Activities from './FacultyDashboard/Pages/Activities'
import MarkingList from './FacultyDashboard/Pages/MarkingList'
import { useEffect , useState } from 'react'
import MyActivities from './StudentDashboard/MyActivities'
import MyGrades from './StudentDashboard/MyGrades'
import SubmitAssignment from './StudentDashboard/SubmitAssignment'
import TakeQuiz from './StudentDashboard/TakeQuiz'


function App() {
   return (
    <>
     <Router>
      {/* <Navbar/> */}
      <Routes>
        <Route  path='/' element={<Hero/>}/>
        <Route path = '/student/enroll' element = {<StudentReg/>}/>
         <Route path = '/student/register' element = {<MultiPartForm/>}/>
         <Route path='/student/login' element = {<LoginPage/>}/>
         

        {/* Student Dashboard Layout with Nested Routes */}
          <Route path="/std"element={<StdDashboard/>}>
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="feehistory" element={<StudentFee />} />
            <Route path="result" element={<StudentResult />} />
            <Route path="notes" element={<StudentNotes />} />
            <Route path="attendance" element={<StudentAttendance />} />
             <Route path="activities" element={<MyActivities />} />
            <Route path="grades" element={<MyGrades />} />
            <Route path="submit/:activityId" element={<SubmitAssignment />} />
            <Route path="take-quiz/:activityId" element={<TakeQuiz />} />
             <Route index element={<Navigate to="dashboard" replace />} />
          </Route>
               {/* Facult Dashbaord */}
           
           <Route path='/faculty/login'element = {<FacultyLogin/>}/>
           <Route path="/faculty" element={ <FacultyDashboard />}>
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
           <Route path="*" element={<Navigate to ="/" replace />} />
      </Routes>

      {/* <Footer/> */}
    </Router>
     <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
