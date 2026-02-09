import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBCol,
  MDBRow,
  MDBBtn
} from 'mdb-react-ui-kit';
import './Footer.css';

const Footer = () => {
  return (
    <MDBFooter className="custom-footer">
      {/* Top Section */}
      <section className="footer-top">
        <MDBContainer>
          <MDBRow className="g-4">
            <MDBCol lg="4" md="6">
              <div className="footer-widget">
                <div className="widget-header">
                  <MDBIcon icon="map-marker-alt" className="widget-icon" />
                  <h5>Campus Address</h5>
                </div>
                <div className="widget-content">
                  <p><strong>Main Campus:</strong></p>
                  <p className="mb-3">
                    4-KM Head Muhammad Wala Road,<br />
                    Northern Bypass, Multan
                  </p>
                  <p><strong>City Campus:</strong></p>
                  <p>
                    Main Road, Peer Khursheed Colony,<br />
                    Multan
                  </p>
                </div>
              </div>
            </MDBCol>

            <MDBCol lg="4" md="6">
              <div className="footer-widget">
                <div className="widget-header">
                  <MDBIcon icon="phone-volume" className="widget-icon" />
                  <h5>Contact Information</h5>
                </div>
                <div className="widget-content">
                  <div className="contact-item">
                    <MDBIcon icon="phone" className="me-3" />
                    <div>
                      <strong>UAN:</strong>
                      <a href="tel:+926111111111" className="contact-link"> +92-61-111-1111</a>
                    </div>
                  </div>
                  <div className="contact-item mt-3">
                    <h6 className="mb-2">Admission Helpline:</h6>
                    <div className="d-flex align-items-center mb-1">
                      <MDBIcon icon="phone" className="me-2" size="sm" />
                      <a href="tel:+923410017777" className="contact-link">+92-341-0017777</a>
                    </div>
                    <div className="d-flex align-items-center">
                      <MDBIcon icon="phone" className="me-2" size="sm" />
                      <a href="tel:+923410017777" className="contact-link">+92-341-0017777</a>
                    </div>
                  </div>
                  <div className="contact-item mt-3">
                    <MDBIcon icon="envelope" className="me-3" />
                    <div>
                      <strong>Email:</strong>
                      <a href="mailto:info@times.edu.pk" className="contact-link"> info@times.edu.pk</a>
                    </div>
                  </div>
                </div>
              </div>
            </MDBCol>

            <MDBCol lg="4" md="12">
              <div className="footer-widget">
                <div className="widget-header">
                  <MDBIcon icon="link" className="widget-icon" />
                  <h5>Quick Links</h5>
                </div>
                <div className="widget-content">
                  <MDBRow>
                    <MDBCol sm="6">
                      <ul className="quick-links">
                        <li><a href="#">About University</a></li>
                        <li><a href="#">Admissions</a></li>
                        <li><a href="#">Academic Calendar</a></li>
                        <li><a href="#">Library</a></li>
                      </ul>
                    </MDBCol>
                    <MDBCol sm="6">
                      <ul className="quick-links">
                        <li><a href="#">Faculty Directory</a></li>
                        <li><a href="#">Research</a></li>
                        <li><a href="#">Career Services</a></li>
                        <li><a href="#">Alumni</a></li>
                      </ul>
                    </MDBCol>
                  </MDBRow>
                </div>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      {/* Middle Section - Map & Social */}
      <section className="footer-middle">
        <MDBContainer>
          <MDBRow className="align-items-center">
            <MDBCol lg="8" className="mb-4 mb-lg-0">
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3476.789012345678!2d71.5249!3d30.1575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDA5JzI3LjAiTiA3McKwMzEnMjkuNyJF!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
                  width="100%"
                  height="200"
                  style={{ border: 0, borderRadius: '10px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="TIMES University Multan Location"
                ></iframe>
              </div>
            </MDBCol>
            <MDBCol lg="4">
              <div className="social-section text-center text-lg-start">
                <h5 className="mb-3">Connect With Us</h5>
                <div className="social-links">
                  <MDBBtn
                    tag="a"
                    color="link"
                    floating
                    className="social-btn"
                    href="#!"
                  >
                    <MDBIcon fab icon="facebook-f" />
                  </MDBBtn>
                  <MDBBtn
                    tag="a"
                    color="link"
                    floating
                    className="social-btn"
                    href="#!"
                  >
                    <MDBIcon fab icon="twitter" />
                  </MDBBtn>
                  <MDBBtn
                    tag="a"
                    color="link"
                    floating
                    className="social-btn"
                    href="#!"
                  >
                    <MDBIcon fab icon="instagram" />
                  </MDBBtn>
                  <MDBBtn
                    tag="a"
                    color="link"
                    floating
                    className="social-btn"
                    href="#!"
                  >
                    <MDBIcon fab icon="linkedin-in" />
                  </MDBBtn>
                  <MDBBtn
                    tag="a"
                    color="link"
                    floating
                    className="social-btn"
                    href="#!"
                  >
                    <MDBIcon fab icon="youtube" />
                  </MDBBtn>
                </div>
                <p className="mt-3 mb-0">
                  Subscribe to our newsletter for latest updates
                </p>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      {/* Bottom Section */}
      <section className="footer-bottom">
        <MDBContainer>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <div className="mb-3 mb-md-0">
              <p className="mb-0 text-center text-md-start">
                © {new Date().getFullYear()} TIMES University, Multan. All Rights Reserved.
              </p>
            </div>
            <div>
              <a href="#" className="footer-link">Privacy Policy</a>
              <a href="#" className="footer-link mx-3">Terms of Service</a>
              <a href="#" className="footer-link">Sitemap</a>
            </div>
          </div>
        </MDBContainer>
      </section>
    </MDBFooter>
  );
};

export default Footer;