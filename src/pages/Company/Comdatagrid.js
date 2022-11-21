import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Navbar from '../../components/Navigation/Navbar';
// import { SidebarData } from "../../components/SidebarData";
import { DataGrid, GridToolbar, GridApi, GridCellValue, GridToolbarContainer, GridToolbarColumnsButton, 
  GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@material-ui/data-grid';



const Comdatagrid = () => {
  const [data, setData] = useState([]);
  const [tabledark, setTableDark] = useState("");

  const [userDataRows, setUserDataRows] = useState([]);

  ///   For navigate function
  const navigate = useNavigate();

  function logout() {
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("password");

    navigate("/");
  }

  var username = window.localStorage.getItem('username')
  var password = window.localStorage.getItem('password')
  var currentUserrole = window.localStorage.getItem('userrole')
  //alert(window.localStorage.getItem('password'));


  function handleDelete(id) {
    axios
      .delete(`http://127.0.0.1:8000/master/company/delete/${id}`,
        {
          auth: {
            username: username,
            password: password
          }
        }
      )
      .then(() => {
        //getData();
        alert("anu");
        navigate("/company/comdatagrid");
      });
  }

  const setToLocalStorage = (id, company_name, address,zip,state,gln,created_by) => {
    localStorage.setItem("id", id);
    localStorage.setItem("company_name", company_name);
    localStorage.setItem("address", address);
    localStorage.setItem("zip", zip);
    localStorage.setItem("state", state);
  
    localStorage.setItem("gln", gln);
    localStorage.setItem("created_by", created_by);
  };

  let userDataColumns = [
    { field: 'id', headerName: 'Id', width:100 },
    { field: 'company_name',headerName: 'Company Name', width: 180 },
    { field: 'address', headerName: 'Address', width: 150 },
    { field: 'zip', headerName: 'Zip', width: 100 },
    { field: 'state', headerName: 'State', width: 150 },

    { field: 'gln', headerName: 'GLN', width: 150 },
    { field: 'created_by', headerName: 'Created By', width: 170 },
    {
      field: 'edit',
      headerName: 'Edit',
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
  
          const api: GridApi = params.api;
          const thisRow: Record<string, GridCellValue> = {};
  
          api
            .getAllColumns()
            .filter((c) => c.field !== '__check__' && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
            );
          //alert(thisRow.name);
  
          setToLocalStorage(
            thisRow.id,
            thisRow.company_name,
            thisRow.address,
            thisRow.zip,
            thisRow.state,
   
            thisRow.gln,
            thisRow.created_by,
          );
  
          //return alert(JSON.stringify(thisRow, null, 4));
        };
  
        //alert(currentUserrole);


        if(currentUserrole == 'admin') {
          return <Link to="/company/comcreate/edit"><button
            className="btn btn-primary" 
            onClick={onClick}>Edit</button></Link>;
         
        }
        else {
          return <button
            className="btn btn-primary" 
            disabled="true"
            onClick={onClick}>Edit</button>;
        }
      },
    },
    {
      field: 'delete',
      headerName: 'Delete',
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
  
          const api: GridApi = params.api;
          const thisRow: Record<string, GridCellValue> = {};
  
          api
            .getAllColumns()
            .filter((c) => c.field !== '__check__' && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
            );
          //alert(thisRow.id);
    
          //return alert(JSON.stringify(thisRow, null, 4));

          axios
          .delete(`http://localhost:8000/master//company/delete/${thisRow.id}`,
            {
              auth: {
                username: username,
                password: password
              }
            }
          )
          .then(() => {
            getData();
            //alert("anu");
            //navigate("/account/read");
            window.location.reload();
          });
        };
        if(currentUserrole == 'admin'||currentUserrole=='staff') {
        return <button
          className="btn btn-danger" 
          onClick={onClick}>Delete</button>;
        }
        else{
          return <button
          className="btn btn-danger" 
          disabled="true"
          onClick={onClick}>Delete</button>;

        }
      },
    },
  ];  


  function createRows(rowDatas) {
    //alert(rowDatas.length);

    let editButton = <button></button>;  

    rowDatas.map(rowData => {
      //alert(rowData.id);
      setUserDataRows( userDataRows => [
        ...userDataRows,
        {'id':rowData.id, 'company_name':rowData.company_name,'address':rowData.address,'zip':rowData.zip,
        'state':rowData.state,'gln':rowData.gln,
        'created_by':rowData.created_by},
      ]);

    })
  }

  function getData() {
    //alert("anu");
    axios
      .get("http://127.0.0.1:8000/master/company/",
        {
          auth: {
            username: username,
            password: password
          }
        },
        {
          'param': 'anu' 
        }
      )
      .then((res) => {
        //alert(res.data.length);
        setData(res.data);
        createRows(res.data);
      });
  }

  function handleDelete(id) {
    axios
      .delete(`http://localhost:8000/master/company/delete/${id}`,
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

  const navigateToCreatePage = () => {
    navigate("/company/comcreate/new");
  };

  useEffect(() => {
    //console.log('i fire once');
    getData();
    //alert("anu");
  }, []);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }  

  return (
    <>

       <Navbar/> 
   
      <div style={{ height: 700, width: '390%',backgroundColor:'#6199c7' }}>
        <h5>COMPANYS</h5>
        <button align='right'
        disabled={currentUserrole==="operator" || currentUserrole==="staff" ? true : false}
        onClick={navigateToCreatePage} 
        className="btn btn-success">Create</button>
        <DataGrid rows={userDataRows} columns={userDataColumns} pageSize={10} components={{ Toolbar: CustomToolbar }}/>
       
      </div>

    </>
  );
};

export default Comdatagrid;