import React, { useState } from "react";
import { GetUser } from "../../ApiService";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "../../App.css";
import { useData } from "../../Auth/DataContext";

export default function Login() {
  const [header] = useState("Login");
  const { login } = useData();

  const [loginData, setLoginData] = useState({
    email: "sanjana@gmail.com",
    password: "sanjana@123",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^[a-zA-Z0-9][^\s]{6,}$/;
    return passwordRegex.test(password);
  };

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(value) ? "" : "Invalid email address",
      }));
    } else if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password: validatePassword(value)
          ? ""
          : "Password must be at least 6 characters",
      }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const isEmailValid = validateEmail(loginData.email);
    const isPasswordValid = validatePassword(loginData.password);

    if (!isEmailValid || !isPasswordValid) {
      toast.error("Please fix the errors before submitting.");
      return;
    }
    const loginResponse = await GetUser(loginData);
    // setAuthResponse({
    //     token:loginResponse.token,
    //     refreshToken:loginResponse.refreshToken,
    //     user: loginResponse.user,
    //     message: loginResponse.Message
    //})
    if (loginResponse.user != null) {
      localStorage.setItem("token", loginResponse.token);
      toast.success("Login successful.");
      setTimeout(() => {
        login();
      }, 1500);
    } else {
      toast.error("Login failed");
    }
  }

  return (
    <>
      <div className="outer-div">
        <ToastContainer
          hideProgressBar={true}
          newestOnTop={true}
          closeButton={false}
        />
        <div className="container-div">
          <div className="header">
            <h1>{header}</h1>
          </div>
          <div className="form">
            <form>
              <div>
                <div className="label">
                  <label htmlFor="email">Email:</label>
                </div>
                <input
                  autoComplete="off"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={loginData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>
              <br />
              <div>
                <div className="label">
                  <label htmlFor="password">Password:</label>
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                />
                {errors.password && <p className="error">{errors.password}</p>}
              </div>
              <br />
              <button
                onClick={(e) => handleSubmit(e)}
                disabled={
                  !validateEmail(loginData.email) ||
                  !validatePassword(loginData.password)
                }
              >
                Sign In
              </button>
              <p>
                Not a User?
                <Link to="/signup"> Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
