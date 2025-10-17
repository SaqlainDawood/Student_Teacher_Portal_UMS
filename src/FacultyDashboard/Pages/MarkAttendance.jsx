import React, { useState } from "react";
import {
  MDBCard, MDBCardBody, MDBCardHeader,
  MDBTable, MDBTableHead, MDBTableBody,
  MDBBtn, MDBInput
} from "mdb-react-ui-kit";

export default function MarkAttendance() {
  const [attendance, setAttendance] = useState({});

  const students = [
    { rollNo: "BSCS-01", name: "Ahmed Raza" },
    { rollNo: "BSCS-02", name: "Sara Ali" },
    { rollNo: "BSCS-03", name: "Hamza Khan" },
  ];

  const toggleAttendance = (rollNo) => {
    setAttendance({
      ...attendance,
      [rollNo]: !attendance[rollNo],
    });
  };

  return (
    <MDBCard className="shadow-3">
      <MDBCardHeader className="bg-primary text-white">
        <h5>Mark Attendance</h5>
      </MDBCardHeader>
      <MDBCardBody>
        <MDBInput label="Select Class (e.g. BSCS - 1st Semester)" className="mb-3" />

        <MDBTable bordered hover>
          <MDBTableHead light>
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              <th>Present</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {students.map((s, index) => (
              <tr key={index}>
                <td>{s.rollNo}</td>
                <td>{s.name}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={attendance[s.rollNo] || false}
                    onChange={() => toggleAttendance(s.rollNo)}
                  />
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>

        <MDBBtn color="success">Save Attendance</MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
}
