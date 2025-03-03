import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    axios.get("http://localhost:3000/auth/logout").then((result) => {
      if (result.data.Status) {
        localStorage.removeItem("valid");
        navigate("/");
      }
    });
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        {/* Sidebar */}
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light text-dark border-end min-vh-100 shadow-sm">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-4">
            <Link
              to="/dashboard"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-dark text-decoration-none fw-bold fs-4"
            >
              <i className="bi bi-grid-fill me-2 text-primary"></i>
              <span>Dashboard</span>
            </Link>
            <ul className="nav flex-column mb-sm-auto mb-0 w-100" id="menu">
              <li className="w-100">
                <Link to="/dashboard" className="nav-link px-3 py-2 rounded-2 text-dark bg-light">
                  <i className="fs-5 bi-speedometer2 me-3 text-success"></i> Dashboard
                </Link>
              </li>
              <li className="w-100">
                <Link to="/dashboard/employee" className="nav-link px-3 py-2 rounded-2 text-dark bg-light">
                  <i className="fs-5 bi-people me-3 text-warning"></i> Manage Employee
                </Link>
              </li>
              <li className="w-100">
                <Link to="/dashboard/category" className="nav-link px-3 py-2 rounded-2 text-dark bg-light">
                  <i className="fs-5 bi-columns me-3 text-info"></i> Category
                </Link>
              </li>
              <li className="w-100">
                <Link to="/dashboard/profile" className="nav-link px-3 py-2 rounded-2 text-dark bg-light">
                  <i className="fs-5 bi-person me-3 text-danger"></i> Profile
                </Link>
              </li>
              <li className="w-100" onClick={handleLogout}>
                <Link className="nav-link px-3 py-2 rounded-2 text-dark bg-light text-center">
                  <i className="fs-5 bi-power me-3 text-muted"></i>Logout
                </Link>
              </li> 
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="col p-0 m-0 bg-white">
          <div className="p-3 d-flex justify-content-center border-bottom bg-light shadow-sm">
            <h4 className="text-dark fw-bold">Employee Management System</h4>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
