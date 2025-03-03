import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    AdminRecords();
  }, []);

  const AdminRecords = () => {
    axios.get('http://localhost:3000/auth/admin_records')
      .then(result => {
        if (result.data.Status) {
          setAdmins(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      });
  };

  const adminCount = () => {
    axios.get('http://localhost:3000/auth/admin_count')
      .then(result => {
        if (result.data.Status) {
          setAdminTotal(result.data.Result[0].admin);
        }
      });
  };

  const employeeCount = () => {
    axios.get('http://localhost:3000/auth/employee_count')
      .then(result => {
        if (result.data.Status) {
          setEmployeeTotal(result.data.Result[0].employee);
        }
      });
  };

  const salaryCount = () => {
    axios.get('http://localhost:3000/auth/salary_count')
      .then(result => {
        if (result.data.Status) {
          setSalaryTotal(result.data.Result[0].salaryOFEmp);
        } else {
          alert(result.data.Error);
        }
      });
  };

  return (
    <div className="container mt-4">
      <div className="row text-center">
        {[{ title: "Admin", total: adminTotal },
          { title: "Employee", total: employeeTotal },
          { title: "Salary", total: `RS.${salaryTotal}` }].map((item, index) => (
          <div key={index} className="col-md-4 mb-3">
            <div className="card shadow-lg bg-secondary text-white border-0 rounded-3">
              <div className="card-body">
                <h5 className="card-title text-uppercase fw-bold">{item.title}</h5>
                <p className="card-text display-6 fw-bold">{item.total}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <h3 className="text-dark">List of Admins</h3>
        <table className="table table-striped table-bordered border-dark">
          <thead className="bg-secondary text-white">
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((a, index) => (
              <tr key={index}>
                <td className="text-dark fw-semibold">{a.email}</td>
                <td>
                  <button className="btn btn-success btn-sm me-2">Edit</button>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
