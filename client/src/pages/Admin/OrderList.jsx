import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { userRows } from '../../dummyData';
import { GridCheckIcon } from '@mui/x-data-grid';
export default function OrderList() {
  const [data, setData] = useState(userRows);

  // useEffect

  const columns = [
    { field: 'OrderID', headerName: 'OrderID', width: 100 },
    {
      field: 'CustomerID',
      headerName: 'CustomerID',
      width: 100,
    },
    { field: 'TOTAL_PRODUCT', headerName: 'Total Product', width: 100 },
    {
      field: 'TOTAL_COST',
      headerName: 'Total Cost',
      width: 100,
    },
    {
      field: 'PAY_METHOD',
      headerName: 'Pay method',
      width: 120,
    },
    {
      field: 'RECEIVE_PHONE',
      headerName: 'Phone',
      width: 120,
    },
    {
      field: 'RECEIVE_ADDRESS',
      headerName: 'Adress',
      width: 120,
    },
    {
      field: 'STATUS',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {params.row.STATUS ? (
              <Link to={'../dashboard/user/' + params.row.STATUS}>
                <button className="userListEdit">Confirm</button>
              </Link>
            ) : (
              <GridCheckIcon sx={{ color: 'green' }} />
            )}
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <Link to="../dashboard/newUser">
        <button className="userAddButton">Create</button>
      </Link>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
