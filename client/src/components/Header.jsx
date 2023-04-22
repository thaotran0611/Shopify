import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Badge,
  Stack,
  TextField,
  InputAdornment,
} from '@mui/material';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

export const Header = ({ loggedIn, setLoggedIn }) => {
  const navigate = useNavigate();

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
                width: '50%',
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
                  <Badge badgeContent={5} color="error">
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
                startIcon={<PermIdentityIcon />}
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
            </Stack>
          )}
        </Toolbar>
        {loggedIn && (
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
        )}
      </AppBar>
    </React.Fragment>
  );
};
