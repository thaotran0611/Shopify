import styled from 'styled-components';
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductItem } from '../../components/ProductItem';
import axios from 'axios';
import { Box, Typography, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import '../../styles/CartPage.css';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 30vh;
  margin-bottom: 20px;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === 'total' && '500'};
  font-size: ${(props) => props.type === 'total' && '24px'};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const PaymentForm = ({ cost, totalProduct }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [payment, setPayment] = useState('cash');
  const [note, setNote] = useState('');
  const [phone, setPhone] = useState('');
  const [add, setAdd] = useState('');
  const customerID = sessionStorage.getItem('user')
    ? JSON.parse(sessionStorage.getItem('user')).id
    : '0';

  const handleConfirmPayment = () => {
    let customerName = '';
    if (sessionStorage.getItem('user')) {
      customerName = JSON.parse(sessionStorage.getItem('user')).name;
    } else {
      return;
    }
    if (name == '' || phone == '' || add == '') {
      setOpen(true);
      return;
    }
    axios({
      method: 'post',
      url: 'http://localhost:8080/api/orders/add',
      data: {
        CUSTOMER: customerID,
        NAME: name,
        PAY: payment,
        NOTE: note,
        PHONE: phone,
        ADD: add,
        COST: cost,
        NUM: totalProduct,
      },
    })
      .then((res) => {
        console.log('Success');
        navigate('/order');
      })
      .catch((res) => {
        console.log('Error');
        console.log(res);
      });
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Box
        style={{
          boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
          borderRadius: 5,
          // height: '65vh',
        }}>
        <Box>
          <Typography
            style={{
              textAlign: 'center',
              padding: 10,
              fontSize: 30,
              fontWeight: 'bold',
            }}>
            Thanh toán
          </Typography>
          <Box
            style={{ width: '80%', margin: '20px auto' }}
            className="cart-page_textfield-ctn">
            <TextField
              id="outlined-basic"
              label="Họ tên"
              variant="outlined"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', marginBottom: 20 }}
            />
            <TextField
              id="outlined-basic"
              label="Số điện thoại"
              variant="outlined"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ width: '100%', marginBottom: 20 }}
            />
            <TextField
              id="outlined-basic"
              label="Địa chỉ"
              variant="outlined"
              required
              value={add}
              onChange={(e) => setAdd(e.target.value)}
              style={{ width: '100%', marginBottom: 20 }}
            />
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={payment}
              label="Payment"
              style={{ width: '100%', marginBottom: 20 }}
              onChange={(e) => setPayment(e.target.value)}>
              <MenuItem value={'cash'}>Cash</MenuItem>
              <MenuItem value={'momo'}>Momo</MenuItem>
            </Select>
            <TextField
              id="outlined-basic"
              label="Ghi chú"
              variant="outlined"
              style={{ width: '100%', marginBottom: 20 }}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <Button
              variant="contained"
              size="large"
              onClick={() => handleConfirmPayment()}
              style={{ width: '100%', marginBottom: 30 }}>
              Xác nhận thanh toán
            </Button>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: '100%' }}>
                Vui lòng nhập đầy đủ thông tin!!
              </Alert>
            </Snackbar>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

const CartPage = () => {
  const [productData, setProductData] = useState([]);
  const [bill, setBill] = useState([]);
  const customerID = sessionStorage.getItem('user')
    ? JSON.parse(sessionStorage.getItem('user')).id
    : '0';
  useEffect(() => {
    getCarts()
      .then((data) => {
        setProductData(data);
      })
      .catch((err) => {
        setProductData([]);
      });
  }, [productData]);
  useEffect(() => {
    getBill()
      .then((data) => {
        setBill([data[0]['TOTAL_COST'], data[0]['SUM(NUMBER)']]);
      })
      .catch((err) => {
        setBill([]);
      });
  }, [productData]);
  const getCarts = async () => {
    return axios
      .get(`http://localhost:8080/api/cart/detailCart?id=${customerID}`)
      .then((res) => res.data)
      .catch((err) => setProductData([]));
  };
  const getBill = async () => {
    return axios
      .get(`http://localhost:8080/api/cart/calculate?id=${customerID}`)
      .then((res) => res.data)
      .catch((err) => setBill([]));
  };
  const navigate = useNavigate();
  return (
    <Container style={{ marginTop: 180 }} className="cart-page_wrapper">
      <Wrapper>
        <Title style={{ fontSize: 30, fontWeight: 'bold' }}>
          ĐƠN HÀNG CỦA TÔI
        </Title>
        {!productData && <div></div>}
        {productData && (
          <Bottom
            style={{ width: '80%', margin: '50px auto' }}
            className="cart-page_ctn">
            <Info>
              {productData &&
                productData.map((product) => (
                  <ProductItem
                    id={product.CODE}
                    thumbNail={product.IMG1}
                    title={product.NAME}
                    size={product.SIZE}
                    color={product.COLOR}
                    saleOff={product.SALEOFF}
                    quantity={product.NUMBER}
                    price={product.PRICE}
                  />
                ))}
            </Info>
            {!productData && <div></div>}
            {productData && bill.length > 0 && (
              <Box
                sx={{ width: '40%', margin: '0 auto', minWidth: '350px' }}
                className="cart-page_summary">
                <Summary>
                  <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                  <SummaryItem>
                    <SummaryItemText>Total</SummaryItemText>
                    <SummaryItemPrice>
                      ${' '}
                      {bill.length > 0 && productData ? Math.round(bill[0]) : 0}
                    </SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemText>Estimated Shipping</SummaryItemText>
                    <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemText>Shipping Discount</SummaryItemText>
                    <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem type="total">
                    <SummaryItemText style={{ fontWeight: 'bold' }}>
                      Total
                    </SummaryItemText>
                    <SummaryItemPrice style={{ fontWeight: 'bold' }}>
                      ${' '}
                      {bill.length > 0 && productData ? Math.round(bill[0]) : 0}
                    </SummaryItemPrice>
                  </SummaryItem>
                </Summary>
                <PaymentForm
                  cost={Math.round(bill[0])}
                  totalProduct={Math.round(bill[1])}
                />
              </Box>
            )}
          </Bottom>
        )}
      </Wrapper>
    </Container>
  );
};

export default CartPage;
