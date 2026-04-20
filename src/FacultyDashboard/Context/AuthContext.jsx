import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Faculty State
    const [faculty, setFaculty] = useState(null);
    const [facultyToken, setFacultyToken] = useState(null);
    
    // Student State
    const [student, setStudent] = useState(null);
    const [studentToken, setStudentToken] = useState(null);
    
    // User Type ('faculty', 'student', or null)
    const [userType, setUserType] = useState(null);
    
    // Check local storage on initial load
    useEffect(() => {
        // Check faculty
        const storedFacultyToken = localStorage.getItem('facultyToken');
        const storedFacultyData = localStorage.getItem('facultyData');
        
        if (storedFacultyToken && storedFacultyData) {
            try {
                const parsedFaculty = JSON.parse(storedFacultyData);
                setFaculty(parsedFaculty);
                setFacultyToken(storedFacultyToken);
                setUserType('faculty');
                console.log('✅ Faculty session restored:', parsedFaculty.firstName);
            } catch (error) {
                console.error("Error parsing faculty data:", error);
                localStorage.removeItem('facultyData');
                localStorage.removeItem('facultyToken');
            }
        }
        
        // Check student
        const storedStudentToken = localStorage.getItem('studentToken');
        const storedStudentData = localStorage.getItem('studentData');
        
        if (storedStudentToken && storedStudentData) {
            try {
                const parsedStudent = JSON.parse(storedStudentData);
                setStudent(parsedStudent);
                setStudentToken(storedStudentToken);
                setUserType('student');
                console.log('✅ Student session restored:', parsedStudent.firstName);
            } catch (error) {
                console.error("Error parsing student data:", error);
                localStorage.removeItem('studentData');
                localStorage.removeItem('studentToken');
            }
        }
    }, []);
    
    // Faculty Login
    const loginFaculty = (token, facultyData) => {
        // Clear student data first
        localStorage.removeItem('studentToken');
        localStorage.removeItem('studentData');
        localStorage.removeItem('studentId');
        
        // Set faculty data
        localStorage.setItem('facultyToken', token);
        localStorage.setItem('facultyData', JSON.stringify(facultyData));
        
        setFacultyToken(token);
        setFaculty(facultyData);
        setStudent(null);
        setStudentToken(null);
        setUserType('faculty');
        
        console.log('✅ Faculty logged in:', facultyData.firstName);
    };
    
    // Student Login
    const loginStudent = (token, studentData) => {
        // Clear faculty data first
        localStorage.removeItem('facultyToken');
        localStorage.removeItem('facultyData');
        localStorage.removeItem('facultyId');
        localStorage.removeItem('facultyName');
        localStorage.removeItem('facultyEmail');
        
        // Set student data
        localStorage.setItem('studentToken', token);
        localStorage.setItem('studentData', JSON.stringify(studentData));
        
        setStudentToken(token);
        setStudent(studentData);
        setFaculty(null);
        setFacultyToken(null);
        setUserType('student');
        
        console.log('✅ Student logged in:', studentData.firstName);
    };
    
    // Logout (works for both)
    const logout = () => {
        // Clear all storage
        localStorage.removeItem('facultyToken');
        localStorage.removeItem('facultyData');
        localStorage.removeItem('facultyId');
        localStorage.removeItem('facultyName');
        localStorage.removeItem('facultyEmail');
        localStorage.removeItem('studentToken');
        localStorage.removeItem('studentData');
        localStorage.removeItem('studentId');
        localStorage.removeItem('showConfetti');
        
        // Clear state
        setFaculty(null);
        setFacultyToken(null);
        setStudent(null);
        setStudentToken(null);
        setUserType(null);
        
        console.log('✅ User logged out');
    };
    
    // Update Faculty Profile (optional)
    const updateFaculty = (updatedData) => {
        setFaculty(updatedData);
        localStorage.setItem('facultyData', JSON.stringify(updatedData));
    };
    
    // Update Student Profile (optional)
    const updateStudent = (updatedData) => {
        setStudent(updatedData);
        localStorage.setItem('studentData', JSON.stringify(updatedData));
    };
    
    // Check if authenticated
    const isAuthenticated = userType !== null;
    
    // Get current user
    const currentUser = userType === 'faculty' ? faculty : student;
    
    // Get current token
    const currentToken = userType === 'faculty' ? facultyToken : studentToken;

    const value = {
        // Faculty
        faculty,
        setFaculty,
        facultyToken,
        updateFaculty,
        
        // Student
        student,
        setStudent,
        studentToken,
        updateStudent,
        
        // User Type
        userType,
        setUserType,
        
        // Helpers
        currentUser,
        currentToken,
        isAuthenticated,
        
        // Methods
        loginFaculty,
        loginStudent,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};