import React from 'react';
import { 
  Box,
  Link,
  Breadcrumbs,
  Stack,
  Typography,
  CardMedia
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineSeparator,
  TimelineDot,
} from '@mui/lab';
import './../../styles/OrderDetailPage.css';

export const OrderDetailPage = () => {

  const RenderItems = () => {
    let list = [];
    for (let i = 0; i < 5; i++) {
      list.push(
        <Stack direction='row' className="timeline-item" id={i == 4 && "last-item"}>
          <CardMedia
            component="img"
            image="https://picsum.photos/1900/800"
            alt="unsplash img"
          />
          <Stack>
            <Typography>
              Luiz Vitton Lace Suit
            </Typography>
            <Typography>
              Lorem ipsum dolor sit amet consectetur
            </Typography>
          </Stack>
          <Typography>
            <b>Qty: </b> 20
          </Typography>
          <Typography>
            $200
          </Typography>
        </Stack>
      )}
    return list;
  };

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
            <Typography>
              Order Details
            </Typography>
            <Stack className="order-status_detail" direction='row'>
              <Stack>
                <Typography>
                  Order No #123456789
                </Typography>
                <Typography>
                  Place on 18 Oct 2022 2:40 PM
                </Typography>
              </Stack>
              <Stack>
                <Typography>
                  Total: <b>$125</b>
                </Typography>
              </Stack>
            </Stack>
            <Stack className="order-status_timeline-ctn">
              <Timeline className='order-status_timeline'>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <span className='timeline-content'>Giao thành công</span>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <span className='timeline-content'>Đang giao hàng</span>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot className='checked-timeline'/>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <span className='timeline-content'>Xác nhận đơn hàng</span>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot />
                  </TimelineSeparator>
                  <span className='timeline-content'>Đặt thành công</span>
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