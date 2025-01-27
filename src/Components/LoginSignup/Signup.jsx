import { useState, useEffect } from "react";
import { Register } from "../../ApiService";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Signup = () => {
  const [header] = useState("Sign Up");
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    type: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    type: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) =>
    /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.(?!in$)[a-zA-Z]+$/.test(email);
  const validateName = (name) => /^[A-Za-z][A-Za-z ]{2,}$/.test(name);
  const validatePassword = (password) =>
    /^[a-zA-Z0-9][^\s]{5,}$/.test(password);
  const validateType = (type) => !!type;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(value) ? "" : "Invalid email address",
      }));
    } else if (name === "name") {
      setErrors((prev) => ({
        ...prev,
        name: validateName(value)
          ? ""
          : "Name must be at least 3 letters and only contain alphabets",
      }));
    } else if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password: validatePassword(value)
          ? ""
          : "Password must be at least 6 characters long",
      }));
    } else if (name === "confirmPassword") {
      setErrors((prev) => ({
        ...prev,
        confirmPassword:
          value === registerData.password ? "" : "Passwords do not match",
      }));
    } else if (name === "type") {
      setErrors((prev) => ({
        ...prev,
        type: validateType(value) ? "" : "Please select a user type",
      }));
    }
  };

  useEffect(() => {
    const isValid =
      validateEmail(registerData.email) &&
      validateName(registerData.name) &&
      validatePassword(registerData.password) &&
      registerData.password === registerData.confirmPassword &&
      validateType(registerData.type);
    setIsFormValid(isValid);
  }, [registerData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      toast.error("Please fix the errors before submitting.");
      return;
    }
    const isRegistered = await Register(registerData);

    if (isRegistered) {
      toast.success("Registration successful!!");
      setTimeout(() => {
        navigate("/login", { state: isRegistered });
      }, 1500);
    } else {
      toast.error("User already exists!!");
    }
  };

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
            <form autoComplete="off">
              <div>
                <div className="label">
                  <label htmlFor="name">User Name:</label>
                </div>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={registerData.name}
                  onChange={handleChange}
                />
                {errors.name && <p className="error">{errors.name}</p>}
              </div>

              <div>
                <div className="label">
                  <label htmlFor="email">Email:</label>
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={registerData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>

              <div>
                <div className="label">
                  <label htmlFor="password">Password:</label>
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={registerData.password}
                  onChange={handleChange}
                />
                {errors.password && <p className="error">{errors.password}</p>}
              </div>

              <div>
                <div className="label">
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                </div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={registerData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <p className="error">{errors.confirmPassword}</p>
                )}
              </div>

              <div>
                <div className="label">
                  <label htmlFor="type">User Type:</label>
                </div>
                <select
                  name="type"
                  value={registerData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select your role
                  </option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="guest">Guest</option>
                </select>
                {errors.type && <p className="error">{errors.type}</p>}
              </div>
              <button onClick={handleSubmit} disabled={!isFormValid}>
                Sign Up
              </button>
              <p>
                Already Registered? <br />
                <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
