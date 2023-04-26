import React from 'react';
import {
  Box,
  Link,
  Breadcrumbs,
  Stack,
  Typography,
  CardMedia,
  Button,
} from '@mui/material';
import './../../styles/MyOrderPage.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
export const MyOrderPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const customerId = JSON.parse(sessionStorage.getItem('user')).id;
  useEffect(() => {
    getOrders().then((data) => {
      setOrders(data);
      console.log(orders);
    });
  }, []);
  const getOrders = async () => {
    return axios
      .get(`http://localhost:8080/api/orders/allOrder?CustomerID=${customerId}`)
      .then((res) => res.data);
  };

  const RenderOrder = () => {
    const data = orders.map((order, index) => (
      <Stack className="my-order_detail">
        <Stack className="my-order_item" direction="row">
          <Stack>
            <Typography>Order No {order.OrderID}</Typography>
            <Typography>
              <b>Order date: </b>
              {order.DATE_TIME}
            </Typography>
            <Typography>
              <b>Estimated Delivery date: </b>
              {String(new Date())}
            </Typography>
          </Stack>
          <Stack>
            <Typography>
              <b>Order Status:</b>{' '}
              {order.STATUS == 0 ? 'In Progress' : 'Completed'}
            </Typography>
            <Typography>
              <b>Payment Method:</b> {order.PAY_METHOD}
            </Typography>
          </Stack>
        </Stack>
        <Stack className="my-order_item-detail">
          <Stack className="item-detail">
            <Stack>
              <Typography>
                <b>Customer: {order.NAME}</b>
              </Typography>
              <Typography>
                <b>Phone:</b> {order.RECEIVE_PHONE}
              </Typography>
              <Typography>
                <b>Address:</b> {order.RECEIVE_ADDRESS}
              </Typography>
              <Typography>
                <b>Total Product:</b> {order.TOTAL_PRODUCT}
              </Typography>
              <Typography>
                <b>Price:</b> $ {order.TOTAL_COST}
              </Typography>
            </Stack>
            <Button
              variant="contained"
              onClick={() =>
                navigate(`/order/detail?orderID=${order.OrderID}`)
              }>
              View Details
            </Button>
          </Stack>
        </Stack>
      </Stack>
    ));
    return data;
  };

  return (
    <React.Fragment>
      <Box className="my-order_container">
        <Box className="my-order_wrapper">
          <Stack className="my-order_breadcrumbs">
            <Breadcrumbs aria-label="breadcrumbs" separator=">">
              <Link href="#">Home</Link>
              <Link href="#">Shop All</Link>
              <Link href="#">Shop All</Link>
            </Breadcrumbs>
          </Stack>
          <Stack className="my-order_content">
            <Typography>My Orders</Typography>
            <Stack className="my-order_items">
              <RenderOrder />
            </Stack>
          </Stack>
        </Box>
      </Box>
    </React.Fragment>
  );
};