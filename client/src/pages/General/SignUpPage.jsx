import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  IconButton,
  Link,
} from '@mui/material';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import '../../styles/SignUpPage.css';

export const SignUpPage = () => {
  const navigate = useNavigate();
  const [invisible, setInvisible] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthDay] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const handleVis = () => {
    setInvisible(!invisible);
  };

  function returnLogin() {
    navigate('../login');
  }
  const handleSubmitSignUp = () => {
    if (username == '' || password == '') {
      setOpenError(true);
      return;
    }
    axios({
      method: 'post',
      url: 'http://localhost:8080/api/users/signup',
      data: {
        username: username,
        password: password,
        name: name,
        phone: phone,
        birthday: birthday,
        avatar: '',
        role: 'customer',
      },
    })
      .then((res) => {
        setOpenSuccess(true);
      })
      .catch((res) => {
        setOpenError(true);
      });
  };
  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
  };
  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenError(false);
  };
  return (
    <React.Fragment>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={20}
        mb={5}
        className="sign-up_ctn"
      >
        <Box direction="column">
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ fontSize: 30, fontWeight: 700, textAlign: 'center' }}>
            Sign Up
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ fontSize: 20, textAlign: 'center' }}>
            Already have an account?
            <br className='sign-up_break-page'/>
            <Typography
              component="span"
              sx={{ fontSize: 20, fontWeight: 700, pl: 1, cursor: 'pointer' }}
              onClick={returnLogin}>
              Log in
            </Typography>
          </Typography>
          <Stack 
            sx={{ 
              width: '500px', 
              boxShadow: 3, 
              p: 5, 
              my: 3 
            }}
            className="sign-up_form"
          >
            <TextField
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              sx={{
                backgroundColor: '#f7f8fa',
                mt: 3,
                '& .MuiOutlinedInput-root': {
                  '& > fieldset': {
                    border: 'none',
                  },
                },
              }}
            />
            <TextField
              placeholder="Your Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              sx={{
                backgroundColor: '#f7f8fa',
                mt: 3,
                '& .MuiOutlinedInput-root': {
                  '& > fieldset': {
                    border: 'none',
                  },
                },
              }}
            />
            <input
              type="date"
              value={birthday}
              onChange={(e) => setBirthDay(e.target.value)}
              required
              style={{
                marginTop: '20px',
                padding: '15px 10px',
                backgroundColor: '#f7f8fa',
                border: 'none',
              }}></input>
            <TextField
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              sx={{
                backgroundColor: '#f7f8fa',
                mt: 3,
                '& .MuiOutlinedInput-root': {
                  '& > fieldset': {
                    border: 'none',
                  },
                },
              }}
            />
            <TextField
              placeholder="Password"
              type={invisible ? 'password' : 'text'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{
                backgroundColor: '#f7f8fa',
                mt: 3,
                '& .MuiOutlinedInput-root': {
                  '& > fieldset': {
                    border: 'none',
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {invisible ? (
                      <IconButton onClick={() => handleVis()}>
                        <VisibilityOffIcon />
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => handleVis()}>
                        <VisibilityIcon />
                      </IconButton>
                    )}
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              label={
                <div>
                  <span className='sign-up_policy'>Yes, I agree with </span>
                  <Link
                    to={'/terms'}
                    sx={{
                      fontWeight: 700,
                      textDecoration: 'none',
                      color: '#000',
                    }}
                    className='sign-up_policy'
                  >
                    Privacy Policy
                  </Link>
                  <span className='sign-up_policy'> and </span>
                  <Link
                    to={'/privacy'}
                    sx={{
                      fontWeight: 700,
                      textDecoration: 'none',
                      color: '#000',
                    }}
                    className='sign-up_policy'
                  >
                    Terms of Use
                  </Link>
                </div>
              }
              control={<Checkbox />}
              sx={{ mt: 2, fontSize: 20 }}
            />
            <Button
              variant="contained"
              disableElevation
              sx={{ color: '#fff', backgroundColor: '#000', mt: 2, p: 2 }}
              onClick={() => handleSubmitSignUp()}>
              Create Account
            </Button>
            <Snackbar
              open={openSuccess}
              autoHideDuration={6000}
              onClose={handleCloseSuccess}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
              <Alert
                onClose={handleCloseSuccess}
                severity="success"
                sx={{ width: '100%' }}>
                Đăng ký thành công
              </Alert>
            </Snackbar>
            <Snackbar
              open={openError}
              autoHideDuration={6000}
              onClose={handleCloseError}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
              <Alert
                onClose={handleCloseError}
                severity="error"
                sx={{ width: '100%' }}>
                Đăng ký thất bại
              </Alert>
            </Snackbar>
          </Stack>
        </Box>
      </Box>
    </React.Fragment>
  );
};