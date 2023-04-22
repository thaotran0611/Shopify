import React from 'react';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

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
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  margin-top: 20px;
`;

export const ProductItem = ({
  thumbNail,
  title,
  id,
  size,
  color,
  quantity,
  price,
}) => {
  const [num, setNum] = useState(quantity);
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
            <b>Product: {title}</b>
          </ProductName>
          <ProductId>
            <b>ID: {id}</b>
          </ProductId>
          <ProductColor color={color} />
          <ProductSize>
            <b>Size: {size}</b>
          </ProductSize>
        </Details>
      </ProductDetail>
      <PriceDetail>
        <ProductAmountContainer>
          <IconButton aria-label="add" onClick={() => setNum(num + 1)}>
            <AddIcon />
          </IconButton>
          <ProductAmount>{num}</ProductAmount>
          <IconButton aria-label="remove" onClick={() => setNum(num - 1)}>
            <RemoveIcon />
          </IconButton>
        </ProductAmountContainer>
        <ProductPrice>${price}</ProductPrice>
      </PriceDetail>
    </Product>
  );
};
