import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBTable, MDBTableHead, MDBTableBody,
} from 'mdb-react-ui-kit';


const FacDashHome = () => {
 
  return (
    <>
      <MDBTable bordered responsive borderColor='dark' className='mt-4'>
        <MDBTableHead>
          <tr className='table-success'>
            <th scope='col'>sr#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Building</th>
            <th scope='col'>Campus</th>
            <th scope='col'>Class Detail</th>
            <th scope='col'>Time From - Time To</th>
            <th scope='col'>Status</th>
          </tr>
        </MDBTableHead>
      </MDBTable>
    </>
  );
};

export default FacDashHome;


