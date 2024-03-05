import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    img: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsTermsChecked(!isTermsChecked);
  };

  // const handleChange = (e) => {
  //   const { name, value, type, files } = e.target;

  //   // Dynamically determine the type based on the value
  //   const isEmail =
  //     name === "email" || (type === "text" && value.includes("@"));
  //   const isUsername =
  //     name === "email" || (type === "text" && !value.includes("@"));

  //   // Only include the desired fields in the state
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     email: isEmail ? value : prevData.email,
  //     username: isUsername ? value : prevData.username,
  //     password: name === "password" ? value : prevData.password,
  //     confirmPassword:
  //       name === "confirmPassword" ? value : prevData.confirmPassword,
  //     name: name === "name" ? value : prevData.name,
  //     img: name === "img" ? files[0] : prevData.img, // Use files[0] for file input
  //     // type: isEmail ? "email" : isUsername ? "username" : "unknown",
  //   }));
  // };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    const isEmail =
      name === "email" || (type === "text" && value.includes("@"));
    const isUsername =
      name === "username" || (type === "text" && !value.includes("@"));

    setFormData((prevData) => ({
      ...prevData,
      email: isEmail ? value : prevData.email,
      username: isUsername ? value : prevData.username,
      password: name === "password" ? value : prevData.password,
      confirmPassword:
        name === "confirmPassword" ? value : prevData.confirmPassword,
      name: name === "name" ? value : prevData.name,
      img: name === "img" ? files[0] : prevData.img,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    for (const field of ["email", "password", "confirmPassword"]) {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
        isValid = false;
      }
    }

    if (formData.email && formData.email.includes("@")) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Invalid email format";
        isValid = false;
      }
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    if (!isTermsChecked) {
      newErrors.terms = "Please agree to the Terms and Conditions";
      isValid = false;
    }

    setErrors(newErrors);

    // Display warning messages
    if (!isValid) {
      alert("Please correct the following issues before submitting the form.");
    }

    return isValid;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append("email", formData.email);
  //   formData.append("password", formData.password);
  //   formData.append("confirmPassword", formData.confirmPassword);
  //   formData.append("name", formData.name);
  //   formData.append("img", formData.img);
  //   console.log(formData);

  //   try {
  //     const response = await fetch("/api/register", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     if (response.ok) {
  //       try {
  //         const responseData = await response.json();
  //         console.log("Registration successful:", responseData);
  //       } catch (jsonError) {
  //         console.error("Error parsing JSON:", jsonError);
  //       }
  //     } else {
  //       console.error("Registration failed:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("An error occurred during registration:", error);
  //   }

  //   if (validateForm()) {
  //     //   alert('Simulating sending a welcome email to:', formData.email);

  //     setSuccessMessage("Signup successful! Redirecting to post list...");
  //     window.alert(
  //       `Signup successful ${formData.email} ! Welcome to our community. You will receive a welcome email shortly.`
  //     );

  //     setTimeout(() => {
  //       navigate("/post-list");
  //     }, 2000);
  //   }
  // };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    let data = new FormData();
    data.append("email", formData.email);
    data.append("username", formData.username);
    data.append("password", formData.password);
    data.append("confirmPassword", formData.confirmPassword);
    data.append("name", formData.name);
    data.append("img", formData.img);

    // for (const [key, value] of data.entries()) {
    //   console.log(`${key}: ${value}`);
    // console.log(`img name: ${data.get("img").name}`);
    // console.log(`img size: ${data.get("img").size} bytes`);
    // console.log(`img type: ${data.get("img").type}`);
    // }

    try {
      const response = fetch("/api/register", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        try {
          const responseData = response.json();
          console.log("Registration successful:", responseData);
        } catch (jsonError) {
          console.error("Error parsing JSON:", jsonError);
        }
      } else {
        console.error("Registration failed:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
    }

    if (validateForm()) {
      setSuccessMessage("Signup successful! Redirecting to post list...");
      alert(
        `Signup successful ${data.get(
          "email"
        )}! Welcome to our community. You will receive a welcome email shortly.`
      );
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 rounded">
      <div
        className="container p-4 rounded"
        style={{
          width: "400px",
          border: "5px solid #ccc",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className="md-12">
          <h2 className="mb-4 text-center">Create an account</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label className="form-label">Email/Username</label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <div className="text-danger">{errors.email}</div>
            </div>

            <div className="mb-3">
              <label className="form-label">Password:</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <div className="text-danger">{errors.password}</div>
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm Password:</label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <div className="text-danger">{errors.confirmPassword}</div>
            </div>

            <div className="mb-3">
              <label className="form-label">Name (optional):</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Profile Picture (optional):</label>
              <input
                type="file"
                className="form-control"
                name="img"
                onChange={handleChange}
              />
              <div className="text-danger">{errors.img}</div>
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="termsCheckbox"
                checked={isTermsChecked}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="termsCheckbox">
                I agree to the Terms and Conditions
              </label>
              <div className="text-danger">{errors.terms}</div>
            </div>

            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )}

            <button type="submit" className="btn btn-primary d-flex mx-auto">
              Sign Up
            </button>
            <div className="mt-3 text-center">
              Already have an account? <Link to="/">Login here</Link>.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
