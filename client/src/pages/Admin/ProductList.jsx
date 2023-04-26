import '../../styles/ProductList.css';
import { DeleteOutline } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ProductList() {
  //const [data, setData] = useState(productRows);
  const navigate = useNavigate();
  const [product, setProducts] = useState([]);
  const [render, setRender] = useState(false);
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/products/all')
      .then((result) => {
        console.log(result.data);
        setProducts(result.data);
      })
      .catch((error) => console.log(error));
  }, [, render]);
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/products/all')
      .then((result) => {
        navigate('/dashboard/products');
        console.log(result.data);
      })
      .catch((error) => console.log(error));
  }, [, render]);

  const handleDelete = (id) => {
    axios({
      method: 'POST',
      url: `http://localhost:8080/api/products/delete`,
      data: {
        CODE: id,
      },
    })
      .then((res) => {
        setRender(!render);
      })
      .catch((res) => {
        console.log('Error');
      });
  };

  const columns = [
    { field: 'CODE', headerName: 'ID', width: 90 },
    { field: 'NAME', headerName: 'Name', width: 200 },
    {
      field: 'PRICE',
      headerName: 'Price',
      width: 120,
    },
    {
      field: 'SALEOFF',
      headerName: 'Sale Off',
      width: 160,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={'../dashboard/product/' + params.row.CODE}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.CODE)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <Link to={'../dashboard/newProduct'}>
        <button className="productListNew">+ New Product</button>
      </Link>
      <DataGrid
        getRowId={(row) => row.CODE}
        rows={product}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
      />
    </div>
  );
}
