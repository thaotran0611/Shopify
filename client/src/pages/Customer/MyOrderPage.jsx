import React from 'react';
import { 
  Box,
  Link,
  Breadcrumbs,
  Stack,
  Typography,
  CardMedia,
  Button
} from '@mui/material';
import './../../styles/MyOrderPage.css';

export const MyOrderPage = () => {

  const RenderOrder = () => {
    let list = [];
    for (let i = 0; i < 5; i++) {
      list.push(
        <Stack className="my-order_detail">
          <Stack className='my-order_item' direction='row'>
            <Stack>
              <Typography>
                Order No #123456789
              </Typography>
              <Typography>
                <b>Order date: </b>18 Oct 2022 2:40 PM
              </Typography>
              <Typography>
                <b>Estimated Delivery date: </b>20 Oct 2022
              </Typography>
            </Stack>
            <Stack>
              <Typography>
                <b>Order Status:</b> Inprogress
              </Typography>
              <Typography>
                <b>Payment Method:</b> Cash On Delivery
              </Typography>
            </Stack>
          </Stack>
          <Stack className="my-order_item-detail">
            <Stack direction='row' className="item-detail">
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
                  <b>Qty: </b> 20
                </Typography>
                <Typography>
                  <b>Total: </b> $200
                </Typography>
              </Stack>
              <Button variant="contained">View Details</Button>
            </Stack>
          </Stack>
        </Stack>
      )}
    return list;
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
            <Typography>
              My Orders
            </Typography>
            <Stack className="my-order_items">
              <RenderOrder />
            </Stack>
          </Stack>
        </Box>
      </Box>
    </React.Fragment>
  );
};