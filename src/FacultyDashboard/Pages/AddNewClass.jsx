import React from "react";
import {
  MDBCard, MDBCardBody, MDBCardHeader, MDBInput, MDBBtn
} from "mdb-react-ui-kit";

export default function AddClass() {
  return (
    <MDBCard className="shadow-3">
      <MDBCardHeader className="bg-primary text-white">
        <h5>Add New Class</h5>
      </MDBCardHeader>
      <MDBCardBody>
        <MDBInput label="Class Title (e.g. BSCS)" className="mb-3" />
        <MDBInput label="Semester (e.g. 1st)" className="mb-3" />
        <MDBInput label="Section (e.g. A)" className="mb-3" />
        <MDBInput label="Department (e.g. Computer Science)" className="mb-3" />
        <MDBInput label="Subject Code (e.g. CS101)" className="mb-3" />
        <MDBInput label="Subject Name (e.g. Programming Fundamentals)" className="mb-3" />

        <MDBBtn color="success">Save Class</MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
}
