import React from "react";
import {
  MDBCard, MDBCardBody, MDBCardHeader,
  MDBTable, MDBTableHead, MDBTableBody,
  MDBProgress
} from "mdb-react-ui-kit";

export default function CheckAttendance() {
  const attendanceData = [
    { subject: "Programming Fundamentals", total: 40, attended: 35 },
    { subject: "Discrete Mathematics", total: 42, attended: 30 },
    { subject: "Computer Fundamentals", total: 38, attended: 32 },
    { subject: "English Composition", total: 40, attended: 28 },
  ];

  const overallPercentage = Math.round(
    (attendanceData.reduce((acc, sub) => acc + sub.attended, 0) /
      attendanceData.reduce((acc, sub) => acc + sub.total, 0)) * 100
  );

  return (
    <MDBCard className="shadow-3 mt-4">
      <MDBCardHeader className="text-center bg-primary text-white">
        <h4>Attendance Report</h4>
      </MDBCardHeader>
      <MDBCardBody>
        <MDBTable bordered hover responsive align="middle">
          <MDBTableHead light>
            <tr>
              <th>Subject</th>
              <th>Total Classes</th>
              <th>Attended</th>
              <th>Attendance %</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {attendanceData.map((sub, index) => {
              const percentage = Math.round((sub.attended / sub.total) * 100);
              return (
                <tr key={index}>
                  <td>{sub.subject}</td>
                  <td>{sub.total}</td>
                  <td>{sub.attended}</td>
                  <td>
                    <MDBProgress height="20">
                      <div
                        className={`progress-bar ${
                          percentage < 50
                            ? "bg-danger"
                            : percentage < 75
                            ? "bg-warning"
                            : "bg-success"
                        }`}
                        role="progressbar"
                        style={{ width: `${percentage}%` }}
                      >
                        {percentage}%
                      </div>
                    </MDBProgress>
                  </td>
                </tr>
              );
            })}
          </MDBTableBody>
        </MDBTable>

        {/* Overall Attendance */}
        <div className="text-end mt-3">
          <h5>
            Overall Attendance:{" "}
            <span className={overallPercentage < 50 ? "text-danger" : overallPercentage < 75 ? "text-warning" : "text-success"}>
              {overallPercentage}%
            </span>
          </h5>
        </div>
      </MDBCardBody>
    </MDBCard>
  );
}
