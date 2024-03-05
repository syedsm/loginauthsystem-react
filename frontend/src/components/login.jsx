import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Contextapi } from "../App";

function Login() {
  let navigate = useNavigate();
  let { setToken } = useContext(Contextapi);
  const [formData, setFormData] = useState({
    identifier: "", // Changed to identifier
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.token) {
          localStorage.setItem("token", data.token);
          setToken(localStorage.getItem("token"));
          alert("Login successful!");
          navigate("/post-list");
        } else {
          alert("Login failed. Please check your credentials.");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });

    setFormData({
      identifier: "",
      password: "",
    });
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div
        className="container p-4 rounded"
        style={{
          width: "400px",
          border: "5px solid #ccc",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className="md-12">
          <h2 className="mb-4 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email or Username:</label>
              <input
                type="text"
                className="form-control"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password:</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary d-flex mx-auto">
              Login
            </button>
            <div className="mt-3 text-center">
              Dont have an account? <Link to="/signup">Signup here</Link>.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
