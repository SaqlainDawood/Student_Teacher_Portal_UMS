import React, { useState } from "react";
import {
  MDBCard, MDBCardBody, MDBCardHeader, MDBBtn,
  MDBTable, MDBTableHead, MDBTableBody
} from "mdb-react-ui-kit";

export default function CheckResult() {
  const [showResult, setShowResult] = useState(false);

  // Example data
  const studentInfo = {
    name: "Ali Khan",
    rollNo: "BSCS-2025-001",
    department: "Computer Science",
    semester: "1st Semester (Fall 2025)"
  };

  const subjects = [
    { code: "CS101", name: "Introduction to Programming", marks: 88, grade: "A" },
    { code: "CS102", name: "Discrete Mathematics", marks: 76, grade: "B+" },
    { code: "CS103", name: "Computer Fundamentals", marks: 91, grade: "A+" },
    { code: "ENG101", name: "English Composition", marks: 67, grade: "B" },
  ];

  return (
    <MDBCard className="shadow-3 mt-4">
      <MDBCardHeader className="text-center bg-primary text-white">
        <h4>Check Result</h4>
      </MDBCardHeader>
      <MDBCardBody className="text-center">

        {/* Button to show result */}
        {!showResult ? (
          <MDBBtn color="success" onClick={() => setShowResult(true)}>
            View Result – Fall 2025 (1st Semester)
          </MDBBtn>
        ) : (
          <>
            {/* Student Info */}
            <div className="mb-4 text-start">
              <p><strong>Name:</strong> {studentInfo.name}</p>
              <p><strong>Roll No:</strong> {studentInfo.rollNo}</p>
              <p><strong>Department:</strong> {studentInfo.department}</p>
              <p><strong>Semester:</strong> {studentInfo.semester}</p>
            </div>

            {/* Result Table */}
            <MDBTable bordered hover responsive align="middle">
              <MDBTableHead light>
                <tr>
                  <th>Subject Code</th>
                  <th>Subject Name</th>
                  <th>Marks</th>
                  <th>Grade</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {subjects.map((sub, index) => (
                  <tr key={index}>
                    <td>{sub.code}</td>
                    <td>{sub.name}</td>
                    <td>{sub.marks}</td>
                    <td>{sub.grade}</td>
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>

            {/* GPA / Remarks */}
            <div className="mt-3 text-end">
              <h5>Total GPA: <span className="text-success">3.52</span></h5>
            </div>
          </>
        )}
      </MDBCardBody>
    </MDBCard>
  );
}
