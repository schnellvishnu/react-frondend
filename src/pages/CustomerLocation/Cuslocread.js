import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Navbar from "../Navigation/Navbar";

const Cuslocread = () => {
  const [data, setData] = useState([]);
  const [tabledark, setTableDark] = useState("");

  ///   For navigate function
  const navigate = useNavigate();

  // function logout() {
  //   window.localStorage.removeItem("username");
  //   window.localStorage.removeItem("password");

  //   navigate("/account/login");
    
  // }

  var username = window.localStorage.getItem('username')
  var password = window.localStorage.getItem('password')
  var currentUserrole = window.localStorage.getItem('userrole')
  //alert(window.localStorage.getItem('userrole'));

  function getData() {
    axios
      .get("http://localhost:8000/master/locations/",
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
      .delete(`http://localhost:8000/master/locations/delete/${id}`,
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

  const setToLocalStorage = (id, name, address,zip,state,loc_gln,created_by) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("address", address);
    localStorage.setItem("zip", zip);
    localStorage.setItem("state", state);
    localStorage.setItem("loc_gln",loc_gln);
    localStorage.setItem("created_by", created_by);

  };
  const navigateToCreatePage = () => {
    navigate("/customerlocation/cusloccreate/new");
  };
  useEffect(() => {
    getData();
  }, []);

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
        disabled={currentUserrole==="operator" || currentUserrole==="staff" ? true : false}
        onClick={navigateToCreatePage} 
        className="btn btn-success">Create</button>
      </div>
      <table className={`table ${tabledark}`}>
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Zip</th>
            <th scope="col">State</th>
            <th scope="col">Location Gln</th>
            <th scope="col">Created By</th>
            
          </tr>
        </thead>
        {data.map((eachData) => {
          return (
            <>
              <tbody>
                <tr>
                  <th scope="row">{eachData.id}</th>
                  <td>{eachData.name}</td>
                  <td>{eachData.address}</td>
                  <td>{eachData.zip}</td>
                  <td>{eachData.state}</td>
                  <td>{eachData.loc_gln}</td>
                  <td>{eachData.created_by}</td>
                
                  
                  <td>
                    <Link to="/customerlocation/cusloccreate/edit">
                      <button disabled={currentUserrole==="operator" ||currentUserrole==="staff" ? true : false}
                        className="btn-success"
                        onClick={() =>
                          setToLocalStorage(
                            eachData.id,
                            eachData.name,
                            eachData.address,
                            eachData.zip,
                            eachData.state,
                            eachData.created_by,
                            eachData.loc_gln
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
                      disabled={currentUserrole==="operator" ? true : false}
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

export default Cuslocread;