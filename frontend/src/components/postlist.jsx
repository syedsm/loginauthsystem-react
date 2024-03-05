import { useState, useEffect } from "react";
import Header from "./Header";
// import { Link } from "react-router-dom";

const UserProfileList = () => {
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      fetch("/api/profile")
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            setData(response.data);
          } else {
            setMessage(response.message);
          }
        });
    } catch (error) {
      setMessage(error.message);
    }
  }, []);

  return (
    <div>
      <Header/>
    <div className="container mt-5 ">
      {message && <div className="alert alert-danger">{message}</div>}
      <div className="row">
        {data.map((user, key) => (
          <div key={key} className="col-md-4 mb-4 ">
            <div className="card justify-content-center align-items-center ">
              <h2>User profile {key + 1}</h2>
              {user.img && (
                <img
                  style={{
                    width: "50%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                  src={`assets/${user.img}`}
                  className="card-img-top mt-2"
                  alt={`Profile of ${user.username}`}
                />
              )}
              <div className="card-body text-center">
                <h5 className="card-title">
                  <p>Email/Username: </p>
                  {user.username || user.email}
                </h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>

  );
};

export default UserProfileList;
