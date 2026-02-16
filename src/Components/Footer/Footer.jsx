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
  const quickLinksCol1 = [
    { label: 'About University', href: '#' },
    { label: 'Admissions', href: '#' },
    { label: 'Academic Calendar', href: '#' },
    { label: 'Library', href: '#' },
    { label: 'Faculty Directory', href: '#' },
    { label: 'Research', href: '#' }
  ];

  const quickLinksCol2 = [
    { label: 'Career Services', href: '#' },
    { label: 'Alumni Portal', href: '#' },
    { label: 'News & Events', href: '#' },
    { label: 'Campus Life', href: '#' },
    { label: 'International Office', href: '#' },
    { label: 'Contact Directory', href: '#' }
  ];

  return (
    <MDBFooter className="custom-footer">
      {/* Main Footer Content */}
      <section className="footer-main py-5">
        <MDBContainer>
          <MDBRow className="g-4">
            {/* Campus Address */}
            <MDBCol lg="4" md="6" className="mb-4">
              <div className="footer-card">
                <div className="footer-card-header">
                  <div className="footer-icon">
                    <MDBIcon icon="map-marker-alt" />
                  </div>
                  <h5>Campus Address</h5>
                </div>
                <div className="footer-card-body">
                  <div className="address-item mb-4">
                    <h6 className="address-title">Main Campus</h6>
                    <p className="address-detail mb-0">
                      4-KM Head Muhammad Wala Road,<br />
                      Northern Bypass, Multan
                    </p>
                  </div>
                  <div className="address-item">
                    <h6 className="address-title">City Campus</h6>
                    <p className="address-detail mb-0">
                      Main Road, Peer Khursheed Colony,<br />
                      Multan
                    </p>
                  </div>
                </div>
              </div>
            </MDBCol>

            {/* Contact Information */}
            <MDBCol lg="4" md="6" className="mb-4">
              <div className="footer-card">
                <div className="footer-card-header">
                  <div className="footer-icon">
                    <MDBIcon icon="phone-volume" />
                  </div>
                  <h5>Contact Information</h5>
                </div>
                <div className="footer-card-body">
                  <div className="contact-item">
                    <div className="contact-icon">
                      <MDBIcon icon="phone" />
                    </div>
                    <div className="contact-content">
                      <span className="contact-label">UAN:</span>
                      <a href="tel:+926111111111" className="contact-value">
                        +92-303-0769752   
                      </a>
                    </div>
                  </div>

                  <div className="contact-section mt-4">
                    <h6 className="section-title mb-3">Admission Helpline</h6>
                    <div className="contact-item">
                      <div className="contact-icon">
                        <MDBIcon icon="phone-alt" />
                      </div>
                      <div className="contact-content">
                        <a href="tel:+923410017777" className="contact-value">
                          +92-319-7111422
                        </a>
                      </div>
                    </div>
                    <div className="contact-item">
                      <div className="contact-icon">
                        <MDBIcon icon="phone-alt" />
                      </div>
                      <div className="contact-content">
                        <a href="tel:+923410017777" className="contact-value">
                          +92 303 0769752
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="contact-item mt-4">
                    <div className="contact-icon">
                      <MDBIcon icon="envelope" />
                    </div>
                    <div className="contact-content">
                      <span className="contact-label">Email:</span>
                      <a href="mailto:info@times.edu.pk" className="contact-value">
                       saqlaindawood123@gmai.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </MDBCol>

            {/* Quick Links */}
            <MDBCol lg="4" md="12" className="mb-4">
              <div className="footer-card">
                <div className="footer-card-header">
                  <div className="footer-icon">
                    <MDBIcon icon="link" />
                  </div>
                  <h5>Quick Links</h5>
                </div>
                <div className="footer-card-body">
                  <div className="quick-links-grid">
                    <div className="quick-links-column">
                      {quickLinksCol1.map((link, index) => (
                        <a key={index} href={link.href} className="quick-link-item">
                          <MDBIcon icon="chevron-right" className="me-2" size="xs" />
                          {link.label}
                        </a>
                      ))}
                    </div>
                    <div className="quick-links-column">
                      {quickLinksCol2.map((link, index) => (
                        <a key={index} href={link.href} className="quick-link-item">
                          <MDBIcon icon="chevron-right" className="me-2" size="xs" />
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      {/* Map & Social Section */}
      <section className="footer-secondary py-4">
        <MDBContainer>
          <MDBRow className="align-items-center g-4">
            <MDBCol lg="8" md="12">
              <div className="map-wrapper">
                <h6 className="map-title mb-3">Find Us on Map</h6>
                <div className="map-container">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3476.789012345678!2d71.5249!3d30.1575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDA5JzI3LjAiTiA3McKwMzEnMjkuNyJF!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
                    width="100%"
                    height="180"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="TIMES University Multan Location"
                  ></iframe>
                </div>
              </div>
            </MDBCol>
            <MDBCol lg="4" md="12">
              <div className="social-wrapper">
                <h6 className="social-title mb-3">Stay Connected</h6>
                <div className="social-buttons">
                  <MDBBtn
                    tag="a"
                    href="#!"
                    className="social-btn facebook"
                    floating
                  >
                    <MDBIcon fab icon="facebook-f" />
                  </MDBBtn>
                  <MDBBtn
                    tag="a"
                    href="#!"
                    className="social-btn twitter"
                    floating
                  >
                    <MDBIcon fab icon="twitter" />
                  </MDBBtn>
                  <MDBBtn
                    tag="a"
                    href="#!"
                    className="social-btn instagram"
                    floating
                  >
                    <MDBIcon fab icon="instagram" />
                  </MDBBtn>
                  <MDBBtn
                    tag="a"
                    href="#!"
                    className="social-btn linkedin"
                    floating
                  >
                    <MDBIcon fab icon="linkedin-in" />
                  </MDBBtn>
                  <MDBBtn
                    tag="a"
                    href="#!"
                    className="social-btn youtube"
                    floating
                  >
                    <MDBIcon fab icon="youtube" />
                  </MDBBtn>
                </div>
                <div className="newsletter mt-4">
                  <p className="newsletter-text mb-2">
                    Subscribe for latest updates
                  </p>
                  <div className="input-group">
                    <input
                      type="email"
                      className="form-control newsletter-input"
                      placeholder="Your email address"
                    />
                    <button className="btn newsletter-btn" type="button">
                      <MDBIcon icon="paper-plane" />
                    </button>
                  </div>
                </div>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      {/* Footer Bottom */}
      <section className="footer-bottom py-3">
        <MDBContainer>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <div className="copyright mb-2 mb-md-0">
              <p className="mb-0">
                © {new Date().getFullYear()} University Management, Multan. All Rights Reserved.
              </p>
            </div>
            <div className="footer-links">
              <a href="#" className="footer-link">Privacy Policy</a>
              <span className="mx-2">•</span>
              <a href="#" className="footer-link">Terms of Service</a>
              <span className="mx-2">•</span>
              <a href="#" className="footer-link">Sitemap</a>
              <span className="mx-2">•</span>
              <a href="#" className="footer-link">Accessibility</a>
            </div>
          </div>
        </MDBContainer>
      </section>
    </MDBFooter>
  );
};

export default Footer;