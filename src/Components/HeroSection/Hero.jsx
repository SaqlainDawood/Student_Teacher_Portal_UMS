import React from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
// Images
import HEDGOP from '../../assets/Caruosel/HEDGOP.jpg';
import HigherEducation from '../../assets/Caruosel/Higher Education Commissioner.jpg';
import PBC from '../../assets/Caruosel/PBC.jpg';
import PCOP from '../../assets/Caruosel/PCOP.jpg';
import PNMW from '../../assets/Caruosel/PNMW.jpg';
import HeroImg from '../../assets/HeroSection/Hero-Section-Img.jpg';
import CHM from '../../assets/HeroCard/ChM.jpg'
import CM from '../../assets/HeroCard/CM.jpg'
import VC from '../../assets/HeroCard/VC.jpg'
import Law from '../../assets/ExploreCourses/Law.png'
import pharmacy from '../../assets/ExploreCourses/pharmacy.png'
import nursing from '../../assets/ExploreCourses/nursing.png'
import ComputerScience from '../../assets/ExploreCourses/computer-science.png'
import IT from '../../assets/ExploreCourses/IT.png'
import AI from '../../assets/ExploreCourses/AI.png'
import BA from '../../assets/ExploreCourses/business-administration.png'
import PT from '../../assets/ExploreCourses/physical-therapy.png'
import Radiology from '../../assets/ExploreCourses/radiology.png'
import ML from '../../assets/ExploreCourses/medical-laboratory.png'
import OP from '../../assets/ExploreCourses/operation-theater.png'
import HN from '../../assets/ExploreCourses/human-nutrition.png'
import PH from '../../assets/ExploreCourses/public-health.png'
import English from '../../assets/ExploreCourses/english.png'
import IR from '../../assets/ExploreCourses/international-relations.png'
import IL from '../../assets/ExploreCourses/islamic-study.png'
import Chemistry from '../../assets/ExploreCourses/chemistry.png'
import student from '../../assets/HeroPortalImages/student-portal.png'
import Job from '../../assets/HeroPortalImages/jobs-portal.png'
import Time from '../../assets/HeroPortalImages/times-journal.png'
import Conovocation from '../../assets/HeroPortalImages/convocation.png'
import Credentials from '../../assets/HeroPortalImages/credentials.png'
import Alumini from '../../assets/HeroPortalImages/alumni.png'
import Faculty from '../../assets/HeroPortalImages/faculty-portal.png'
import Navbar from '../Navbar/Navigationbar';

import {
  MDBContainer,
  MDBCarousel,
  MDBCarouselItem,
  MDBIcon,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';

const Hero = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation ka time (ms me)
      once: true,     // ek dafa hi chale scroll pr
    });
  }, []);
  const Courses = [
    {
      id: 1,
      img: Law,
      title: 'LAW',
    },
    {
      id: 2,
      img: pharmacy,
      title: 'Pharmacy',
    },
    {
      id: 3,
      img: nursing,
      title: 'Nursing',
    },
    {
      id: 4,
      img: ComputerScience,
      title: 'Computer Science',
    },
    {
      id: 5,
      img: IT,
      title: 'Information Technology',
    },
    {
      id: 6,
      img: AI,
      title: 'Artificial Intelligence',
    },
    {
      id: 7,
      img: BA,
      title: 'Business Administration',
    },
    {
      id: 8,
      img: PT,
      title: 'Physical Therapy',
    },
    {
      id: 9,
      img: Radiology,
      title: 'Radiology',
    },
    {
      id: 10,
      img: ML,
      title: 'Medical Laboratory',
    },
    {
      id: 11,
      img: OP,
      title: 'Operation Theater',
    },
    {
      id: 12,
      img: HN,
      title: 'Human Nutrition',
    },
    {
      id: 13,
      img: PH,
      title: 'Public Health',
    },
    {
      id: 14,
      img: English,
      title: 'English',
    },
    {
      id: 15,
      img: IR,
      title: 'International Relations',
    },
    {
      id: 16,
      img: IL,
      title: 'Islamic Study',
    },

    {
      id: 17,
      img: Chemistry,
      title: 'Chemistry',
    },
  ]
  const StudentPortal = [
    {
      id: 1,
      img: student,
      title: 'Student',
      path:'/std/dashboard',
    },
    {
      id: 2,
      img: Job,
      title: 'Job Application',
      path:'/',
    },
    {
      id: 3,
      img: Time,
      title: 'Times Journal',
      path:'/',
    },
    {
      id: 4,
      img: Conovocation,
      title: 'Convocation Portal',
      path:'/',
    },
    {
      id: 5,
      img: Credentials,
      title: 'Credentials Verification',
      path:'/',
    },
    {
      id: 6,
      img: Alumini,
      title: 'Alumni Portal',
      path:'/',
    },
    {
      id: 7,
      img: Faculty,
      title: 'Faculty Portal',
      path:'/faculty/dashboard',
    },

  ]
  return (
    <>
    <Navbar/>
    <MDBContainer fluid className="p-0">
      <div className="hero-container">
        <img src={HeroImg} alt="Hero" className="hero-img" />

  <div className="hero-floating-buttons">
  <MDBBtn
    tag={Link}
    to="/student/login"
    className="App-Pros-btn"
  >
    <i className="fas fa-user-edit"></i> Apply Now
  </MDBBtn>

  <MDBBtn
    tag="a"
    href="../../../public/Prospectus/TIMES-Prospectus-2025.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="App-Pros-btn"
  >
    <i className="fas fa-file-alt"></i> Prospectus
  </MDBBtn>
</div>

      </div>

      {/* Carousel Section====================== */}

     <MDBCarousel showControls interval={2000}>
  <MDBCarouselItem itemId={1}>
    <div className="carousel-card-container">
      <MDBCard className="carousel-card">
        <MDBCardImage src={HEDGOP} position="top" alt="HEDGOP" />
      </MDBCard>
      <MDBCard className="carousel-card">
        <MDBCardImage src={HigherEducation} position="top" alt="HigherEducation" />
      </MDBCard>
      <MDBCard className="carousel-card">
        <MDBCardImage src={PBC} position="top" alt="PBC" />
      </MDBCard>
      <MDBCard className="carousel-card">
        <MDBCardImage src={PCOP} position="top" alt="PCOP" />
      </MDBCard>
      <MDBCard className="carousel-card">
        <MDBCardImage src={PNMW} position="top" alt="PNMW" />
      </MDBCard>
    </div>
  </MDBCarouselItem>
</MDBCarousel>


      {/* A few words about the University */}

      <div className="content-of-university" data-aos="fade-down">
        <div className="content-wrapper">
          <h4 className="sub-heading" data-aos="fade-right" data-aos-delay="100">
            A FEW WORDS
          </h4>

          <h4 className="main-heading" data-aos="fade-right" data-aos-delay="200">
            ABOUT THE UNIVERSITY
          </h4>

          <p className="paragraph" data-aos="fade-rifht" data-aos-delay="300">
            TIMES University Multan stands as a beacon of academic excellence and innovation,
            dedicated to shaping the future of education in the region. Situated in the heart
            of Multan, our institution is committed to offering world-class education that meets
            global standards...
          </p>

          <p className="paragraph" data-aos="fade-right" data-aos-delay="400">
            Our diverse range of programs, exceptional faculty, and state-of-the-art facilities
            ensure that every student receives the tools they need to excel...
          </p>

          <button className="load-btn" data-aos="zoom-in" data-aos-delay="500">
            Learn More
          </button>
        </div>
      </div>

      {/* ==================This is the Card Sectiom================= */}
      <MDBContainer fluid className="cards-wrapper">
  <div className="cards-section">
    <MDBCard className="custom-card" data-aos="fade-up">
      <div className="card-header">CHANCELLOR'S MESSAGE</div>
      <MDBCardImage
        src={CHM}
        position="top"
        alt="Chancellor"
        className="custom-card-image"
        data-aos="zoom-in"
      />
      <MDBCardBody>
        <MDBCardTitle className="person-name" data-aos="fade-left">
          SARDAR SALEEM HAIDER
        </MDBCardTitle>
        <MDBCardText className="person-role" data-aos="fade-up">
          GOVERNOR PUNJAB / CHANCELLOR
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>

    <MDBCard className="custom-card" data-aos="fade-up" data-aos-delay="100">
      <div className="card-header">CHIEF MINISTER'S MESSAGE</div>
      <MDBCardImage
        src={CM}
        position="top"
        alt="Chief Minister"
        className="custom-card-image"
        data-aos="zoom-in"
      />
      <MDBCardBody>
        <MDBCardTitle className="person-name" data-aos="fade-left">
          MS. MARYAM NAWAZ SHARIF
        </MDBCardTitle>
        <MDBCardText className="person-role" data-aos="fade-right">
          CHIEF MINISTER PUNJAB
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>

    <MDBCard className="custom-card" data-aos="fade-up" data-aos-delay="200">
      <div className="card-header">CHAIRMAN / VICE CHANCELLOR MESSAGE</div>
      <MDBCardImage
        src={VC}
        position="top"
        alt="Vice Chancellor"
        className="custom-card-image"
        data-aos="zoom-in"
      />
      <MDBCardBody>
        <MDBCardTitle className="person-name" data-aos="fade-left">
          M. SARFRAZ MUZAFFAR
        </MDBCardTitle>
        <MDBCardText className="person-role" data-aos="fade-right">
          CHAIRMAN / VICE CHANCELLOR
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  </div>
</MDBContainer>


      {/* Now this is the Section of Our Mission and Our Vision */}

      <div className="Carousel-mision-vision-section">
        <MDBCarousel showControls interval={3000}>
          <MDBCarouselItem itemId={1} interval={4000}>
            <div className="mission-vision-content">
              <h3>OUR MISSION</h3>
              <h6>We offer higher education to enable the youth of Southern Punjab by instilling morality,
                pragmatism, and enlightening sensitivity of era to come, knowledgeful workers & broaden the
                vision to see behind the walls at a very affordable cost.</h6>
            </div>
          </MDBCarouselItem>
          <MDBCarouselItem itemId={2}>
            <div className="mission-vision-content">
              <h3>OUR VISION</h3>
              <h6>We aspire to be acknowledged as a leading seat of higher learning that is dedicated
                to excellence in education, research, and community development at large.</h6>
            </div>
          </MDBCarouselItem>
        </MDBCarousel>
      </div>
      {/* =============This is the Courses Section ================ */}

    <div className="explore-our-courses-Main" data-aos="fade-up">
  <h2>Explore Our Courses</h2>
  <div className="card-courses-sub">
    {Courses.map((card) => (
      <MDBCard
        key={card.id}
        className="cards-courses"
        data-aos="zoom-in"
        data-aos-delay={card.id * 100}
      >
        <MDBCardImage src={card.img} position="top" alt="..." />
        <MDBCardBody>
          <MDBCardTitle className="card-title">{card.title}</MDBCardTitle>
        </MDBCardBody>
      </MDBCard>
    ))}
  </div>
</div>

      {/* ======== This is the Quick Facts Section============ */}

      <div className="Quick-Fact-Section">
        <div className="content" data-aos="fade-up">
          <h2 className="quick-heading">Quick Facts</h2>
          <p className="quick-para">
            The TIMES University, Multan, Pakistan, is a private, charter-recognized institution
            offering a variety of undergraduate and postgraduate programs. It's a prominent
            educational institution in Multan, recognized by the Higher Education Commission (HEC).
          </p>
        </div>

        <div className="carousel-wrapper" data-aos="flip-left">
          <MDBCarousel showControls className="quick-carousel">

            {/* Item 1 */}
            <MDBCarouselItem itemId={1}>
              <MDBCardBody className='quick-CText'>
                <h2>1 in 4</h2>

                <div className='quick--content'>
                  <i className="fas fa-hand-holding-usd fa-2x icon-style"></i>
                  <h5>Students Receive</h5>
                  <p>Financial aid and scholarships to support their education.</p>
                </div>

              </MDBCardBody>
            </MDBCarouselItem>

            {/* Item 2 */}
            <MDBCarouselItem itemId={2}>
              <MDBCardBody className='quick-CText'>
                <h2>06</h2>

                <div className='quick--content'>
                  <i className="fas fa-user-graduate fa-2x icon-style"></i>
                  <h5>PhD Programs</h5>
                  <p>Advanced research-based programs across multiple disciplines.</p>
                </div>

              </MDBCardBody>
            </MDBCarouselItem>

            {/* Item 3 */}
            <MDBCarouselItem itemId={3}>
              <MDBCardBody className='quick-CText'>
                <h2>17</h2>

                <div className='quick--content'>
                  <i className="fas fa-book-reader fa-2x icon-style"></i>
                  <h5>MS / MPhil Programs</h5>
                  <p>High-quality postgraduate education for professional growth.</p>
                </div>

              </MDBCardBody>
            </MDBCarouselItem>

            {/* Item 4 */}
            <MDBCarouselItem itemId={4}>
              <MDBCardBody className='quick-CText'>
                <h2>14</h2>

                <div className='quick--content'>
                  <i className="fas fa-university fa-2x icon-style"></i>
                  <h5>Academic Departments</h5>
                  <p>Dedicated departments to enhance specialized learning.</p>
                </div>

              </MDBCardBody>
            </MDBCarouselItem>

            {/* Item 5 */}
            <MDBCarouselItem itemId={5}>
              <MDBCardBody className='quick-CText'>
                <h2>07</h2>

                <div className='quick--content'>
                  <i className="fas fa-chalkboard-teacher fa-2x icon-style"></i>
                  <h5>Approved Faculties</h5>
                  <p>Expert faculty members with strong academic backgrounds.</p>
                </div>

              </MDBCardBody>
            </MDBCarouselItem>

            {/* Item 6 */}
            <MDBCarouselItem itemId={6}>
              <MDBCardBody className='quick-CText'>
                <h2>08</h2>

                <div className='quick--content'>
                  <i className="fas fa-laptop-code fa-2x icon-style"></i>
                  <h5>BS Programs</h5>
                  <p>Modern undergraduate programs designed for innovation.</p>
                </div>

              </MDBCardBody>
            </MDBCarouselItem>

          </MDBCarousel>

        </div>
      </div>

      {/* Now this the Portal Section of Student Teacher Job and others */}
    <div className='Portal-Section-STTCCAF' data-aos="fade-up">
  <div className="grid-Container">
    {StudentPortal.map((studnt) => (
      <Link to={studnt.path} key={studnt.id}>
        <MDBCard className='portal-cards' data-aos="zoom-in" data-aos-delay={studnt.id * 100}>
          <MDBCardBody>
            <img src={studnt.img} alt="" className='portal-images' />
            <MDBCardTitle>{studnt.title}</MDBCardTitle>
          </MDBCardBody>
        </MDBCard>
      </Link>
    ))}
  </div>
</div>


      {/* This the Footer */}
    </MDBContainer>
    <Footer/>
    </>
  );
};

export default Hero
