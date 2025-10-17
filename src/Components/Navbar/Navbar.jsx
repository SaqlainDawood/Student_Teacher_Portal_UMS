import React from "react";
import { useState } from "react";
import logoImg from "../../assets/LOGO/logo.png";
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarToggler,
    MDBCollapse,
    MDBDropdown,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBDropdownItem,
} from "mdb-react-ui-kit";

const Navbar = () => {
    const [openNavRight, setOpenNavRight] = useState(false);
    return (
        <MDBNavbar light bgColor="danger" className="custom-navbar">
            <MDBContainer fluid>
                <MDBNavbarBrand>
                    <img
                        src={logoImg}
                        alt="Times University"
                        style={{ height: "40px" }}
                    />
                </MDBNavbarBrand>
                <MDBNavbarToggler
                    type="button"
                    data-target="#navbarRightAlignExample"
                    aria-controls="navbarRightAlignExample"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={() => setOpenNavRight(!openNavRight)}
                >
                    <MDBIcon fab icon="facebook" className="text-white mx-2" />
                    <MDBIcon fab icon="instagram" className="text-white mx-2" />
                    <MDBIcon fab icon="youtube" className="text-white mx-2" />
                    <MDBIcon icon="bars" fas className="text-white mx-2" />
                </MDBNavbarToggler>

                <MDBCollapse navbar open={openNavRight}>
                    <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">

                        <MDBNavbarItem>
                            <MDBDropdown>
                                <MDBDropdown tag="a" className="nav-link nav-link-custom">
                                    Discover TUM
                                </MDBDropdown>
                                {/* <MDBDropdownMenu> */}
                                <MDBDropdownItem link>About Time University</MDBDropdownItem>
                                <MDBDropdownItem link>Meet the Team</MDBDropdownItem>
                                <MDBDropdownItem link>HEC, Islamabad</MDBDropdownItem>
                                <MDBDropdownItem link>The Legal Authority</MDBDropdownItem>
                                <MDBDropdownItem link>Staturory Bodies</MDBDropdownItem>
                                <MDBDropdownItem link>Accreditation From Councils</MDBDropdownItem>
                                <MDBDropdownItem link>Clinical Attachment</MDBDropdownItem>
                                {/* </MDBDropdownMenu> */}
                            </MDBDropdown>
                        </MDBNavbarItem>

                        <MDBNavbarItem>
                            <MDBDropdown>
                                <MDBDropdown tag="a" className="nav-link nav-link-custom">
                                    Messages
                                </MDBDropdown>
                                {/* <MDBDropdownMenu> */}
                                <MDBDropdownItem link>Chancellor / Governor Punjab</MDBDropdownItem>
                                <MDBDropdownItem link>Chief Minister Punjab</MDBDropdownItem>
                                <MDBDropdownItem link>Vice Chancellor / Chairman</MDBDropdownItem>
                                <MDBDropdownItem link>Executive Director</MDBDropdownItem>
                                <MDBDropdownItem link>Pro Vice Chancellor (Academics)</MDBDropdownItem>
                                <MDBDropdownItem link>Registrar</MDBDropdownItem>
                                {/* </MDBDropdownMenu> */}
                            </MDBDropdown>
                        </MDBNavbarItem>

                        <MDBNavbarItem>
                            <MDBDropdown>
                                <MDBDropdown tag="a" className="nav-link nav-link-custom">
                                    Admissions
                                </MDBDropdown>
                                {/* <MDBDropdownMenu> */}
                                <MDBDropdownItem link>MS/M.Phil. Programs</MDBDropdownItem>
                                <MDBDropdownItem link>PhD Programs</MDBDropdownItem>
                                <MDBDropdownItem link>Scholarships</MDBDropdownItem>
                                <MDBDropdownItem link>How to Apply</MDBDropdownItem>
                                <MDBDropdownItem link>Apply for Admission</MDBDropdownItem>
                                {/* </MDBDropdownMenu> */}
                            </MDBDropdown>
                        </MDBNavbarItem>

                        <MDBNavbarItem>
                            <MDBDropdown>
                                <MDBDropdown tag="a" className="nav-link nav-link-custom">
                                    Faculties & Departments
                                </MDBDropdown>
                                {/* <MDBDropdownMenu> */}
                                <MDBDropdown tag="a" className="nav-link nav-link-custom">
                                    Faculties of Law
                                </MDBDropdown>
                                <MDBDropdownItem link>Hajveri Law College</MDBDropdownItem>

                                <MDBDropdown tag="a" className="nav-link">
                                    Faculty of Management Sciences
                                </MDBDropdown>
                                <MDBDropdownItem link>Department of Management Sciences</MDBDropdownItem>
                                <MDBDropdown tag="a" className="nav-link">
                                    Faculty of Medicine and Allied Health Sciences
                                </MDBDropdown>
                                <MDBDropdownItem link>Department of Physical Therapy</MDBDropdownItem>
                                <MDBDropdownItem link>Department of Food Science & Nutrition</MDBDropdownItem>
                                <MDBDropdownItem link>Department of Medical Laboratory Sciences</MDBDropdownItem>
                                <MDBDropdownItem link>Department of Nursing</MDBDropdownItem>
                                <MDBDropdownItem link>Department of Radiology</MDBDropdownItem>
                                <MDBDropdownItem link>Department of Operation Theater</MDBDropdownItem>


                                <MDBDropdown tag="a" className="nav-link">
                                    Faculty of Pharmaceutical Science
                                </MDBDropdown>
                                <MDBDropdownItem link>Javaid College of Pharmaceutical Science</MDBDropdownItem>
                                <MDBDropdown tag="a" className="nav-link">
                                    Faculty of Social Sciences
                                </MDBDropdown>
                                <MDBDropdownItem link>Department of English</MDBDropdownItem>
                                <MDBDropdownItem link> Department of Islamic Studies</MDBDropdownItem>
                                <MDBDropdownItem link> Department of International Relations and Political Science</MDBDropdownItem>
                                <MDBDropdown tag="a" className="nav-link">
                                    Faculty of Science & Technology
                                </MDBDropdown>
                                <MDBDropdownItem link>Department of Chemistry</MDBDropdownItem>
                                <MDBDropdownItem link> Department of Computer Science</MDBDropdownItem>
                            </MDBDropdown>
                        </MDBNavbarItem>

                        <MDBNavbarItem>
                            <MDBDropdown tag="a" className="nav-link nav-link-custom">
                                    On Campus Facilities
                            </MDBDropdown>
                            </MDBNavbarItem>

                         <MDBNavbarItem>
                            <MDBDropdown tag="a" className="nav-link nav-link-custom">
                                  Careers
                            </MDBDropdown>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                            <MDBDropdown tag="a" className="nav-link nav-link-custom">
                                   Contact 
                            </MDBDropdown>
                            </MDBNavbarItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
};

export default Navbar;

