import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/auth/add_category", { category })
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/category");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="p-4 rounded shadow-sm bg-white w-50">
        <h2 className="text-center text-dark">Add Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="category" className="form-label fw-bold text-dark">
              Category:
            </label>
            <input
              type="text"
              name="category"
              placeholder="Enter Category"
              onChange={(e) => setCategory(e.target.value)}
              className="form-control"
            />
          </div>
          <button className="btn btn-primary w-100">Add Category</button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
