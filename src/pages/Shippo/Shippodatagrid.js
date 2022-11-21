import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Navbar from "../../components/Navigation/Navbar";
// import { SidebarData } from "../../components/SidebarData";
import { DataGrid, GridToolbar, GridApi, GridCellValue, GridToolbarContainer, GridToolbarColumnsButton, 
  GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@material-ui/data-grid';



const Shippodatagrid = () => {
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
      .delete(`http://127.0.0.1:8000/master/shippo/delete/${id}`,
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
        navigate("/shippo/shippodatagrid");
      });
  }

  const setToLocalStorage = (id,shipping_order_name,source_location,destination_location,created_by,subject_name,shipping_date,batch_for_export) => {
    localStorage.setItem("id", id);
    localStorage.setItem("shipping_order_name",shipping_order_name);
    localStorage.setItem(" source_location",  source_location);
    localStorage.setItem("destination_location", destination_location);
    localStorage.setItem("created_by", created_by);
    localStorage.setItem("subject_name", subject_name);
    localStorage.setItem("shipping_date", shipping_date);
    localStorage.setItem("batch_for_export", batch_for_export);
  };

  let userDataColumns = [
    { field: 'id', headerName: 'Id', width:100 },
    { field: 'shipping_order_name',headerName: 'shipping_order_name', width: 180 },
    { field: ' source_location', headerName: 'source_location', width: 150 },
    { field: 'destination_location', headerName: 'destination_location', width: 150 },
    { field: 'subject_name', headerName: 'subject_name', width: 150 },
    { field: 'shipping_date', headerName: 'shipping_date', width: 150 },
    { field: 'batch_for_export', headerName: 'batch_for_export', width: 150 },



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
            thisRow.shipping_order_name,
            thisRow.source_location,
            thisRow.destination_location,
            thisRow.created_by,
            thisRow.subject_name,
            thisRow.shipping_date,
            thisRow.batch_for_export
          );
  
          //return alert(JSON.stringify(thisRow, null, 4));
        };
  
        //alert(currentUserrole);


        if(currentUserrole == 'admin') {
          return <Link to="/shippo/shippocreate/edit"><button
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
          .delete(`http://127.0.0.1:8000/master/shippo/delete/${thisRow.id}`,
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
        {'id':rowData.id, 'shipping_order_name':rowData.shipping_order_name,'source_location':rowData.source_location,
        'destination_location':rowData.destination_location,
        'created_by':rowData.created_by,'subject_name':rowData.subject_name,'shipping_date':rowData.shipping_date,'batch_for_export':rowData.batch_for_export},
      ]);

    })
  }

  function getData() {
    //alert("anu");
    axios
      .get("http://127.0.0.1:8000/master/shippo/",
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
      .delete(`http://127.0.0.1:8000/master/shippo/delete/${id}`,
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
    navigate("/shippo/shippocreate/new");
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
   <div className="b2">
      <div style={{ height: 700, width:'390%',backgroundColor:'#6199c7' }}>
        <h5>SHIP PO</h5>
        <button align='right'
        disabled={currentUserrole==="operator" || currentUserrole==="staff" ? true : false}
        onClick={navigateToCreatePage} 
        className="btn btn-success">Create</button>
        <DataGrid rows={userDataRows} columns={userDataColumns} pageSize={10} components={{ Toolbar: CustomToolbar }}/>
       
      </div>
      </div>

    </>
  );
};

export default Shippodatagrid;