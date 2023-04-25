import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Container } from '@mui/material';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
export const PaymentPage = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/');
  };
  const [open, setOpen] = useState(false);
  const [payment, setPayment] = React.useState('cast');
  const handlePayment = (event) => {
    setPayment(event.target.value);
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
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}>
        <Container maxWidth="md">
          <Box
            style={{
              width: '60%',
              margin: 'auto',
              boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
              borderRadius: 5,
              marginTop: 150,
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
              <Box style={{ width: '80%', margin: '20px auto' }}>
                <TextField
                  id="outlined-basic"
                  label="Họ tên"
                  variant="outlined"
                  required
                  style={{ width: 400, marginBottom: 20 }}
                />
                <TextField
                  id="outlined-basic"
                  label="Số điện thoại"
                  variant="outlined"
                  required
                  style={{ width: 400, marginBottom: 20 }}
                />
                <TextField
                  id="outlined-basic"
                  label="Địa chỉ"
                  variant="outlined"
                  required
                  style={{ width: 400, marginBottom: 20 }}
                />
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={payment}
                  label="Payment"
                  style={{ width: 400, marginBottom: 20 }}
                  onChange={handlePayment}>
                  <MenuItem value={'cast'}>Cast</MenuItem>
                  <MenuItem value={'momo'}>Momo</MenuItem>
                </Select>
                <TextField
                  id="outlined-basic"
                  label="Ghi chú"
                  variant="outlined"
                  style={{ width: 400, marginBottom: 20 }}
                />
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => setOpen(true)}
                  style={{ width: 400, marginBottom: 30 }}>
                  Xác nhận thanh toán
                </Button>
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                  <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: '100%' }}>
                    Thanh toán thành công
                  </Alert>
                </Snackbar>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </React.Fragment>
  );
};
