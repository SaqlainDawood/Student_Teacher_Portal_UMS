import React, { useState } from "react";
import {
  MDBCard, MDBCardBody, MDBCardHeader, MDBBtn,
  MDBInput, MDBBadge
} from "mdb-react-ui-kit";

export default function SubmitFeeVoucher() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("Pending");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (file) {
      setStatus("Submitted");
      alert("Voucher submitted successfully!");
    } else {
      alert("Please upload your voucher first!");
    }
  };

  return (
    <MDBCard className="shadow-3 mt-4">
      <MDBCardHeader className="text-center bg-primary text-white">
        <h4>Submit Fee Voucher</h4>
      </MDBCardHeader>
      <MDBCardBody className="text-center">

        {/* File Upload */}
        <MDBInput
          type="file"
          accept="image/*,.pdf"
          onChange={handleFileChange}
          className="mb-3"
        />

        {/* Preview File */}
        {file && (
          <p className="mt-2">
            Uploaded: <strong>{file.name}</strong>
          </p>
        )}

        {/* Status */}
        <div className="mb-3">
          <h6>
            Current Status:{" "}
            <MDBBadge color={status === "Approved" ? "success" : status === "Rejected" ? "danger" : "warning"}>
              {status}
            </MDBBadge>
          </h6>
        </div>

        {/* Submit Button */}
        <MDBBtn color="success" onClick={handleSubmit}>
          Submit Voucher
        </MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
}
