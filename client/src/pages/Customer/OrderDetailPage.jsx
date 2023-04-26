import React from 'react';
import { useState, useEffect } from 'react';
import {
  Box,
  Link,
  Breadcrumbs,
  Stack,
  Typography,
  CardMedia,
} from '@mui/material';
import Button from '@mui/material/Button';
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineSeparator,
  TimelineDot,
} from '@mui/lab';
import './../../styles/OrderDetailPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const OrderDetailPage = () => {
  const params = new URLSearchParams(document.location.search);
  const orderID = params.get('orderID');
  const [orders, setOrders] = useState([]);
  const [dateTime, setDateTime] = useState('');
  const [totalCost, setTotalCost] = useState('');
  useEffect(() => {
    getOrders().then((data) => {
      setOrders(data);
      setDateTime(data[0].DATE_TIME);
      setTotalCost(data[0].TOTAL_COST);
    });
  }, []);
  const getOrders = async () => {
    return axios
      .get(`http://localhost:8080/api/orders/detail?code=${orderID}`)
      .then((res) => res.data);
  };
  const RenderItems = () => {
    const data = orders.map((order, index) => (
      <Stack direction="row" className="timeline-item" id={index}>
        <CardMedia
          component="img"
          image={order.IMG1}
          alt="unsplash img"
          style={{ objectFit: 'contain', backgroundColor: '#e3e3e3' }}
        />
        <Stack>
          <Typography style={{ width: '100%', margin: 0 }}>
            CODE: {order.CODE}
          </Typography>
          <Typography style={{ width: '100%', margin: 0 }}>
            Màu sắc: {order.COLOR}
          </Typography>
          <Typography style={{ width: '100%', margin: 0 }}>
            Kích cỡ: {order.SIZE}
          </Typography>
          <Typography style={{ width: '100%', margin: 0, fontSize: 16 }}>
            Giảm giá: {order.SALEOFF}
          </Typography>
        </Stack>
        <Typography>
          <b>Số lượng: {order.NUMBER}</b>
        </Typography>
        <Typography>
          <b>
            Giá:{' '}
            <b style={{ fontWeight: 'bold' }}>
              ${Math.round(order.PRICE * (1 - order.SALEOFF))}{' '}
              <b style={{ color: 'red', textDecoration: 'line-through' }}>
                ${order.PRICE}
              </b>
            </b>
          </b>
        </Typography>
      </Stack>
    ));
    return data;
  };
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Box className="order-status_container">
        <Box className="order-status_wrapper">
          <Stack className="order-status_breadcrumbs">
            <Breadcrumbs aria-label="breadcrumbs" separator=">">
              <Link href="#">Home</Link>
              <Link href="#">Shop All</Link>
              <Link href="#">Shop All</Link>
            </Breadcrumbs>
          </Stack>
          <Stack className="order-status_content">
            <Box
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}>
              <Typography style={{ fontSize: 30, fontWeight: 'bold' }}>
                Order Details
              </Typography>
              <Button
                variant="contained"
                size="large"
                style={{ backgroundColor: 'black' }}
                onClick={() => navigate('/order')}>
                History
              </Button>
            </Box>
            <Stack className="order-status_detail" direction="row">
              <Stack>
                <Typography>Order No {orderID}</Typography>
                <Typography>Place on {dateTime}</Typography>
              </Stack>
              <Stack>
                <Typography>
                  Total: <b>$ {totalCost} </b>
                </Typography>
              </Stack>
            </Stack>
            <Stack className="order-status_timeline-ctn">
              <Timeline className="order-status_timeline">
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <span className="timeline-content">Giao thành công</span>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <span className="timeline-content">Đang giao hàng</span>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot className="checked-timeline" />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <span className="timeline-content">Xác nhận đơn hàng</span>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot />
                  </TimelineSeparator>
                  <span className="timeline-content">Đặt thành công</span>
                </TimelineItem>
              </Timeline>
            </Stack>
            <Stack className="timeline-items">
              <RenderItems />
            </Stack>
          </Stack>
        </Box>
      </Box>
    </React.Fragment>
  );
};
