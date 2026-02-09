import React, { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
// Images (keep your existing imports)
import HEDGOP from '../../assets/Caruosel/HEDGOP.jpg';
import HigherEducation from '../../assets/Caruosel/Higher Education Commissioner.jpg';
import PBC from '../../assets/Caruosel/PBC.jpg';
import PCOP from '../../assets/Caruosel/PCOP.jpg';
import PNMW from '../../assets/Caruosel/PNMW.jpg';
import HeroImg from '../../assets/HeroSection/Hero-Section-Img.jpg';
import CHM from '../../assets/HeroCard/ChM.jpg';
import CM from '../../assets/HeroCard/CM.jpg';
import VC from '../../assets/HeroCard/VC.jpg';
import Law from '../../assets/ExploreCourses/Law.png';
import pharmacy from '../../assets/ExploreCourses/pharmacy.png';
import nursing from '../../assets/ExploreCourses/nursing.png';
import ComputerScience from '../../assets/ExploreCourses/computer-science.png';
import IT from '../../assets/ExploreCourses/IT.png';
import AI from '../../assets/ExploreCourses/AI.png';
import BA from '../../assets/ExploreCourses/business-administration.png';
import PT from '../../assets/ExploreCourses/physical-therapy.png';
import Radiology from '../../assets/ExploreCourses/radiology.png';
import ML from '../../assets/ExploreCourses/medical-laboratory.png';
import OP from '../../assets/ExploreCourses/operation-theater.png';
import HN from '../../assets/ExploreCourses/human-nutrition.png';
import PH from '../../assets/ExploreCourses/public-health.png';
import English from '../../assets/ExploreCourses/english.png';
import IR from '../../assets/ExploreCourses/international-relations.png';
import IL from '../../assets/ExploreCourses/islamic-study.png';
import Chemistry from '../../assets/ExploreCourses/chemistry.png';
import student from '../../assets/HeroPortalImages/student-portal.png';
import Job from '../../assets/HeroPortalImages/jobs-portal.png';
import Time from '../../assets/HeroPortalImages/times-journal.png';
import Conovocation from '../../assets/HeroPortalImages/convocation.png';
import Credentials from '../../assets/HeroPortalImages/credentials.png';
import Alumini from '../../assets/HeroPortalImages/alumni.png';
import Faculty from '../../assets/HeroPortalImages/faculty-portal.png';

import {
  MDBContainer,
  MDBCarousel,
  MDBCarouselItem,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBIcon
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navigationbar';
import Footer from '../Footer/Footer';
import './Hero.css'; // New CSS file

const Hero = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      offset: 100,
    });
  }, []);

  const Courses = [
    { id: 1, img: Law, title: 'LAW' },
    { id: 2, img: pharmacy, title: 'Pharmacy' },
    { id: 3, img: nursing, title: 'Nursing' },
    { id: 4, img: ComputerScience, title: 'Computer Science' },
    { id: 5, img: IT, title: 'Information Technology' },
    { id: 6, img: AI, title: 'Artificial Intelligence' },
    { id: 7, img: BA, title: 'Business Administration' },
    { id: 8, img: PT, title: 'Physical Therapy' },
    { id: 9, img: Radiology, title: 'Radiology' },
    { id: 10, img: ML, title: 'Medical Laboratory' },
    { id: 11, img: OP, title: 'Operation Theater' },
    { id: 12, img: HN, title: 'Human Nutrition' },
    { id: 13, img: PH, title: 'Public Health' },
    { id: 14, img: English, title: 'English' },
    { id: 15, img: IR, title: 'International Relations' },
    { id: 16, img: IL, title: 'Islamic Study' },
    { id: 17, img: Chemistry, title: 'Chemistry' },
  ];

  const StudentPortal = [
    { id: 1, img: student, title: 'Student Portal', path: '/std/dashboard' },
    { id: 2, img: Job, title: 'Job Application', path: '/' },
    { id: 3, img: Time, title: 'Times Journal', path: '/' },
    { id: 4, img: Conovocation, title: 'Convocation Portal', path: '/' },
    { id: 5, img: Credentials, title: 'Credentials Verification', path: '/' },
    { id: 6, img: Alumini, title: 'Alumni Portal', path: '/' },
    { id: 7, img: Faculty, title: 'Faculty Portal', path: '/faculty/login' },
  ];

  const quickFacts = [
    { id: 1, number: '1 in 4', icon: 'hand-holding-usd', title: 'Students Receive', desc: 'Financial aid and scholarships to support their education.' },
    { id: 2, number: '06', icon: 'user-graduate', title: 'PhD Programs', desc: 'Advanced research-based programs across multiple disciplines.' },
    { id: 3, number: '17', icon: 'book-reader', title: 'MS / MPhil Programs', desc: 'High-quality postgraduate education for professional growth.' },
    { id: 4, number: '14', icon: 'university', title: 'Academic Departments', desc: 'Dedicated departments to enhance specialized learning.' },
    { id: 5, number: '07', icon: 'chalkboard-teacher', title: 'Approved Faculties', desc: 'Expert faculty members with strong academic backgrounds.' },
    { id: 6, number: '08', icon: 'laptop-code', title: 'BS Programs', desc: 'Modern undergraduate programs designed for innovation.' },
  ];

  return (
    <>
      <Navbar />
      
      {/* === HERO SECTION === */}
      <section className="hero-section">
        <div className="hero-overlay">
          <MDBContainer>
            <MDBRow className="align-items-center min-vh-90">
              <MDBCol lg="6" className="mb-5 mb-lg-0">
                <div className="hero-content" data-aos="fade-right">
                  <h1 className="hero-title">
                    <span className="gradient-text">University Management</span>
                    <br />
                    Shaping Future Leaders
                  </h1>
                  <p className="hero-subtitle">
                    A premier institution dedicated to academic excellence, innovation, 
                    and holistic development in the heart of Multan.
                  </p>
                  <div className="hero-buttons">
                    <MDBBtn
                      tag={Link}
                      to="/student/login"
                      className="btn-primary-rounded"
                      size="lg"
                    >
                      <MDBIcon icon="user-edit" className="me-2" />
                      Apply Now
                    </MDBBtn>
                    <MDBBtn
                      tag="a"
                      href="../../../public/Prospectus/TIMES-Prospectus-2025.pdf"
                      target="_blank"
                      className="btn-outline-light"
                      size="lg"
                    >
                      <MDBIcon icon="file-alt" className="me-2" />
                      Download Prospectus
                    </MDBBtn>
                  </div>
                </div>
              </MDBCol>
              <MDBCol lg="6">
                <div className="hero-stats" data-aos="fade-left">
                  <MDBRow>
                    <MDBCol md="6" className="mb-4">
                      <div className="stat-card">
                        <h3 className="stat-number">5000+</h3>
                        <p className="stat-label">Students Enrolled</p>
                      </div>
                    </MDBCol>
                    <MDBCol md="6" className="mb-4">
                      <div className="stat-card">
                        <h3 className="stat-number">200+</h3>
                        <p className="stat-label">Faculty Members</p>
                      </div>
                    </MDBCol>
                    <MDBCol md="6" className="mb-4">
                      <div className="stat-card">
                        <h3 className="stat-number">50+</h3>
                        <p className="stat-label">Programs Offered</p>
                      </div>
                    </MDBCol>
                    <MDBCol md="6" className="mb-4">
                      <div className="stat-card">
                        <h3 className="stat-number">98%</h3>
                        <p className="stat-label">Graduate Employability</p>
                      </div>
                    </MDBCol>
                  </MDBRow>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </section>

      {/* === PARTNERS CAROUSEL === */}
      <section className="partners-section py-5">
        <MDBContainer>
          <h2 className="section-title text-center mb-5" data-aos="fade-up">
            Accredited & Recognized By
          </h2>
          <div className="partners-carousel" data-aos="zoom-in">
            <MDBCarousel showControls interval={2500}>
              <MDBCarouselItem>
                <div className="partners-grid">
                  <MDBCard className="partner-card">
                    <MDBCardImage src={HEDGOP} alt="HEDGOP" />
                  </MDBCard>
                  <MDBCard className="partner-card">
                    <MDBCardImage src={HigherEducation} alt="HigherEducation" />
                  </MDBCard>
                  <MDBCard className="partner-card">
                    <MDBCardImage src={PBC} alt="PBC" />
                  </MDBCard>
                  <MDBCard className="partner-card">
                    <MDBCardImage src={PCOP} alt="PCOP" />
                  </MDBCard>
                  <MDBCard className="partner-card">
                    <MDBCardImage src={PNMW} alt="PNMW" />
                  </MDBCard>
                </div>
              </MDBCarouselItem>
            </MDBCarousel>
          </div>
        </MDBContainer>
      </section>

      {/* === ABOUT UNIVERSITY === */}
      <section className="about-section py-6">
        <MDBContainer>
          <MDBRow className="align-items-center">
            <MDBCol lg="6" className="mb-5 mb-lg-0">
              <div className="about-content" data-aos="fade-right">
                <h6 className="section-subtitle">ABOUT TIMES UNIVERSITY</h6>
                <h2 className="section-title mb-4">
                  Where Excellence Meets <span className="highlight">Opportunity</span>
                </h2>
                <p className="lead-text mb-4">
                  TIMES University Multan stands as a beacon of academic excellence and innovation, 
                  dedicated to shaping the future of education in Southern Punjab.
                </p>
                <p className="mb-4">
                  Our institution is committed to offering world-class education that meets global 
                  standards through diverse programs, exceptional faculty, and state-of-the-art facilities.
                </p>
                <MDBBtn color="primary" className="btn-learn-more">
                  Explore Our Campus <MDBIcon icon="arrow-right" className="ms-2" />
                </MDBBtn>
              </div>
            </MDBCol>
            <MDBCol lg="6">
              <div className="about-image-wrapper" data-aos="fade-left">
                <div className="image-card">
                  <img src={HeroImg} alt="Campus View" className="img-fluid rounded-3" />
                </div>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      {/* === LEADERSHIP SECTION === */}
      <section className="leadership-section py-6 bg-light">
        <MDBContainer>
          <div className="text-center mb-6" data-aos="fade-up">
            <h6 className="section-subtitle">MEET OUR LEADERS</h6>
            <h2 className="section-title">University Leadership</h2>
            <p className="section-description">
              Guided by visionary leaders dedicated to academic excellence
            </p>
          </div>
          <MDBRow>
            {[CHM, CM, VC].map((img, index) => {
              const titles = [
                'SARDAR SALEEM HAIDER - Governor Punjab / Chancellor',
                'MS. MARYAM NAWAZ SHARIF - Chief Minister Punjab',
                'M. SARFRAZ MUZAFFAR - Chairman / Vice Chancellor'
              ];
              return (
                <MDBCol lg="4" md="6" className="mb-4" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                  <MDBCard className="leadership-card">
                    <div className="card-header-overlay">
                      <MDBCardTitle className="text-white mb-0">
                        {titles[index].split(' - ')[0]}
                      </MDBCardTitle>
                    </div>
                    <MDBCardImage src={img} alt={titles[index]} className="leader-image" />
                    <MDBCardBody className="text-center">
                      <MDBCardTitle className="leader-name">
                        {titles[index].split(' - ')[0]}
                      </MDBCardTitle>
                      <MDBCardText className="leader-position text-primary">
                        {titles[index].split(' - ')[1]}
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              );
            })}
          </MDBRow>
        </MDBContainer>
      </section>

      {/* === MISSION & VISION === */}
      <section className="mission-vision-section py-6">
        <MDBContainer>
          <MDBRow>
            <MDBCol lg="6" className="mb-5 mb-lg-0">
              <div className="mission-card" data-aos="fade-right">
                <div className="card-icon">
                  <MDBIcon icon="bullseye" size="3x" />
                </div>
                <h3 className="card-title">Our Mission</h3>
                <p className="card-text">
                  To offer higher education that enables the youth of Southern Punjab by instilling 
                  morality, pragmatism, and enlightened sensitivity, producing knowledgeable workers 
                  who can broaden their vision to see beyond conventional boundaries at an affordable cost.
                </p>
              </div>
            </MDBCol>
            <MDBCol lg="6">
              <div className="vision-card" data-aos="fade-left">
                <div className="card-icon">
                  <MDBIcon icon="eye" size="3x" />
                </div>
                <h3 className="card-title">Our Vision</h3>
                <p className="card-text">
                  To be acknowledged as a leading seat of higher learning dedicated to excellence in 
                  education, research, and community development, shaping future leaders who contribute 
                  meaningfully to society and the global community.
                </p>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      {/* === COURSES SECTION === */}
      <section className="courses-section py-6 bg-light">
        <MDBContainer>
          <div className="text-center mb-6" data-aos="fade-up">
            <h6 className="section-subtitle">ACADEMIC PROGRAMS</h6>
            <h2 className="section-title">Explore Our Courses</h2>
            <p className="section-description">
              Choose from a wide range of undergraduate and postgraduate programs
            </p>
          </div>
          <div className="courses-grid">
            {Courses.map((course) => (
              <div key={course.id} className="course-card" data-aos="zoom-in" data-aos-delay={course.id * 50}>
                <div className="course-icon">
                  <img src={course.img} alt={course.title} />
                </div>
                <h4 className="course-title">{course.title}</h4>
                <MDBBtn color="link" className="course-link">
                  Learn More <MDBIcon icon="arrow-right" />
                </MDBBtn>
              </div>
            ))}
          </div>
        </MDBContainer>
      </section>

      {/* === QUICK FACTS === */}
      <section className="facts-section py-6">
        <MDBContainer>
          <div className="text-center mb-6" data-aos="fade-up">
            <h6 className="section-subtitle">BY THE NUMBERS</h6>
            <h2 className="section-title">Quick Facts</h2>
          </div>
          <MDBRow className="g-4">
            {quickFacts.map((fact) => (
              <MDBCol lg="4" md="6" key={fact.id} data-aos="fade-up" data-aos-delay={fact.id * 100}>
                <div className="fact-card">
                  <div className="fact-number">{fact.number}</div>
                  <div className="fact-icon">
                    <MDBIcon icon={fact.icon} />
                  </div>
                  <h4 className="fact-title">{fact.title}</h4>
                  <p className="fact-description">{fact.desc}</p>
                </div>
              </MDBCol>
            ))}
          </MDBRow>
        </MDBContainer>
      </section>

      {/* === PORTALS SECTION === */}
      <section className="portals-section py-6 bg-dark">
        <MDBContainer>
          <div className="text-center mb-6" data-aos="fade-up">
            <h6 className="section-subtitle text-light">DIGITAL PORTALS</h6>
            <h2 className="section-title text-white">University Portals</h2>
            <p className="section-description text-light">
              Access all university services through our digital platforms
            </p>
          </div>
          <div className="portals-grid">
            {StudentPortal.map((portal) => (
              <Link to={portal.path} key={portal.id} className="text-decoration-none">
                <div className="portal-card" data-aos="zoom-in" data-aos-delay={portal.id * 50}>
                  <div className="portal-icon">
                    <img src={portal.img} alt={portal.title} />
                  </div>
                  <h4 className="portal-title">{portal.title}</h4>
                  <div className="portal-arrow">
                    <MDBIcon icon="arrow-right" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </MDBContainer>
      </section>

      {/* === CTA SECTION === */}
      <section className="cta-section py-6">
        <MDBContainer>
          <div className="cta-card" data-aos="fade-up">
            <MDBRow className="align-items-center">
              <MDBCol lg="8" className="mb-4 mb-lg-0">
                <h2 className="cta-title">Ready to Start Your Journey?</h2>
                <p className="cta-text">
                  Join thousands of successful graduates who started their career at TIMES University
                </p>
              </MDBCol>
              <MDBCol lg="4" className="text-lg-end">
                <MDBBtn color="light" size="lg" className="me-3 mb-3">
                  <MDBIcon icon="calendar-alt" className="me-2" />
                  Schedule Visit
                </MDBBtn>
                <MDBBtn color="primary" size="lg" tag={Link} to="/student/enroll">
                  <MDBIcon icon="user-plus" className="me-2" />
                  Apply Now
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </div>
        </MDBContainer>
      </section>

      <Footer />
    </>
  );
};

export default Hero;