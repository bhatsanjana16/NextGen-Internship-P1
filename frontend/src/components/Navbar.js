import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; 

const Navbar = () => {
  const navigate = useNavigate();
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* Brand Name */}
        <Link className="navbar-brand" to="/dashboard">
          CollabTool
        </Link>

        {/* Mobile Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Dashboard Link */}
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>

            {/* Conditional Links */}
            {user ? (
              <div className="d-flex align-items-center">
                <li className="nav-item">
                  <span className="nav-link username">{user.username}</span>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link logout"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </div>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

