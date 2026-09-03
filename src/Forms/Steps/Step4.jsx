// import React, { useState, useEffect } from 'react';
// import { MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';
// import { toast } from 'react-toastify';
// import './Step4.css';

// const Step4 = ({ onSubmit, onBack, initialData }) => {
//   const [enrollmentInfo, setEnrollmentInfo] = useState({
//     program: '',
//     department: '',
//     session: '',
//     semester: '',
//     shift: '',
//     campus: '',
//   });

//   useEffect(() => {
//     if (initialData) {
//       setEnrollmentInfo(initialData);
//     }
//   }, [initialData]);

//   const handleEnrollment = (e) => {
//     const { name, value } = e.target;
//     setEnrollmentInfo((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   useEffect(() => {
//     if (enrollmentInfo.program === "BS") {
//       setEnrollmentInfo((prev) => ({
//         ...prev,
//         semester: "1st Semester",
//       }));
//     } else if (enrollmentInfo.program !== "BS" && !initialData?.semester) {
//       setEnrollmentInfo((prev) => ({
//         ...prev,
//         semester: '',
//       }));
//     }
//   }, [enrollmentInfo.program, initialData]);

//   const submit = (e) => {
//     e.preventDefault();
//     if (!enrollmentInfo.program || !enrollmentInfo.department) {
//       toast.error("Please fill all required fields");
//       return;
//     }
//     onSubmit(enrollmentInfo);
//   };

//   return (
//     <form onSubmit={submit} className="step-form">
//       <h4 className="section-title">
//         <i className="fas fa-check-double"></i> Enrollment Details
//       </h4>

//       <div className="enrollment-summary">
//         <i className="fas fa-info-circle"></i>
//         <div>
//           Please select your program, department, and other enrollment details carefully. 
//           These cannot be changed after submission.
//         </div>
//       </div>

//       <MDBRow className="g-4 mb-4">
//         <MDBCol md="6">
//           <div className="luxury-input-group">
//             <label>Program Name <span className="required-star">*</span></label>
//             <div className="input-icon-wrapper">
//               <i className="fas fa-book-open"></i>
//               <select name="program" value={enrollmentInfo.program} onChange={handleEnrollment} required>
//                 <option value="" disabled>Select Program</option>
//                 <option value="BS">BS (Bachelor of Science)</option>
//                 <option value="ADP">ADP/ADS (Associate Degree)</option>
//                 <option value="MPhill">MPhil (Master of Philosophy)</option>
//                 <option value="PHD">PhD (Doctor of Philosophy)</option>
//               </select>
//             </div>
//           </div>
//         </MDBCol>

//         <MDBCol md="6">
//           <div className="luxury-input-group">
//             <label>Semester <span className="required-star">*</span></label>
//             <div className="input-icon-wrapper">
//               <i className="fas fa-layer-group"></i>
//               <select
//                 name="semester"
//                 value={enrollmentInfo.semester}
//                 onChange={handleEnrollment}
//                 required
//                 disabled={enrollmentInfo.program === 'BS'}
//               >
//                 {enrollmentInfo.program === 'BS' ? (
//                   <option value="1st Semester">1st Semester</option>
//                 ) : (
//                   <>
//                     <option value="" disabled>Select Semester</option>
//                     <option value="1st Semester">1st Semester</option>
//                     <option value="2nd Semester">2nd Semester</option>
//                     <option value="3rd Semester">3rd Semester</option>
//                     <option value="4th Semester">4th Semester</option>
//                     <option value="5th Semester">5th Semester</option>
//                     <option value="6th Semester">6th Semester</option>
//                     <option value="7th Semester">7th Semester</option>
//                     <option value="8th Semester">8th Semester</option>
//                   </>
//                 )}
//               </select>
//             </div>
//           </div>
//         </MDBCol>
//       </MDBRow>

//       <MDBRow className="g-4 mb-4">
//         <MDBCol md="6">
//           <div className="luxury-input-group">
//             <label>Department <span className="required-star">*</span></label>
//             <div className="input-icon-wrapper">
//               <i className="fas fa-university"></i>
//               <select name="department" value={enrollmentInfo.department} onChange={handleEnrollment} required>
//                 <option value="" disabled>Select Department</option>
//                 <optgroup label="Computer & IT">
//                   <option value="Computer Science">Computer Science</option>
//                   <option value="Information Technology">Information Technology</option>
//                   <option value="Software Engineering">Software Engineering</option>
//                   <option value="Artificial Intelligence">Artificial Intelligence</option>
//                   <option value="Data Science">Data Science</option>
//                   <option value="Cyber Security">Cyber Security</option>
//                 </optgroup>
//                 <optgroup label="Engineering">
//                   <option value="Electrical Engineering">Electrical Engineering</option>
//                   <option value="Mechanical Engineering">Mechanical Engineering</option>
//                   <option value="Civil Engineering">Civil Engineering</option>
//                   <option value="Chemical Engineering">Chemical Engineering</option>
//                   <option value="Biomedical Engineering">Biomedical Engineering</option>
//                 </optgroup>
//                 <optgroup label="Business & Management">
//                   <option value="Business Administration">Business Administration (BBA)</option>
//                   <option value="Master of Business Administration">Master of Business Administration (MBA)</option>
//                   <option value="Accounting">Accounting & Finance</option>
//                   <option value="Economics">Economics</option>
//                   <option value="Commerce">Commerce</option>
//                 </optgroup>
//                 <optgroup label="Sciences">
//                   <option value="Mathematics">Mathematics</option>
//                   <option value="Physics">Physics</option>
//                   <option value="Chemistry">Chemistry</option>
//                   <option value="Biology">Biology</option>
//                   <option value="Zoology">Zoology</option>
//                   <option value="Botany">Botany</option>
//                 </optgroup>
//                 <optgroup label="Medical">
//                   <option value="BDS Dentistry">BDS (Dentistry)</option>
//                   <option value="Pharmacy">Pharmacy</option>
//                   <option value="Nursing">Nursing</option>
//                   <option value="Physiotherapy">Physiotherapy</option>
//                 </optgroup>
//                 <optgroup label="Arts & Humanities">
//                   <option value="English">English Literature</option>
//                   <option value="Urdu">Urdu</option>
//                   <option value="History">History</option>
//                   <option value="Islamic Studies">Islamic Studies</option>
//                   <option value="Political Science">Political Science</option>
//                   <option value="Sociology">Sociology</option>
//                   <option value="Psychology">Psychology</option>
//                 </optgroup>
//                 <optgroup label="Education">
//                   <option value="Bachelor of Education">Bachelor of Education (B.Ed)</option>
//                   <option value="Master of Education">Master of Education (M.Ed)</option>
//                 </optgroup>
//               </select>
//             </div>
//           </div>
//         </MDBCol>

//         <MDBCol md="6">
//           <div className="luxury-input-group">
//             <label>Shift <span className="required-star">*</span></label>
//             <div className="input-icon-wrapper">
//               <i className="fas fa-clock"></i>
//               <select name="shift" value={enrollmentInfo.shift} onChange={handleEnrollment} required>
//                 <option value="" disabled>Select Shift</option>
//                 <option value="Morning">Morning (8:00 AM - 1:00 PM)</option>
//                 <option value="Evening">Evening (2:00 PM - 7:00 PM)</option>
//               </select>
//             </div>
//           </div>
//         </MDBCol>
//       </MDBRow>

//       <MDBRow className="g-4 mb-4">
//         <MDBCol md="6">
//           <div className="luxury-input-group">
//             <label>Admission Session <span className="required-star">*</span></label>
//             <div className="input-icon-wrapper">
//               <i className="fas fa-calendar-alt"></i>
//               <select name="session" value={enrollmentInfo.session} onChange={handleEnrollment} required>
//                 <option value="" disabled>Select Session</option>
//                 <option value="Fall-2025">Fall 2025 (September 2025)</option>
//                 <option value="Spring-2025">Spring 2025 (February 2025)</option>
//                 <option value="Fall-2026">Fall 2026 (September 2026)</option>
//               </select>
//             </div>
//           </div>
//         </MDBCol>

//         <MDBCol md="6">
//           <div className="luxury-input-group">
//             <label>Campus <span className="required-star">*</span></label>
//             <div className="input-icon-wrapper">
//               <i className="fas fa-building"></i>
//               <select name="campus" value={enrollmentInfo.campus} onChange={handleEnrollment} required>
//                 <option value="" disabled>Select Campus</option>
//                 <option value="Main">Main Campus (Defence Road)</option>
//                 <option value="City">City Campus (Gulberg)</option>
//                 <option value="Other">Other Campus</option>
//               </select>
//             </div>
//           </div>
//         </MDBCol>
//       </MDBRow>

//       <div className="btn-group-wrapper">
//         <MDBBtn type='button' onClick={onBack} className="btn-back">
//           <i className="fas fa-arrow-left"></i> Back
//         </MDBBtn>
//         <MDBBtn type='submit' className="btn-submit">
//           <i className="fas fa-check-circle"></i> Submit Registration
//         </MDBBtn>
//       </div>
//     </form>
//   );
// };

// export default Step4;


import React, { useState, useEffect, useCallback } from 'react';
import { MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import './Step4.css';

// Base URL for the backend API. Set REACT_APP_API_URL in your .env if the
// backend isn't running on the same host, e.g. REACT_APP_API_URL=http://localhost:8000/api
const API_BASE = process.env.REACT_APP_API_URL || '/api';

const Step4 = ({ onSubmit, onBack, initialData }) => {
  // ----- dropdown data (fetched from backend) -----
  const [campuses, setCampuses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [degreeClasses, setDegreeClasses] = useState([]);
  const [batches, setBatches] = useState([]); // only "new" (currentSemester = 1, active) batches

  // ----- loading flags -----
  const [loadingCampuses, setLoadingCampuses] = useState(false);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [loadingClasses, setLoadingClasses] = useState(false);
  const [loadingBatches, setLoadingBatches] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // ----- the actual selections -----
  const [enrollmentInfo, setEnrollmentInfo] = useState({
    campusId: '',
    campus: '', // plain campus name - this is what the backend enrollment record stores
    departmentId: '',
    degreeClassId: '',
    batchId: '',
  });

  const setField = (name, value) => {
    setEnrollmentInfo((prev) => ({ ...prev, [name]: value }));
  };

  // ---------------------------------------------------------------
  // Step 1: load campuses on mount
  // ---------------------------------------------------------------
  useEffect(() => {
    const loadCampuses = async () => {
      setLoadingCampuses(true);
      try {
        const res = await fetch(`${API_BASE}/campuses?isActive=true`);
        const json = await res.json();
        if (!res.ok || !json.success) throw new Error(json.message || 'Failed to load campuses');
        setCampuses(json.data || []);
      } catch (err) {
        toast.error(err.message || 'Could not load campuses');
      } finally {
        setLoadingCampuses(false);
      }
    };
    loadCampuses();
  }, []);

  // Restore a previously saved selection (e.g. coming back to a draft)
  useEffect(() => {
    if (initialData) {
      setEnrollmentInfo((prev) => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  // ---------------------------------------------------------------
  // Step 2: campus -> departments belonging to that campus
  // ---------------------------------------------------------------
  useEffect(() => {
    if (!enrollmentInfo.campusId) {
      setDepartments([]);
      return;
    }

    const loadDepartments = async () => {
      setLoadingDepartments(true);
      try {
        const res = await fetch(`${API_BASE}/departments?campusId=${enrollmentInfo.campusId}`);
        const json = await res.json();
        if (!res.ok || !json.success) throw new Error(json.message || 'Failed to load departments');
        setDepartments(json.data || []);
      } catch (err) {
        toast.error(err.message || 'Could not load departments');
      } finally {
        setLoadingDepartments(false);
      }
    };
    loadDepartments();
  }, [enrollmentInfo.campusId]);

  // ---------------------------------------------------------------
  // Step 3: department -> classes offered by that department
  // ---------------------------------------------------------------
  useEffect(() => {
    if (!enrollmentInfo.departmentId) {
      setDegreeClasses([]);
      return;
    }

    const loadClasses = async () => {
      setLoadingClasses(true);
      try {
        const res = await fetch(`${API_BASE}/degree-classes?departmentId=${enrollmentInfo.departmentId}`);
        const json = await res.json();
        if (!res.ok || !json.success) throw new Error(json.message || 'Failed to load classes');
        setDegreeClasses(json.data || []);
      } catch (err) {
        toast.error(err.message || 'Could not load classes');
      } finally {
        setLoadingClasses(false);
      }
    };
    loadClasses();
  }, [enrollmentInfo.departmentId]);

  // ---------------------------------------------------------------
  // Step 4: class -> only the "new" batches for that class
  // (status=active & currentSemester=1, i.e. a fresh intake still taking admissions)
  // ---------------------------------------------------------------
  const loadBatches = useCallback(async () => {
    if (!enrollmentInfo.departmentId || !enrollmentInfo.degreeClassId) {
      setBatches([]);
      return;
    }

    setLoadingBatches(true);
    try {
      const params = new URLSearchParams({
        departmentId: enrollmentInfo.departmentId,
        degreeClassId: enrollmentInfo.degreeClassId,
        status: 'active',
        currentSemester: '1',
      });
      const res = await fetch(`${API_BASE}/batches?${params.toString()}`);
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || 'Failed to load batches');

      const list = json.data || [];
      setBatches(list);

      if (list.length === 1) {
        // Only one open batch for this class -> assign it automatically.
        setField('batchId', list[0]._id);
      } else if (list.length > 1) {
        // More than one shift/section is open for this class -> assign the
        // first one automatically (no manual batch picking for the student).
        setField('batchId', list[0]._id);
        toast.info(
          `This class has ${list.length} open sections — assigned to ${list[0].shiftId?.name || 'the first available'} shift automatically.`
        );
      } else {
        setField('batchId', '');
      }
    } catch (err) {
      toast.error(err.message || 'Could not load batches');
    } finally {
      setLoadingBatches(false);
    }
  }, [enrollmentInfo.departmentId, enrollmentInfo.degreeClassId]);

  useEffect(() => {
    loadBatches();
  }, [loadBatches]);

  // ---------------------------------------------------------------
  // handlers
  // ---------------------------------------------------------------
  const handleCampusChange = (e) => {
    const campusId = e.target.value;
    const campusObj = campuses.find((c) => c._id === campusId);
    setEnrollmentInfo({
      campusId,
      campus: campusObj ? campusObj.name : '',
      departmentId: '',
      degreeClassId: '',
      batchId: '',
    });
    setDepartments([]);
    setDegreeClasses([]);
    setBatches([]);
  };

  const handleDepartmentChange = (e) => {
    const departmentId = e.target.value;
    setEnrollmentInfo((prev) => ({
      ...prev,
      departmentId,
      degreeClassId: '',
      batchId: '',
    }));
    setDegreeClasses([]);
    setBatches([]);
  };

  const handleClassChange = (e) => {
    const degreeClassId = e.target.value;
    setEnrollmentInfo((prev) => ({
      ...prev,
      degreeClassId,
      batchId: '',
    }));
    setBatches([]);
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!enrollmentInfo.campusId || !enrollmentInfo.departmentId || !enrollmentInfo.degreeClassId) {
      toast.error('Please select campus, department and class');
      return;
    }
    if (!enrollmentInfo.batchId) {
      toast.error('No open batch (new intake) is available for this class right now');
      return;
    }

    // Backend only needs batchId + campus (a plain name string) — everything
    // else (program, class, shift, session, semester) is derived server-side
    // from the selected Batch document.
    setSubmitting(true);
    try {
      await onSubmit({
        batchId: enrollmentInfo.batchId,
        campus: enrollmentInfo.campus,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} className="step-form">
      <h4 className="section-title">
        <i className="fas fa-check-double"></i> Enrollment Details
      </h4>

      <div className="enrollment-summary">
        <i className="fas fa-info-circle"></i>
        <div>
          Please select your campus, department and class carefully.
          These cannot be changed after submission.
        </div>
      </div>

      <MDBRow className="g-4 mb-4">
        <MDBCol md="6">
          <div className="luxury-input-group">
            <label>Campus <span className="required-star">*</span></label>
            <div className="input-icon-wrapper">
              <i className="fas fa-building"></i>
              <select
                name="campusId"
                value={enrollmentInfo.campusId}
                onChange={handleCampusChange}
                required
                disabled={loadingCampuses}
              >
                <option value="" disabled>
                  {loadingCampuses ? 'Loading campuses...' : 'Select Campus'}
                </option>
                {campuses.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </MDBCol>

        <MDBCol md="6">
          <div className="luxury-input-group">
            <label>Department <span className="required-star">*</span></label>
            <div className="input-icon-wrapper">
              <i className="fas fa-university"></i>
              <select
                name="departmentId"
                value={enrollmentInfo.departmentId}
                onChange={handleDepartmentChange}
                required
                disabled={!enrollmentInfo.campusId || loadingDepartments}
              >
                <option value="" disabled>
                  {!enrollmentInfo.campusId
                    ? 'Select campus first'
                    : loadingDepartments
                    ? 'Loading departments...'
                    : departments.length === 0
                    ? 'No departments at this campus'
                    : 'Select Department'}
                </option>
                {departments.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </MDBCol>
      </MDBRow>

      <MDBRow className="g-4 mb-4">
        <MDBCol md="6">
          <div className="luxury-input-group">
            <label>Class / Program <span className="required-star">*</span></label>
            <div className="input-icon-wrapper">
              <i className="fas fa-book-open"></i>
              <select
                name="degreeClassId"
                value={enrollmentInfo.degreeClassId}
                onChange={handleClassChange}
                required
                disabled={!enrollmentInfo.departmentId || loadingClasses}
              >
                <option value="" disabled>
                  {!enrollmentInfo.departmentId
                    ? 'Select department first'
                    : loadingClasses
                    ? 'Loading classes...'
                    : degreeClasses.length === 0
                    ? 'No classes in this department'
                    : 'Select Class'}
                </option>
                {degreeClasses.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.name} {cls.code ? `(${cls.code})` : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </MDBCol>

        <MDBCol md="6">
          <div className="luxury-input-group">
            <label>Batch (Auto-Assigned)</label>
            <div className="input-icon-wrapper">
              <i className="fas fa-layer-group"></i>
              <input
                type="text"
                readOnly
                value={
                  !enrollmentInfo.degreeClassId
                    ? ''
                    : loadingBatches
                    ? 'Loading...'
                    : enrollmentInfo.batchId
                    ? (() => {
                        const b = batches.find((x) => x._id === enrollmentInfo.batchId);
                        if (!b) return 'Assigned';
                        const parts = [b.degreeClassId?.code || 'Batch'];
                        if (b.startSessionId?.name) parts.push(b.startSessionId.name);
                        if (b.shiftId?.name) parts.push(`(${b.shiftId.name})`);
                        return parts.join(' - ');
                      })()
                    : 'Not available'
                }
                placeholder="Select a class first"
              />
            </div>
            {enrollmentInfo.degreeClassId && !loadingBatches && batches.length === 0 && (
              <small className="text-danger">
                This class has no batch currently accepting new admissions.
              </small>
            )}
            {enrollmentInfo.batchId && (
              <small className="text-muted">
                You'll be enrolled in the 1st semester of this batch automatically.
              </small>
            )}
          </div>
        </MDBCol>
      </MDBRow>

      <div className="btn-group-wrapper">
        <MDBBtn type='button' onClick={onBack} className="btn-back">
          <i className="fas fa-arrow-left"></i> Back
        </MDBBtn>
        <MDBBtn type='submit' className="btn-submit" disabled={submitting}>
          <i className="fas fa-check-circle"></i> {submitting ? 'Submitting...' : 'Submit Registration'}
        </MDBBtn>
      </div>
    </form>
  );
};

export default Step4;