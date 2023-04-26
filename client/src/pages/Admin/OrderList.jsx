import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { GridCheckIcon } from '@mui/x-data-grid';
import axios from 'axios';
export default function OrderList() {
  const [render, setRender] = useState(false);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/orders/all')
      .then((result) => {
        console.log(result.data);
        setOrders(result.data);
      })
      .catch((error) => console.log(error));
  }, [, render]);

  const columns = [
    { field: 'OrderID', headerName: 'OrderID', width: 100 },
    {
      field: 'CustomerID',
      headerName: 'CustomerID',
      width: 100,
    },
    { field: 'TOTAL_PRODUCT', headerName: 'Total Product', width: 150 },
    {
      field: 'TOTAL_COST',
      headerName: 'Total Cost',
      width: 150,
    },
    {
      field: 'PAY_METHOD',
      headerName: 'Pay method',
      width: 150,
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
            {params.row.STATUS == 0 ? (
              <button
                style={{ backgroundColor: 'orange' }}
                onClick={() => {
                  axios({
                    method: 'put',
                    url: 'http://localhost:8080/api/orders/confirm',
                    data: {
                      OrderID: params.row.OrderID,
                    },
                  })
                    .then((res) => {
                      console.log(res);
                      setRender(!render);
                    })
                    .catch((res) => {
                      // setOpenError(true);
                      console.log(res);
                    });
                }}
                className="userListEdit">
                Confirm
              </button>
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
      <DataGrid
        getRowId={(row) => row.OrderID}
        rows={orders}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        // checkboxSelection
      />
    </div>
  );
}
