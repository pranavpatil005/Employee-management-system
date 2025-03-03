import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios.get('http://localhost:3000/auth/employee_profiles')
      .then(result => {
        if (result.data.Status) {
          setEmployees(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-primary text-center mb-4">Employee Profiles</h2>
      <div className="row">
        {employees.map((employee, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 rounded-3 bg-dark text-light">
              <img src={employee.image} alt={employee.name} className="card-img-top rounded-top" />
              <div className="card-body">
                <h5 className="card-title text-warning">{employee.name}</h5>
                <p className="card-text text-info">Email: {employee.email}</p>
                <p className="card-text">Address: {employee.address}</p>
                <p className="card-text fw-bold">Salary: RS.{employee.salary}</p>
                <p className="card-text text-secondary">Category: {employee.category_name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
