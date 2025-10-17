import React, { useState } from "react";
import {
  MDBCard, MDBCardBody, MDBCardHeader,
  MDBTable, MDBTableHead, MDBTableBody,
  MDBBtn, MDBInput
} from "mdb-react-ui-kit";

export default function AddResult() {
  const [marks, setMarks] = useState({});

  const students = [
    { rollNo: "BSCS-01", name: "Ahmed Raza" },
    { rollNo: "BSCS-02", name: "Sara Ali" },
    { rollNo: "BSCS-03", name: "Hamza Khan" },
  ];

  const handleMarksChange = (rollNo, value) => {
    setMarks({ ...marks, [rollNo]: value });
  };

  return (
    <MDBCard className="shadow-3">
      <MDBCardHeader className="bg-primary text-white">
        <h5>Add Results</h5>
      </MDBCardHeader>
      <MDBCardBody>
        <MDBInput label="Select Class (e.g. BSCS - 1st Semester)" className="mb-3" />

        <MDBTable bordered hover>
          <MDBTableHead light>
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              <th>Marks</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {students.map((s, index) => (
              <tr key={index}>
                <td>{s.rollNo}</td>
                <td>{s.name}</td>
                <td>
                  <MDBInput
                    type="number"
                    value={marks[s.rollNo] || ""}
                    onChange={(e) => handleMarksChange(s.rollNo, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>

        <MDBBtn color="success">Save Results</MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
}
