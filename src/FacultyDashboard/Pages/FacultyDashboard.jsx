import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { MDBIcon } from "mdb-react-ui-kit";
import './Faculty.css';
import Header from "../Header/Header";

export default function FacultyDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    { path: "/faculty/dashboard",     name: "Dashboard",       icon: "tachometer-alt" },
    { path: "/faculty/profile",       name: "Profile",         icon: "user" },
    { path: "/faculty/addresult",     name: "Add Result",      icon: "file-alt" },
    { path: "/faculty/markattendance",name: "Mark Attendance", icon: "clipboard" },
    { path: "/faculty/addnewclass",   name: "Add New Class",   icon: "book" },
  ];

  return (
    <div className="dashboard-layout">
      {/* Enhanced Sidebar */}
      <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <div className="logo-section">
            <div className="logo-icon">
              <MDBIcon fas icon="chalkboard-teacher" />
            </div>
            {!collapsed && (
              <div className="logo-text">
                <h2 className="logo-main">Faculty Portal</h2>
                <p className="logo-sub">Management System</p>
              </div>
            )}
          </div>
          <span className="toggle-btn" onClick={toggleSidebar}>
            <MDBIcon fas icon={collapsed ? "chevron-right" : "chevron-left"} />
          </span>
        </div>

        <div className="menu">
          {menuItems.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              className={`menu-link ${location.pathname === item.path ? "active" : ""}`}
            >
              <span className="menu-icon">
                <MDBIcon fas icon={item.icon} />
              </span>
              {!collapsed && <span className="menu-text">{item.name}</span>}
              {location.pathname === item.path && (
                <span className="active-pulse"></span>
              )}
            </Link>
          ))}
        </div>

        {/* Sidebar Footer */}
        {!collapsed && (
          <div className="sidebar-footer">
            <div className="user-info">
              <div className="user-avatar">
                <MDBIcon fas icon="user-graduate" />
              </div>
              <div className="user-details">
                <span className="user-name">MR. {} </span>
                <span className="user-role"></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className={`main ${collapsed ? "collapsed" : ""}`}>
        <Header/>
        <Outlet />
      </div>
    </div>
  );
}


