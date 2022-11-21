import axios from "axios";
import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

const Update = () => {
  const [id, setId] = useState(0);
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [DOB, setDob] = useState(new Date());
  const [userRole, setUserRole] = useState();
  const [address, setAddress] = useState();
  
  const navigate = useNavigate();

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setName(localStorage.getItem("Name"));
    setEmail(localStorage.getItem("Email"));
    setDob(localStorage.getItem("DOB"));
    setUserRole(localStorage.getItem("userRole"));
    setAddress(localStorage.getItem("address"));
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Id...", id);

    axios
      .put(`http://localhost:8000/accounts/update/${id}`, 
      
      JSON.stringify({
        "Name": Name,    
        "Email": Email,  
        "DOB" : DOB,  
        "userRole" : userRole,
        "address" : address,
      })
      , 
      {
        headers: {
          'content-type': 'application/json'
        }
      })
      .then(() => {
        navigate("/account/read");
      });;

  };

  return (
    <>
      <h2>Update</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            aria-describedby="emailHelp"
            value={DOB}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="form-label">User role</label>
          <select value={userRole} class="form-select" aria-label="Default select example" onChange={(e) => setUserRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="operator">Operator</option>
            <option value="staff">Staff</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="form-label">Address</label>
          <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="form-control"></textarea>
        </div>

        <button
          type="submit"
          className="btn btn-primary mx-2"
          onClick={handleUpdate}
        >
          Update
        </button>
        <Link to="/account/read">
          <button className="btn btn-secondary mx-2"> Back </button>
        </Link>
      </form>
    </>
  );
};

export default Update;
