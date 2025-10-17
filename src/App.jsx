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
import StudentAttendance from './StudentDashboard/StudentAttendance'
import FacultyDashboard from './FacultyDashboard/Pages/FacultyDashboard'
import FacultyProfile from './FacultyDashboard/Pages/FacultyProfile'
import AddClass from './FacultyDashboard/Pages/AddNewClass'
import MarkAttendance from './FacultyDashboard/Pages/MarkAttendance'
import AddResult from './FacultyDashboard/Pages/AddResult'
import FacDashHome from './FacultyDashboard/Pages/FacDashHome'
import MultiPartForm from './Forms/Multipartform/Multi_part_form'
import StudentReg from './Forms/Student/StudentReg'
import { useEffect , useState } from 'react'

function App() {
    // const isAuth = !!localStorage.getItem("studentToken"); 
    const [isAuth , setIsAuth] = useState(false);
    useEffect(()=>{
      const token = localStorage.getItem("studentToken")
        if (token) setIsAuth(true);
    } , []);
   return (
    <>
     <Router>
      {/* <Navbar/> */}
      <Routes>
        <Route  path='/' element={<Hero/>}/>
        <Route path = '/student/enroll' element = {<StudentReg/>}/>
         <Route path = '/student/register' element = {<MultiPartForm/>}/>
         <Route path='/student/login' element = {<LoginPage setIsAuth = {setIsAuth}/>}/>
        {/* Student Dashboard Layout with Nested Routes */}
          <Route path="/std"element={isAuth ? <StdDashboard /> : <Navigate to="/student/login" />}>
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="feehistory" element={<StudentFee />} />
            <Route path="result" element={<StudentResult />} />
            <Route path="notes" element={<StudentNotes />} />
            <Route path="attendance" element={<StudentAttendance />} />
          </Route>
               {/* Facult Dashbaord */}
           <Route path="/faculty" element={<FacultyDashboard />}>
            <Route path="dashboard" element={<FacDashHome />} />
            <Route path="addnewclass" element={<AddClass />} />
            <Route path="markattendance" element={<MarkAttendance />} />
            <Route path="addresult" element={<AddResult />} />
            <Route path="profile" element={<FacultyProfile />} />
          </Route>

      </Routes>

      {/* <Footer/> */}
    </Router>
     <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
