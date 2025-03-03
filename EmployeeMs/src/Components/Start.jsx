import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
useEffect

const Start = () => {
    const navigate = useNavigate()
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:3000/verify')
    .then(result => {
      if(result.data.Status) {
        if(result.data.role === "admin") {
          navigate('/dashboard')
        } else {
          navigate('/employee_detail/'+result.data.id)
        }
      }
    }).catch(err =>console.log(err))
  }, [])

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
    <div
      className="loginForm"
      style={{
        width: "380px",
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        border: "2px solid #2a5298",
        textAlign: "center",
      }}
    >
      {/* Heading */}
      <h2 style={{ marginBottom: "20px", fontWeight: "bold", color: "#2a5298" }}>
        Login As
      </h2>
  
      {/* Buttons */}
      <div className="d-flex justify-content-between mt-4 mb-2">
        <button
          type="button"
          className="btn"
          onClick={() => {
            navigate("/employee_login");
          }}
          style={{
            backgroundColor: "#2a5298",
            color: "white",
            padding: "12px 20px",
            fontWeight: "bold",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#1e3c72")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#2a5298")}
        >
          Employee
        </button>
  
        <button
          type="button"
          className="btn"
          onClick={() => {
            navigate("/adminlogin");
          }}
          style={{
            backgroundColor: "#198754",
            color: "white",
            padding: "12px 20px",
            fontWeight: "bold",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#146c43")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#198754")}
        >
          Admin
        </button>
      </div>
    </div>
  </div>
  
  );
};

export default Start;