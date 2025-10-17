import React, { useState } from "react";
import {
  MDBCard, MDBCardBody, MDBCardHeader, MDBCardTitle,
  MDBCardText, MDBBtn, MDBRow, MDBCol, MDBInput
} from "mdb-react-ui-kit";
import { MDBIcon } from "mdb-react-ui-kit";

export default function BooksNotes() {
  const [search, setSearch] = useState("");

  const notes = [
    {
      subject: "Programming Fundamentals",
      semester: "1st Semester (Fall 2025)",
      fileType: "PDF",
      file: "/downloads/programming-fundamentals.pdf",
    },
    {
      subject: "Discrete Mathematics",
      semester: "1st Semester (Fall 2025)",
      fileType: "DOCX",
      file: "/downloads/discrete-mathematics.docx",
    },
    {
      subject: "Computer Fundamentals",
      semester: "1st Semester (Fall 2025)",
      fileType: "PPT",
      file: "/downloads/computer-fundamentals.ppt",
    },
    {
      subject: "English Composition",
      semester: "1st Semester (Fall 2025)",
      fileType: "ZIP",
      file: "/downloads/english-composition.zip",
    },
  ];

  // Filter notes by search text
  const filteredNotes = notes.filter((note) =>
    note.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-4">
      <MDBCard className="shadow-3">
        <MDBCardHeader className="text-center bg-primary text-white">
          <h4>Books & Notes</h4>
        </MDBCardHeader>
        <MDBCardBody>
          {/* Search Bar */}
          <MDBInput
            label="Search by subject name..."
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4"
          />

          {/* Notes Grid */}
          <MDBRow className="g-4">
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note, index) => (
                <MDBCol md="6" lg="4" key={index}>
                  <MDBCard shadow="0" border="light" background="white" className="h-100">
                    <MDBCardBody>
                      <MDBCardTitle>
                        <MDBIcon fas icon="book" className="me-2 text-primary" />
                        {note.subject}
                      </MDBCardTitle>
                      <MDBCardText>
                        <small className="text-muted">{note.semester}</small>
                      </MDBCardText>
                      <MDBBtn
                        href={note.file}
                        download
                        color="success"
                        size="sm"
                      >
                        <MDBIcon fas icon="download" className="me-2" />
                        Download ({note.fileType})
                      </MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              ))
            ) : (
              <p className="text-center text-muted">No notes found</p>
            )}
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}
