import { Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
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
  return (
    <Product
      style={{
        padding: 20,
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
        borderRadius: 5,
        marginRight: 20,
        marginBottom: 30,
      }}>
      <ProductDetail>
        <Image src={thumbNail} />
        <Details>
          <ProductName>
            <b>Tên sản phẩm: {title}</b>
          </ProductName>
          <ProductId>
            <b>Code: {id}</b>
          </ProductId>
          <ProductId>
            <b>Màu sắc: </b>
            <ProductColor color={color} />
          </ProductId>
          <ProductSize>
            <b>Kích cỡ: {size}</b>
          </ProductSize>
          <ProductSize>
            <b>Số lượng: {quantity}</b>
          </ProductSize>
          <ProductSize>
            <b>Giảm giá: {saleOff * 100}%</b>
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
    </Product>
  );
};
