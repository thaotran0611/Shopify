import '../../styles/UserList.css';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserList() {
  // const [data, setData] = useState(userRows);

  const [user, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/users/all')
      .then((result) => {
        console.log(result.data);
        setUsers(result.data);
      })
      .catch((error) => console.log(error));
  }, []);

  /*
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  */

  const columns = [
    { field: 'CustomerID', headerName: 'ID', width: 70 },
    {
      field: 'NAME',
      headerName: 'Full Name',
      width: 250,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.AVATAR} alt="" />
            {params.row.NAME}
          </div>
        );
      },
    },
    { field: 'Phone_Number', headerName: 'Phone Number', width: 180 },
    {
      field: 'BIRTHDAY',
      headerName: 'Birthday',
      width: 150,
    },
    {
      field: 'ROLE',
      headerName: 'Role',
      width: 160,
    },
    {
      field: 'USERNAME',
      headerName: 'User Name',
      width: 160,
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        getRowId={(row) => row.CustomerID}
        rows={user}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
