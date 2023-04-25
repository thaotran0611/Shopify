import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Badge,
  Stack,
  TextField,
  InputAdornment,
  Box,
  CardMedia
} from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';

export const Header = ({ loggedIn, setLoggedIn }) => {
  const navigate = useNavigate();

  const [cateState, setCateState] = useState(false)
  const [colState, setColState] = useState(false)

  const setLogOut = () => {
    setLoggedIn(false);
    navigate('/login');
  };

  return (
    <React.Fragment>
      <AppBar sx={{ background: '#fff', pt: 2 }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              ml: 10,
              fontSize: 40,
              color: '#000',
              fontStyle: 'italic',
              fontWeight: 800,
            }}>
            SHOPIFY
          </Typography>
          {loggedIn && (
            <TextField
              id="search"
              placeholder="Search for products, brands and more"
              type="search"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: '30%',
                backgroundColor: '#f6f6f6',
                mr: 2,
              }}
            />
          )}
          {loggedIn && (
            <Stack direction="row" sx={{ mr: 10 }}>
              <Button
                variant="contained"
                startIcon={
                  <Badge badgeContent={0} color="error">
                    <ShoppingBagOutlinedIcon />
                  </Badge>
                }
                disableElevation
                onClick={() => navigate('/cart')}
                sx={{
                  background: 'inherit',
                  color: '#000',
                  textTransform: 'none',
                  '&:hover': {
                    color: '#fff',
                  },
                }}>
                Đơn hàng
              </Button>
              <Button
                variant="contained"
                startIcon={<LogoutIcon />}
                disableElevation
                onClick={() => setLogOut()}
                sx={{
                  background: 'inherit',
                  color: '#000',
                  textTransform: 'none',
                  '&:hover': {
                    color: '#fff',
                  },
                }}>
                Đăng xuất
              </Button>
              <Button
                variant="contained"
                disableElevation
                sx={{
                  background: 'inherit',
                  color: '#000',
                  textTransform: 'none',
                  '&:hover': {
                    color: '#fff',
                  },
                }}>
                {JSON.parse(sessionStorage.getItem('user')).name} -{' '}
                {JSON.parse(sessionStorage.getItem('user')).role.toUpperCase()}
              </Button>
            </Stack>
          )}
          {!loggedIn && (
            <Stack direction="row" sx={{ mr: 10 }}>
              <Button
                variant="contained"
                startIcon={
                  <Badge badgeContent={0} color="error">
                    <ShoppingBagOutlinedIcon />
                  </Badge>
                }
                disableElevation
                onClick={() => navigate('/login')}
                sx={{
                  background: 'inherit',
                  color: '#000',
                  textTransform: 'none',
                  '&:hover': {
                    color: '#fff',
                  },
                }}>
                Đăng nhập
              </Button>
              <Button
                variant="contained"
                startIcon={<PermIdentityIcon />}
                disableElevation
                onClick={() => navigate('/signup')}
                sx={{
                  background: 'inherit',
                  color: '#000',
                  textTransform: 'none',
                  '&:hover': {
                    color: '#fff',
                  },
                }}>
                Đăng ký
              </Button>
            </Stack>
          )}
        </Toolbar>
        <Toolbar>
          <Button
            disableElevation
            variant="contained"
            onClick={() => navigate('/home')}
            sx={{
              ml: 8.5,
              background: 'inherit',
              color: '#000',
              '&:hover': {
                color: '#fff',
              },
              fontWeight: 600,
            }}>
            Trang chủ
          </Button>
          <Button
            disableElevation
            variant="contained"
            onClick={() => navigate('/intro')}
            sx={{
              background: 'inherit',
              color: '#000',
              '&:hover': {
                color: '#fff',
              },
              fontWeight: 600,
            }}>
            Giới thiệu
          </Button>
          <Button
            disableElevation
            variant="contained"
            onClick={() => navigate('/product')}
            sx={{
              background: 'inherit',
              color: '#000',
              '&:hover': {
                color: '#fff',
              },
              fontWeight: 600,
            }}>
            Sản phẩm
          </Button>
          <Button
            disableElevation
            variant="contained"
            onClick={() => navigate('/news')}
            sx={{
              background: 'inherit',
              color: '#000',
              '&:hover': {
                color: '#fff',
              },
              fontWeight: 600,
            }}>
            Tin tức
          </Button>
          <Button
            disableElevation
            variant="contained"
            onClick={() => navigate('/contact')}
            sx={{
              background: 'inherit',
              color: '#000',
              '&:hover': {
                color: '#fff',
              },
              fontWeight: 600,
            }}>
            Liên hệ
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

const categories = [
  'Váy đầm công sở',
  'Váy đầm sơ mi',
  'fasdfasd',
  'fasdfasd',
  'fasdfasd',
  'fasdfasd',
  'fasdfasd',
  'fasdfasd',
  'Áo sơ mi tay ngắn',
  'fasdfasd',
]

const collections = [
  'Váy đầm công sở',
  'fasdfasd',
  'fasdfasd',
  'fasdfasd',
  'fasdfasd',
  'fasdfasd',
  'fasdfasd'
]