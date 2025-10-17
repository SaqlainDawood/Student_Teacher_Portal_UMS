import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { MDBIcon } from "mdb-react-ui-kit";
import './StudentDashboard.css'

export const StdDashboard = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setCollapsed(true);
    }
  }, [location]);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    { path: "/std/dashboard", name: "Dashboard", icon: "chalkboard" },
    { path: "/std/profile", name: "Profile", icon: "user-graduate" },
    { path: "/std/feehistory", name: "Fee History", icon: "history" },
    { path: "/std/result", name: "Result", icon: "poll-h" },
    { path: "/std/notes", name: "Notes", icon: "book" },
    { path: "/std/attendance", name: "Attendance Status", icon: "clipboard-check" },
  ];

  return (
    <div className="dashboard-layout">
      {/* Mobile Menu Button - Always visible on mobile */}
      <button className="mobile-menu-btn" onClick={toggleSidebar}>
        <MDBIcon fas icon="bars" />
      </button>

      {/* Sidebar */}
      <div className={`stdsidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="stdsidebar-header">
          <h2 className="logo">{collapsed ? "SD" : "Student Dashboard"}</h2>
          <span className="toggle-btn" onClick={toggleSidebar}>
            <MDBIcon fas icon={window.innerWidth <= 768 ? "times" : "bars"} />
          </span>
        </div>

        <div className="stdmenu">
          {menuItems.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              className={`link ${location.pathname === item.path ? "active" : ""}`}
            >
              <span className="icon">
                <MDBIcon fas icon={item.icon} />
              </span>
              {!collapsed && <span className="text">{item.name}</span>}
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className={`main ${collapsed ? "collapsed" : ""}`}>
        <Outlet />
      </div>
    </div>
  );
};

