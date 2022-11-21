import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Navbar from "../Navigation/Navbar";
import { DataGrid } from '@mui/x-data-grid';
import { Box,Typography } from "@mui/material";
const Read = () => {
  const [data, setData] = useState([]);
  // const [da, setDa] = useState([]);
  const [tabledark, setTableDark] = useState("");
  const [query,setQuery]=useState("");

  ///   For navigate function
  const navigate = useNavigate();

  // function logout() {
  //   window.localStorage.removeItem("username");
  //   window.localStorage.removeItem("password");

  //   navigate("/account/login");
    
  // }

  // var username = window.localStorage.getItem('username')
  // var password = window.localStorage.getItem('password')
  // var currentUserrole = window.localStorage.getItem('userrole')
  // alert(window.localStorage.getItem('userrole'));

  function getData() {

    axios
      .get("http://127.0.0.1:8000/accounts/register/",
        {
         
          auth: {
            username: username,
            password: password
          }
        },
        // {
        //   'param': 'anu' 
        // }
      )
      .then((res) => {
        setData(res.data);
      });
  }

  function handleDelete(id) {
    axios
      .delete(`http://localhost:8000/accounts/delete/${id}`,
        {
        auth: {
          username: username,
        password: password
       }
       }
      )
      .then(() => {
        getData();
      });
  }

  const setToLocalStorage = (id, Name, email, date_birth, userRole, address) => {
    localStorage.setItem("id", id);
    localStorage.setItem("Name", Name);
    localStorage.setItem("email", email);
    localStorage.setItem("date_birth", date_birth);
    localStorage.setItem("userRole", userRole);
    localStorage.setItem("address", address);
    // localStorage.setItem("password", password);
  };
  const navigateToCreatePage = () => {
    navigate("/account/create/new");
  };
  useEffect(() => {
    getData();
  }, []);
// useEffect(()=>{
//   const fetchUsers=async()=>{
//     const res=await axios.get("http://127.0.0.1:8000/accounts/register/")
//     setDa(res.da)
//   };
//   fetchUsers()
// },[])
  return (
    <>
    
    <Navbar/>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          onClick={() => {
            if (tabledark === "table-dark") setTableDark("");
            else setTableDark("table-dark");
          }}
        />
      </div>
      <div className="d-flex justify-content-between m-2">
        <h2>Read Operation</h2>
        <button
        // disabled={currentUserrole==="operator" || currentUserrole==="staff" ? true : false}
        onClick={navigateToCreatePage} 
        className="btn btn-success">Create</button>
             {/* <input className="search" placeholder="search..." onChange={(e)=>setQuery(e.target.value)}></input>  */}
      </div>

      <table className={`table ${tabledark}`}>
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">DOB</th>
            <th scope="col">userRole</th>
            <th scope="col">address</th>
            {/* <th scope="col">password</th>  */}
          </tr>
        </thead>
        {data.map((eachData) => {
          return (
            <>
              <tbody>
                <tr>
                  <th scope="row">{eachData.id}</th>
                  <td>{eachData.Name}</td>
                  <td>{eachData.email}</td>
                  <td>{eachData.date_birth}</td>
                  <td>{eachData.userRole}</td>
                  <td>{eachData.address}</td>
                   {/* <td>{eachData.password}</td> */}
                  
                  <td>
                    <Link to="/account/create/edit">
                      <button 
                      // disabled={currentUserrole==="operator"||currentUserrole==="staff" ? true : false}
                        className="btn-success"
                        onClick={() =>
                          setToLocalStorage(
                            eachData.id,
                            eachData.Name,
                            eachData.email,
                            eachData.date_birth,
                            eachData.userRole,
                            eachData.address,
                            // eachData.password,
                          )
                        }
                      >
                        Edit{" "}
                      </button>
                    </Link>
                  </td>
                  
                  <td>
                    <button
                      className="btn-danger"
                      // disabled={currentUserrole==="operator" ? true : false}
                      onClick={() => handleDelete(eachData.id)}
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              </tbody>
            </>
          );
        })}
      </table> 


       {/* <button
              type="submit"
              className="btn btn-primary"
              onClick={logout}
            >
              Logout
      </button> */}

    </>
   
  );
};

export default Read;
