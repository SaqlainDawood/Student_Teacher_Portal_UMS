import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { MDBIcon } from "mdb-react-ui-kit";
import './Faculty.css';

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
          {/* Sidebar */}
          <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
            <div className="sidebar-header">
              <h2 className="logo">{collapsed ? "FD" : "Faculty Dashboard"}</h2>
              <span className="toggle-btn" onClick={toggleSidebar}>
                <MDBIcon fas icon="bars" />
              </span>
            </div>
    
            <div className="menu">
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
}
