import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn
} from 'mdb-react-ui-kit';

const Footer = () => {
  return (
     <MDBFooter bgColor='light' className='text-center text-lg-start text-muted shadow-4'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
         <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#3b5998' }}
            href='#!'
            role='button'
          >
            <MDBIcon fab icon='facebook-f' />
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#55acee' }}
            href='#!'
            role='button'
          >
            <MDBIcon fab icon='twitter' />
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#dd4b39' }}
            href='#!'
            role='button'
          >
            <MDBIcon fab icon='google' />
          </MDBBtn>
          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#ac2bac' }}
            href='#!'
            role='button'
          >
            <MDBIcon fab icon='instagram' />
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#0082ca' }}
            href='#!'
            role='button'
          >
            <MDBIcon fab icon='linkedin-in' />
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#333333' }}
            href='#!'
            role='button'
          >
            <MDBIcon fab icon='github' />
          </MDBBtn>
        </div>
      </section>

      <section className='bg-light py-5'> {/* Added background and padding */}
  <MDBContainer>
    {/* Changed to center-align text on mobile, left-align on medium+ */}
    <MDBRow className='text-center text-md-start'>

      {/* -------- Campus Address Column -------- */}
      <MDBCol lg='4' md='6' className='mb-5 mb-md-0'> 
        <div className="d-flex justify-content-center justify-content-md-start">
          <MDBIcon fas icon="map-marker-alt" className="text-primary me-2 fs-5" />
          <h6 className='text-uppercase fw-bold mb-3'>Multan Campus</h6>
        </div>
        <p className="mb-2">
          4-KM Head Muhammad Wala Road, <br />
          Northern Bypass, <br />
          Multan
        </p>

        {/* Added a visual separator for mobile */}
        <hr className="d-md-none my-3" /> 

        <div className="d-flex justify-content-center justify-content-md-start">
          <h6 className='text-uppercase fw-bold mb-3'>City Campus Address</h6>
        </div>
        <p className="mb-0"> {/* Removed margin from last paragraph */}
          Main Road, <br />
          Peer Khursheed Colony, <br />
          Multan
        </p>
      </MDBCol>

      {/* -------- Contact Information Column -------- */}
      <MDBCol lg='4' md='6' className='mb-5 mb-md-0'>
        <div className="d-flex justify-content-center justify-content-md-start">
          <MDBIcon fas icon="phone-volume" className="text-primary me-2 fs-5" />
          <h6 className='text-uppercase fw-bold mb-3'>Contact Us</h6>
        </div>
        
        <div className="mb-2">
          <MDBIcon color='secondary' icon='phone' className='me-2' />
          <strong>UAN:</strong> 
          <a href='tel:+926111111111' className='text-reset text-decoration-none'> +92-61-111-1111</a>
        </div>
        
        <p className="fw-bold mt-3 mb-1">DIRECT ADMISSION LINES</p>
        
        <div className="mb-1">
          <MDBIcon color='secondary' icon='phone' className='me-2' />
          <a href='tel:+923410017777' className='text-reset text-decoration-none'>+92-341-0017777</a>
        </div>
        <div className="mb-1">
          <MDBIcon color='secondary' icon='phone' className='me-2' />
          <a href='tel:+923410017777' className='text-reset text-decoration-none'>+92-341-0017777</a>
        </div>
        
        <div className="mt-3">
          <MDBIcon color='secondary' icon='envelope' className='me-2' />
          <strong>Email:</strong> 
          <a href='#' className='text-reset text-decoration-none'>daud@gmail.com</a>
        </div>
      </MDBCol>

      {/* -------- Map Column -------- */}
      <MDBCol lg='4' md='12' className='mb-4 mb-md-0'> 
        <div className="d-flex justify-content-center justify-content-md-start">
          <MDBIcon fas icon="map-marked-alt" className="text-primary me-2 fs-5" />
          <h6 className='text-uppercase fw-bold mb-3'>Our Location</h6>
        </div>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3476.789012345678!2d71.5249!3d30.1575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDA5JzI3LjAiTiA3McKwMzEnMjkuNyJF!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
            width="100%"
            height="250"
            style={{ border: 0, borderRadius: '10px' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="TIMES University Multan Location"
          ></iframe>
        </div>
      </MDBCol>

    </MDBRow>
  </MDBContainer>
</section>

      <div className=' p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2025 Copyright:
        <a className='text-reset fw-bold cursor-pointer text-black'>
         Times University.All Rights Reserved 
        </a>
      </div>
    </MDBFooter>
  )
}

export default Footer














// import React from 'react'
// import {
//   MDBRow,
//   MDBCol,
//   MDBIcon,
// }
// from 'mdb-react-ui-kit';
// const Footer = () => {
//   return (
//       <div className="Footer-Container" bgColor='light'>
//         <MDBRow className="text-center text-md-start">
//           <MDBCol md={6} className="mb-4">
//             <div className="location">
//               <MDBIcon fas icon="map-marker-alt" className="mb-3" />
//               <h5>MAIN CAMPUS ADDRESS</h5>
//               <p>4-KM Head Muhammad Wala Road,<br />Northern Bypass, Multan</p>
              
//               <h5>CITY CAMPUS ADDRESS</h5>
//               <p>Main Road, Peer Khursheed Colony,<br />Multan</p>
//             </div>
//           </MDBCol>

//           <MDBCol md={4} className="mb-4">
//             <div className="call">

//               <h5>UAN</h5>
//               <p>+92-61-212-5555</p>
              
//               <h5>DIRECT ADMISSION LINES</h5>
//               <p>+92-322-2220380<br />+92-341-0017777</p>
              
//               <h5>EMAIL ADDRESS</h5>
//               <p>registrar@t.edu.pk</p>
//             </div>
//           </MDBCol>

//           <MDBCol md={4}>
//             <div className="map">
//               <MDBIcon fas icon="location-arrow" className="mb-3" />
//               <h5>LOCATION MAP</h5>
              
//               <div className="map-container">
//                 <iframe 
//                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3476.789012345678!2d71.5249!3d30.1575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDA5JzI3LjAiTiA3McKwMzEnMjkuNyJF!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
//                   width="100%"
//                   height="250"
//                   style={{ border: 0, borderRadius: '10px' }}
//                   allowFullScreen=""
//                   loading="lazy"
//                   referrerPolicy="no-referrer-when-downgrade"
//                   title="TIMES University Multan Location"
//                 ></iframe>
//               </div>
//             </div>
//           </MDBCol>
//         </MDBRow>
//       </div>
//   )
// }

// export default Footer