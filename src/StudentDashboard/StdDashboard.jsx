import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { MDBIcon } from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import './StudentDashboard.css'

export const StdDashboard = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 768);
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleLogout = () => {
    // Show confirmation dialog
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    
    if (!confirmLogout) {
      return;
    }
    
    // Clear all student-related data from localStorage
    localStorage.removeItem("studentToken");
    localStorage.removeItem("studentData");
    localStorage.removeItem("studentId");
    sessionStorage.removeItem("confettiShown");
    
    // Show success message
    toast.success("Logged out successfully!");
    
    // Redirect to student login page
    navigate("/student/login");
  };

  const menuItems = [
    { path: "/std/dashboard", name: "Dashboard", icon: "chalkboard" },
    { path: "/std/profile", name: "Profile", icon: "user-graduate" },
    { path: "/std/activities", name: "My Activities", icon: "tasks" }, // 🆕
    { path: "/std/grades", name: "My Grades", icon: "chart-bar" },  
    { path: "/std/feehistory", name: "Fee History", icon: "history" },
    { path: "/std/attendance", name: "My Attendance", icon: "calendar-check" },
    { path: "/std/result", name: "Result", icon: "poll-h" },
    { path: "/std/notes", name: "Notes", icon: "book" },
  ];
  
  return (
    <div className="dashboard-layout">
      {/* Mobile Menu Button */}
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
          {/* Menu Items */}
          {menuItems.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              className={`link ${location.pathname === item.path ? "active" : ""}`}
              data-tooltip={collapsed ? item.name : ""}
            >
              <span className="icon">
                <MDBIcon fas icon={item.icon} />
              </span>
              {!collapsed && <span className="text">{item.name}</span>}
            </Link>
          ))}
          
          {/* Divider Line */}
          <div className="menu-divider"></div>
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="link logout-link"
            data-tooltip={collapsed ? "Logout" : ""}
          >
            <span className="icon">
              <MDBIcon fas icon="sign-out-alt" />
            </span>
            {!collapsed && <span className="text">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`main ${collapsed ? "collapsed" : ""}`}>
        <Outlet />
      </div>
    </div>
  );
};