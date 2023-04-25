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
  IconButton,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export const LoginPage = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  const [invisible, setInvisible] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const handleVis = () => {
    setInvisible(!invisible);
  };
  const handleSubmitLogin = () => {
    axios({
      method: 'put',
      url: 'http://localhost:8080/api/users/login',
      data: {
        username: username,
        password: password,
      },
    })
      .then((res) => {
        const dataResponse = {
          id: res.data.data.id,
          phone: res.data.data.phone,
          avatar: res.data.data.avatar,
          birthday: res.data.data.birthday,
          name: res.data.data.name,
          token: res.data.data.token,
          role: res.data.data.role,
        };
        sessionStorage.setItem('user', JSON.stringify(dataResponse));
      })
      .then(() => {
        setLoggedIn(true);
        navigate('/home');
      })
      .catch((res) => {
        console.log(res);
        setOpen(true);
      });
  };
  return (
    <React.Fragment>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={30}
        mb={10}>
        <Box direction="column">
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ fontSize: 30, fontWeight: 700, textAlign: 'center' }}>
            Log In
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ fontSize: 20, textAlign: 'center' }}>
            Don't have an account yet?
            <Typography
              component="span"
              sx={{ fontSize: 20, fontWeight: 700, pl: 1, cursor: 'pointer' }}
              onClick={() => navigate('../signup')}>
              Create an account
            </Typography>
          </Typography>
          <Stack sx={{ width: '450px', boxShadow: 3, p: 5, mt: 3 }}>
            <TextField
              placeholder="Username"
              sx={{ backgroundColor: '#f7f8fa' }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              placeholder="Password"
              type={invisible ? 'password' : 'text'}
              value={password}
              sx={{ backgroundColor: '#f7f8fa', mt: 3 }}
              onChange={(e) => setPassword(e.target.value)}
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
            <Button
              variant="contained"
              disableElevation
              sx={{ color: '#fff', backgroundColor: '#000', mt: 2, p: 2 }}
              onClick={() => handleSubmitLogin()}>
              Log In
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
                Incorrect name or password
              </Alert>
            </Snackbar>
          </Stack>
        </Box>
      </Box>
    </React.Fragment>
  );
};
