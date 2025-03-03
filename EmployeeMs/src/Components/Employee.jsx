import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Employee = () => {
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete("http://localhost:3000/auth/delete_employee/" + id)
      .then((result) => {
        if (result.data.Status) {
          setEmployee(employee.filter(e => e.id !== id));
        } else {
          alert(result.data.Error);
        }
      });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-dark">Employee List</h3>
        <Link to="/dashboard/add_employee" className="btn btn-primary">
          + Add Employee
        </Link>
      </div>
      <div className="card shadow-sm p-3 bg-white">
        <table className="table table-bordered text-center">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employee.length > 0 ? (
              employee.map((e, index) => (
                <tr key={index}>
                  <td>{e.name}</td>
                  <td>
                    <img
                      src={`http://localhost:3000/images/` + e.image}
                      className="img-fluid rounded" 
                      style={{ width: "50px", height: "50px" }}
                      alt="Employee"
                    />
                  </td>
                  <td>{e.email}</td>
                  <td>{e.address}</td>
                  <td>{e.salary}</td>
                  <td>
                    <Link
                      to={`/dashboard/edit_employee/` + e.id}
                      className="btn btn-info btn-sm me-2"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(e.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-muted">
                  No employees available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
