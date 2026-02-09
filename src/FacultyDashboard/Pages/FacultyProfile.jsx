import React from "react";
import { MDBNavbar, MDBContainer, MDBTable, MDBTableHead, MDBTableBody, MDBNavbarBrand, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import { useEffect , useState } from "react";
import axios from 'axios'
import FacultyAPI from "../../FacAPI/facultyApi";


export default function FacultyProfile() {
   const [faculty , setFaculty] = useState();
  const [loading , setLoading] = useState(true);
  const [error , setError] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
      const token = localStorage.getItem('facultyToken');
      if(!token){
        navigate("/faculty/login");
      return;
    }
      const fetchtFacultyProfile = async()=>{
        try {
            setLoading(true);
            const res = await FacultyAPI.get('/me',{
              headers:{
                Authorization:`Bearer ${token}`
              }
            })
             if (res.data.success) {
              setFaculty(res.data.faculty);
              } else {
              localStorage.removeItem("facultyToken");
              navigate("/faculty/login");
           }
           
        } catch (error) {
            console.error("Fetch faculty error:", error);
            if (error.response?.status === 401) {
            localStorage.removeItem("facultyToken");
            navigate("/faculty/login");
        }
        }
            finally {
              setLoading(false);
            }
        }
        fetchtFacultyProfile();
  },[navigate])
   if (loading) return <div>Loading faculty data...</div>;

  return (
   <>
    <div className="faculty-update-container">
      <MDBContainer className=" mt-3 py-4" >
      <MDBCard className="shadow-4">
      <MDBCardBody className=''>
          <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="text-info fw-bold"><i className="fas fa-user me-2"></i>Faculty Information </h3>
                <button
                 className="btn btn-outline-success"
                 onClick={()=>navigate('/faculty/dashboard')}
                > ← Back</button>
          </div>
          <MDBTable responsive hover bordered className="align-middle custom-table">
             <MDBTableHead>
                <tr className='text-center table-info'>
                  <th colSpan={4}><i className="fas fa-user me-2"></i>Personal Information</th>
                </tr>
              </MDBTableHead>
               <MDBTableBody>
                 <tr>
                  <th scope='col'>Faculty ID</th>
                  <td className='text-success fw-bold'>{faculty?.employeeID}</td>
                  <th scope='col'>Full Name</th>
                  <td className='text-success fw-bold'>
                  {faculty?.firstName} {faculty?.lastName}
                  </td>
                </tr>
                 <tr>
                  <th scope='col'>Email*</th>
                  <td className='text-success fw-bold'>{faculty?.user?.email}</td>
                  <th scope='col'>Phone Number*</th>
                  <td className='text-success fw-bold'>
                   {faculty?.phone}
                  </td>
                </tr>
                 <tr>
                  <th scope='col'>CNIC</th>
                  <td className='text-success fw-bold'>{faculty?.cnic}</td>
                  <th scope='col'>Date Of Birth</th>
                  <td className='text-success fw-bold'>
                   {faculty?.dateOfBirth}
                  </td>
                </tr>
                 <tr>
                  <th scope='col'>Gender</th>
                  <td className='text-success fw-bold'>{faculty?.gender}</td>
                  <th scope='col'>City</th>
                  <td className='text-success fw-bold'>
                   {faculty?.city}
                  </td>
                </tr>
                 <tr>
                  <th scope='col'>Address</th>
                  <td colSpan={4} className='text-success fw-bold'>{faculty?.address}</td>
                </tr>
                <tr className="table-primary">
                      <th colSpan={4} className="text-center"><i className="fas fa-graduation-cap me-2"></i>Academic Information</th>
                    </tr>
                    <tr>
                      <th scope="col">Department</th>
                      <td className="text-warning fw-bold">{faculty?.department}</td>
                      <th>Designation</th>
                      <td className='text-success fw-bold'>{faculty?.designation}</td>
                      </tr>

                      <tr>
                      <th>Highest Qualification </th>
                      <td className="text-ternary fw-bold">{faculty?.qualification}</td>
                      <th>Specialization</th>
                      <td className='text-info fw-bold'>{faculty?.specialization}</td>
                      </tr>
                      <tr>
                      <th>Experience (Years)</th>
                      <td className='text-ternary fw-bold'>{faculty?.experience} years</td>
                      <th>Joining Date</th>
                      <td>{faculty?.joiningDate}</td>
                    </tr>
                     <tr className="table-success">
                      <th colSpan={4} className="text-center"> <i className="fas fa-wallet me-2"></i> Financial Information</th>
                    </tr>
                    <tr>
                      <th>Monthly Salary (PKR) </th>
                      <td className='text-success fw-bold'>{faculty?.salary}</td>
                      <th>Bank Name</th>
                      <td className='text-info fw-bold'>{faculty?.bankName}</td>
                    </tr>
                    <tr>
                      <th>Account Title </th>
                      <td>{faculty?.accountTitle}</td>
                      <th>Account Number</th>
                      <td>{faculty?.accountNumber}</td>
                    </tr>
                   
                   <tr className="table-danger">
                      <th colSpan={4} className="text-center">Emergency Contact</th>
                    </tr>
                    <tr>
                      <th>Contact Person Name </th>
                      <td>{faculty?.emergencyPerson}</td>
                      <th>Contact Person Phone</th>
                      <td>{faculty?.emergencyContact}</td>
                    </tr>
                    <tr>
                      <th> User Name</th>
                      <td colSpan={3} className='text-success fw-bold'>{faculty?.userName}</td>
                    </tr>
               </MDBTableBody>

          </MDBTable>
      </MDBCardBody>
      </MDBCard>
      </MDBContainer>
    </div>
   </>
  );
}
