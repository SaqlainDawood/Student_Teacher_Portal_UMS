import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MDBIcon } from "mdb-react-ui-kit";

const NAV_ITEMS = [
  {
    title: "About",
    icon: "university",
    name: "about",
    links: [
      { to: "/about", label: "About University" },
      { to: "#", label: "Vision & Mission" },
      { to: "#", label: "Leadership" },
      { to: "#", label: "Chancellor's Message" },
      { to: "#", label: "Vice Chancellor's Message" },
      { to: "#", label: "Accreditation" },
    ],
  },
  {
    title: "Admissions",
    icon: "graduation-cap",
    name: "admissions",
    links: [
      { to: "/student/apply/signup", label: "Apply Now", highlight: true },
      { to: "#", label: "Undergraduate Admissions" },
      { to: "#", label: "Graduate Admissions" },
      { to: "#", label: "MS / MPhil Admissions" },
      { to: "#", label: "PhD Admissions" },
      { to: "#", label: "Scholarships" },
      { to: "#", label: "Admission Schedule" },
      { to: "#", label: "How to Apply" },
    ],
  },
  {
    title: "Academics",
    icon: "book",
    name: "academics",
    links: [
      { to: "#", label: "Faculties" },
      { to: "#", label: "Departments" },
      { to: "#", label: "Undergraduate Programs" },
      { to: "#", label: "Graduate Programs" },
      { to: "#", label: "MS / MPhil Programs" },
      { to: "#", label: "PhD Programs" },
      { to: "#", label: "Academic Calendar" },
    ],
  },
  {
    title: "Research",
    icon: "flask",
    name: "research",
    links: [
      { to: "#", label: "Research & Innovation" },
      { to: "#", label: "Research Centers" },
      { to: "#", label: "Research Journals" },
      { to: "#", label: "Publications" },
      { to: "#", label: "Faculty Research" },
      { to: "#", label: "Research Opportunities" },
    ],
  },
  {
    title: "Campus Life",
    icon: "building",
    name: "campus",
    links: [
      { to: "#", label: "Student Affairs" },
      { to: "#", label: "Student Societies" },
      { to: "#", label: "Sports" },
      { to: "#", label: "Hostel" },
      { to: "#", label: "Library" },
      { to: "#", label: "Cafeteria" },
      { to: "#", label: "Campus Facilities" },
    ],
  },
  {
    title: "Resources",
    icon: "link",
    name: "resources",
    links: [
      { to: "#", label: "Student Portal" },
      { to: "#", label: "Faculty Portal" },
      { to: "#", label: "LMS" },
      { to: "#", label: "Library" },
      { to: "#", label: "Downloads" },
      { to: "#", label: "Forms" },
      { to: "#", label: "University Policies" },
    ],
  },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [desktopDropdown, setDesktopDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll while the mobile panel is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMobileMenu = () => {
    setMenuOpen(false);
    setMobileDropdown(null);
  };

  const toggleMobileDropdown = (name) => {
    setMobileDropdown((prev) => (prev === name ? null : name));
  };

  const dropdownBaseClass =
    "absolute left-0 top-full z-50 mt-1 w-64 origin-top rounded-lg border border-[#1B2A4A]/10 bg-white p-1.5 shadow-[0_16px_40px_-12px_rgba(15,29,58,0.35)] transition-all duration-150 ease-out";

  const dropdownItem =
    "block rounded-md px-4 py-2.5 text-[13.5px] text-[#37425A] transition hover:bg-[#F4F0E4] hover:text-[#1B2A4A] focus-visible:bg-[#F4F0E4] focus-visible:outline-none";

  const mobileItem =
    "block rounded-md px-4 py-2.5 text-[13.5px] text-[#5B6478] transition hover:bg-[#F4F0E4] hover:text-[#1B2A4A]";

  const navLinkClass =
    "flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-2 text-[13px] font-medium text-[#37425A] transition hover:bg-[#F4F0E4] hover:text-[#1B2A4A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]/60";

  return (
    <>
      <nav
        className={`fixed left-0 top-0 z-50 w-full border-b transition-all duration-300 ${
          scrolled
            ? "border-[#1B2A4A]/10 bg-white/95 shadow-[0_1px_0_rgba(15,29,58,0.06),0_12px_24px_-16px_rgba(15,29,58,0.25)] backdrop-blur-md"
            : "border-transparent bg-white"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Row 1 — logo (centered on desktop) */}
          <div className="flex h-[68px] items-center justify-between xl:h-[76px] xl:justify-center">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="flex shrink-0 items-center gap-3 no-underline focus-visible:outline-none"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1B2A4A] text-[#C9A227] ring-1 ring-[#C9A227]/40">
                <MDBIcon icon="university" className="text-[15px]" />
              </div>

              <div className="leading-none">
                <h1 className="m-0 font-serif text-[17px] font-bold tracking-wide text-[#1B2A4A] sm:text-lg xl:text-xl">
                  UNIVERSITY
                </h1>
                <p className="m-0 mt-1 text-center text-[10.5px] font-semibold tracking-[0.28em] text-[#C9A227]">
                  MULTAN
                </p>
              </div>
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#1B2A4A]/15 text-[#1B2A4A] transition hover:bg-[#F4F0E4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]/60 xl:hidden"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <div className="flex w-5 flex-col gap-1.5">
                <span
                  className={`h-0.5 w-full bg-current transition ${
                    menuOpen ? "translate-y-2 rotate-45" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-current transition ${
                    menuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-current transition ${
                    menuOpen ? "-translate-y-2 -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Row 2 — desktop menu, centered below the name */}
          <div className="hidden items-center justify-center gap-0.5 border-t border-[#1B2A4A]/8 py-1.5 xl:flex">
            <Link to="/" className={navLinkClass}>
              Home
            </Link>

            {NAV_ITEMS.map((item) => {
              const isOpen = desktopDropdown === item.name;
              return (
                <div
                  key={item.name}
                  className="relative shrink-0"
                  onMouseEnter={() => setDesktopDropdown(item.name)}
                  onMouseLeave={() => setDesktopDropdown(null)}
                >
                  <button
                    type="button"
                    className={navLinkClass}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setDesktopDropdown((prev) => (prev === item.name ? null : item.name))
                    }
                  >
                    {item.title}
                    <MDBIcon
                      icon="chevron-down"
                      className={`text-[9px] transition ${
                        isOpen ? "rotate-180 text-[#C9A227]" : "text-[#9AA3B5]"
                      }`}
                    />
                  </button>

                  <div
                    className={`${dropdownBaseClass} ${
                      isOpen
                        ? "visible translate-y-0 scale-100 opacity-100"
                        : "invisible translate-y-1 scale-95 opacity-0"
                    }`}
                  >
                    {item.links.map((link) => (
                      <Link
                        key={link.label}
                        to={link.to}
                        onClick={() => setDesktopDropdown(null)}
                        className={
                          link.highlight
                            ? `${dropdownItem} font-semibold text-[#1B2A4A]`
                            : dropdownItem
                        }
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}

            <Link to="/staff/apply/signup" className={navLinkClass}>
              Careers
            </Link>

            <Link to="#" className={navLinkClass}>
              Contact
            </Link>

            <Link
              to="/student/apply/signup"
              className="ml-2 shrink-0 whitespace-nowrap rounded-md bg-[#1B2A4A] px-4 py-2 text-[13px] font-semibold text-white shadow-[0_8px_20px_-8px_rgba(27,42,74,0.55)] transition hover:bg-[#25355C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]/60"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        onClick={closeMobileMenu}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-[#0F1D3A]/40 backdrop-blur-[2px] transition-opacity duration-300 xl:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Mobile slide-in panel */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-[85%] max-w-sm transform bg-white shadow-2xl transition-transform duration-300 ease-out xl:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-[68px] items-center justify-between border-b border-[#1B2A4A]/10 px-4">
          <span className="font-serif text-sm font-bold tracking-wide text-[#1B2A4A]">
            MENU
          </span>
          <button
            type="button"
            onClick={closeMobileMenu}
            className="flex h-9 w-9 items-center justify-center rounded-md text-[#1B2A4A] hover:bg-[#F4F0E4]"
            aria-label="Close menu"
          >
            <MDBIcon icon="times" />
          </button>
        </div>

        <div className="h-[calc(100%-72px)] overflow-y-auto px-3 py-3">
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 rounded-md px-4 py-3 font-medium text-[#1B2A4A] hover:bg-[#F4F0E4]"
          >
            <MDBIcon icon="home" className="w-4" />
            Home
          </Link>

          {NAV_ITEMS.map((item) => (
            <MobileDropdown
              key={item.name}
              title={item.title}
              icon={item.icon}
              name={item.name}
              mobileDropdown={mobileDropdown}
              toggleMobileDropdown={toggleMobileDropdown}
            >
              {item.links.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={closeMobileMenu}
                  className={
                    link.highlight
                      ? `${mobileItem} font-semibold text-[#1B2A4A]`
                      : mobileItem
                  }
                >
                  {link.label}
                </Link>
              ))}
            </MobileDropdown>
          ))}

          <Link
            to="/staff/apply/signup"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 rounded-md px-4 py-3 font-medium text-[#1B2A4A] hover:bg-[#F4F0E4]"
          >
            <MDBIcon icon="briefcase" className="w-4" />
            Careers
          </Link>

          <Link
            to="#"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 rounded-md px-4 py-3 font-medium text-[#1B2A4A] hover:bg-[#F4F0E4]"
          >
            <MDBIcon icon="phone-alt" className="w-4" />
            Contact
          </Link>

          <Link
            to="/student/apply/signup"
            onClick={closeMobileMenu}
            className="mt-3 block rounded-md bg-[#1B2A4A] px-4 py-3 text-center font-semibold text-white shadow-md hover:bg-[#25355C]"
          >
            Apply Now
          </Link>
        </div>
      </div>

      <div className="h-[68px] xl:h-[128px]" />
    </>
  );
};

const MobileDropdown = ({
  title,
  icon,
  name,
  mobileDropdown,
  toggleMobileDropdown,
  children,
}) => {
  const isOpen = mobileDropdown === name;

  return (
    <div className="border-b border-[#1B2A4A]/8">
      <button
        type="button"
        onClick={() => toggleMobileDropdown(name)}
        className="flex w-full items-center justify-between rounded-md px-4 py-3 font-medium text-[#1B2A4A] hover:bg-[#F4F0E4]"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-3">
          <MDBIcon icon={icon} className="w-4" />
          {title}
        </span>
        <MDBIcon
          icon="chevron-down"
          className={`text-xs text-[#9AA3B5] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[700px] pb-2" : "max-h-0"
        }`}
      >
        <div className="ml-6">{children}</div>
      </div>
    </div>
  );
};

export default Navbar;