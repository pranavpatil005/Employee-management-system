import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Category = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-dark">Category List</h3>
        <Link to="/dashboard/add_category" className="btn btn-primary">
          + Add Category
        </Link>
      </div>
      <div className="card shadow-sm p-3 bg-white">
        <table className="table table-bordered text-center">
          <thead className="table-light">
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {category.length > 0 ? (
              category.map((c, index) => (
                <tr key={index}>
                  <td>{c.name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="1" className="text-muted">
                  No categories available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
