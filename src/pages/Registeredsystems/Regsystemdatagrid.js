import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Navbar from "../../components/Navigation/Navbar";
// import Sidebar from "../../components/Sidebar/Sidebar";
import { DataGrid, GridToolbar, GridApi, GridCellValue, GridToolbarContainer, GridToolbarColumnsButton, 
  GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@material-ui/data-grid';



const Regsystemdatagrid= () => {
  const [data, setData] = useState([]);
  const [tabledark, setTableDark] = useState("");

  const [userDataRows, setUserDataRows] = useState([]);

  ///   For navigate function
  const navigate = useNavigate();

  function logout() {
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("password");

    navigate("/account/login");
  }

  var username = window.localStorage.getItem('username')
  var password = window.localStorage.getItem('password')
  var currentUserrole = window.localStorage.getItem('userrole')
  //alert(window.localStorage.getItem('password'));


  function handleDelete(id) {
    axios
      .delete(`http://localhost:8000/productionline/registeredsystem/delete/${id}`,
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
        navigate("/regsystem/regsystemdatagrid");
      });
  }

  const setToLocalStorage = (id,manufacturinglocation_id,ip_address,system_name,line) => {
    localStorage.setItem("id", id);
    localStorage.setItem("manufacturinglocation_id",manufacturinglocation_id );
    localStorage.setItem("ip_address", ip_address );
    localStorage.setItem("system_name", system_name);
    localStorage.setItem("line",line);
  };

  let userDataColumns = [
    { field: 'id', headerName: 'Id', width: 100 },
    { field: 'manufacturinglocation_id', headerName: 'Manufacturing Location', width: 170 },
    { field: 'ip_address', headerName: 'Ip Address ', width: 170 },
    { field: 'system_name', headerName: 'System Name', width: 170 },
    { field: 'line', headerName: 'Line', width: 170 },
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
            thisRow.manufacturinglocation_id,
            thisRow.ip_address,
            thisRow.system_name,
            thisRow.line,
          );
  
          //return alert(JSON.stringify(thisRow, null, 4));
        };
  
        //alert(currentUserrole);


        if(currentUserrole == 'admin') {
          return <Link to="/regsystem/regsystemcreate/edit"><button
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
          .delete(`http://localhost:8000/productionline/registeredsystem/delete/${thisRow.id}`,
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
        {'id':rowData.id, 'manufacturinglocation_id':rowData.manufacturinglocation_id,'ip_address':rowData.ip_address,
        'system_name':rowData.system_name,'line':rowData.line},
      ]);

    })
  }

  function getData() {
    //alert("anu");
    axios
      .get("http://localhost:8000/productionline/registeredsystem",
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
      .delete(`http://localhost:8000/productionline/registeredsystem/delete/${id}`,
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
    navigate("/regsystem/regsystemcreate/new");
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

    <br/>

    <div class="container">
      <div class="row">
       
        <div class="col-10">
          <div style={{ height: 700, width: '350%',backgroundColor:'#6199c7' }}>
            <h3>Registered System</h3>
            <button align='right'
      disabled={currentUserrole==="operator" || currentUserrole==="staff" ? true : false}
      onClick={navigateToCreatePage} 
      className="btn btn-success">Create</button>
            <DataGrid rows={userDataRows} columns={userDataColumns} pageSize={10} components={{ Toolbar: CustomToolbar }}/>
          </div>
        </div>

      </div>
    </div>

  </>
  );
};

export default Regsystemdatagrid;