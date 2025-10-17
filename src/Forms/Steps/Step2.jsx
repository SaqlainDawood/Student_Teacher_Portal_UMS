import React from 'react'
import { useState } from 'react';
import { MDBRow,MDBInput, MDBCol, MDBBtn, MDBInputGroup, MDBIcon} from 'mdb-react-ui-kit'
const Step2 = ({onSubmit , onBack}) => {
    const [formData , setFormData ] = useState({
                motherName: '',
                fatherName: '',
                fatherCnic: '',
                fatherMobile: '',
    });

    const handleChange = (e)=>{
        const {name , value } = e.target;
        setFormData({...formData , [name]:value})
            }

    const submit=(e)=>{
            e.preventDefault();

            onSubmit(formData);
    }
  return (
        <form onSubmit={submit}>
                 
      <h4 className="mb-3 text-primary">Family Details</h4>
      <MDBRow className="g-3 mb-4">
        <MDBCol md="6">
          <label className="form-label">Mother Name</label>
          <MDBInput
            label="Mother Name"
            name="motherName"
            value={formData.motherName}
            onChange={handleChange}
          />
        </MDBCol>
        <MDBCol md="6">
          <label className="form-label">Father Name</label>
          <MDBInput
            label="Father Name *"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            required
          />
        </MDBCol>
      </MDBRow>

      {/* Father CNIC & Mobile with icons */}
      <MDBRow className="g-3 mb-2">
        <MDBCol md="6">
          <label className="form-label">Father CNIC</label>
          <MDBInputGroup className="mb-0">
            <span className="input-group-text">
              <MDBIcon fas icon="id-card" />
            </span>
            <input
              type="text"
              className="form-control"
              name="fatherCnic"
              placeholder="xxxxx-xxxxxxx-x"
              inputMode="numeric"
              pattern="[0-9\-]*"
              value={formData.fatherCnic}
              onChange={handleChange}
            />
          </MDBInputGroup>
        </MDBCol>
        <MDBCol md="6">
          <label className="form-label">Father Mobile No</label>
          <MDBInputGroup className="mb-0">
            <span className="input-group-text">
              <MDBIcon fas icon="mobile-alt" />
            </span>
            <input
              type="tel"
              className="form-control"
              name="fatherMobile"
              placeholder="03xx-xxxxxxx"
              value={formData.fatherMobile}
              onChange={handleChange}
            />
          </MDBInputGroup>
        </MDBCol>
      </MDBRow>
       <MDBBtn
       className='me-1'
        type='button'
         onClick={onBack}>Back</MDBBtn>
            <MDBBtn
            className='me-1'
             type='submit'>Next</MDBBtn>
        </form>
  )
}

export default Step2