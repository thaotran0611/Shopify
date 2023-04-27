import { Typography, Stack } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './../styles/ProductItem.css';

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Image = styled.img`
  min-height: 185px !important;
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-top: 10px;
`;

const ProductSize = styled.span``;

export const ProductItem = (props) => {
  const { thumbNail, title, id, size, color, quantity, price, saleOff } = props;
  const [quant, setQuant] = useState(quantity);
  const customerID = JSON.parse(sessionStorage.getItem('user')).id;
  const navigate = useNavigate();
  console.log(quant);
  const handleDelete = () => {
    axios({
      method: 'post',
      url: 'http://localhost:8080/api/cart/deleteCart',
      data: {
        ProductID: id,
        COLOR: color,
        SIZE: size,
        CustomerID: customerID,
      },
    })
      .then((res) => {
        console.log('Success');
        navigate('/cart');
      })
      .catch((res) => {
        console.log('Error');
        console.log(res);
      });
  };
  useEffect(() => {
    axios({
      method: 'post',
      url: 'http://localhost:8080/api/cart/edit',
      data: {
        ProductID: id,
        COLOR: color,
        SIZE: size,
        CustomerID: customerID,
        NUM: quant,
      },
    })
      .then((res) => {
        console.log('Success');
        // navigate('/cart');
      })
      .catch((res) => {
        console.log('Error');
        console.log(res);
      });
  }, [quant]);
  const handleEdit = (index) => {
    if (quant <= 1) {
      setQuant(1);
    }
    if (index == 0) {
      setQuant(quant + 1);
    } else {
      setQuant(quant - 1);
    }
  };
  return (
    <Product
      style={{
        padding: 20,
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
        borderRadius: 5,
        marginRight: 20,
        marginBottom: 30,
      }}
      className="product-item_ctn"
    >
      <ProductDetail className='product-item_detail'>
        <Image src={thumbNail} className='product-item_image' />
        <Details className='product-item_detail-product'>
          <ProductName>
            <b className="product-item_bold">Tên sản phẩm:</b> {title}
          </ProductName>
          <ProductId>
            <b className="product-item_bold">Code:</b> {id}
          </ProductId>
          <ProductId>
            <b className="product-item_bold">Màu sắc:</b>
            <ProductColor color={color} />
          </ProductId>
          <ProductSize>
            <b className="product-item_bold">Kích cỡ:</b> {size}
          </ProductSize>
          <ProductSize>
            <b className="product-item_bold">Số lượng:</b> {quant}
          </ProductSize>
          <ProductSize>
            <b className="product-item_bold">Giảm giá:</b> {saleOff * 100}%
          </ProductSize>
          <ProductSize>
            <b>
              Giá:{' '}
              <b style={{ fontWeight: 'bold' }}>
                $ {Math.round(price * (1 - saleOff))}{' '}
                <b style={{ color: 'red', textDecoration: 'line-through' }}>
                  $ {price}
                </b>
              </b>
            </b>
          </ProductSize>
        </Details>
      </ProductDetail>
      <Stack direction='row'>
        <IconButton
          aria-label="remove"
          size="large"
          onClick={() => handleEdit(1)}>
          <RemoveIcon fontSize="inherit" />
        </IconButton>
        <Typography
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {quant}
        </Typography>
        <IconButton aria-label="add" size="large" onClick={() => handleEdit(0)}>
          <AddIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          size="large"
          onClick={() => handleDelete()}>
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </Stack>
    </Product>
  );
};
