import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:3000/auth/adminlogin', values)
        .then(result => {
            if(result.data.loginStatus) {
                localStorage.setItem("valid", true)
                navigate('/dashboard')
            } else {
                setError(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }

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
      {/* Error Message */}
      <div style={{ color: "orange", marginBottom: "10px" }}>
        {error && error}
      </div>
  
      {/* Heading */}
      <h2 style={{ marginBottom: "20px", fontWeight: "bold", color: "#2a5298" }}>
        Login Page
      </h2>
  
      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Email Input */}
        <div className="mb-3" style={{ textAlign: "left" }}>
          <label htmlFor="email" style={{ fontWeight: "bold" }}>
            Email:
          </label>
          <input
            type="email"
            name="email"
            autoComplete="off"
            placeholder="Enter Email"
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            className="form-control"
            style={{
              borderRadius: "5px",
              border: "1px solid #2a5298",
              padding: "8px",
            }}
          />
        </div>
  
        {/* Password Input */}
        <div className="mb-3" style={{ textAlign: "left" }}>
          <label htmlFor="password" style={{ fontWeight: "bold" }}>
            Password:
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            className="form-control"
            style={{
              borderRadius: "5px",
              border: "1px solid #2a5298",
              padding: "8px",
            }}
          />
        </div>
  
        {/* Login Button */}
        <button
          className="btn w-100"
          style={{
            backgroundColor: "#2a5298",
            color: "white",
            padding: "10px",
            fontWeight: "bold",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#1e3c72")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#2a5298")}
        >
          Log in
        </button>
  
        {/* Terms & Conditions */}
        <div className="mt-2" style={{ textAlign: "left" }}>
          <input type="checkbox" name="tick" id="tick" className="me-2" />
          <label htmlFor="tick" className='tickbox' >You agree with the Terms & Conditions</label>
        </div>
      </form>
    </div>
  </div>
  
  )
}

export default Login