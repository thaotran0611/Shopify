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
              onMouseOver={() => setCateState(true)}
              onMouseLeave={() => setCateState(false)}
              sx={{
                background: 'inherit',
                color: '#000',
                '&:hover': {
                  color: '#fff',
                },
                fontWeight: 600,
              }}>
              Phân loại
            </Button>
            <Button
              disableElevation
              variant="contained"
              onClick={() => navigate('/contact')}
              onMouseOver={() => setColState(true)} 
              onMouseLeave={() => setColState(false)} 
              sx={{
                background: 'inherit',
                color: '#000',
                '&:hover': {
                  color: '#fff',
                },
                fontWeight: 600,
              }}>
              Bộ sưu tập
            </Button>
          </Toolbar>
        )}
        {cateState && (
          <Box 
            onMouseOver={() => setCateState(true)} 
            onMouseLeave={() => setCateState(false)} 
            sx={{ 
              zIndex: '999999', 
              px: '91px',
              mt: '-13px',
            }}
          >
            <Stack sx={{ py: '40px', px: '30px', display: 'flex', justifyContent: 'space-between' }} direction='row'>
              <CardMedia
                component="img"
                image="https://picsum.photos/700/900"
                alt="unsplash img"
                sx={{
                  width: '220px',
                  height: '280px',
                  objectFit: 'contain',
                  backgroundColor: '#e3e3e3',
                }}
              />
              <Stack 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  flexWrap: 'wrap', 
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  alignContent: 'flex-start'
                }}
              > 
                {categories.map((text, index) => (
                  <Typography 
                    align='right'
                    key={index} 
                    width='200px'
                    maxHeight='50px'
                    sx={{ 
                      color: '#786665',
                      pl: '30px',
                      mb: '10px',
                      fontSize: '16px',
                      textAlign: 'left',
                      fontWeight: '600',
                      cursor: 'pointer',
                      "&:hover": { 
                        color: "#4bc1f4"                      
                      }
                    }}
                  >
                    {text}
                  </Typography>
                ))}
              </Stack>
              <CardMedia
                component="img"
                image="https://picsum.photos/700/900"
                alt="unsplash img"
                sx={{
                  width: '220px',
                  height: '280px',
                  objectFit: 'contain',
                  backgroundColor: '#e3e3e3',
                }}
              />
            </Stack>
          </Box>
        )}
        {colState && (
          <Box 
            onMouseOver={() => setColState(true)} 
            onMouseLeave={() => setColState(false)} 
            sx={{ 
              zIndex: '999999', 
              px: '91px',
              mt: '-13px',
            }}
          >
            <Stack sx={{ py: '40px', px: '30px', display: 'flex', justifyContent: 'space-between' }} direction='row'>
              <CardMedia
                component="img"
                image="https://picsum.photos/700/900"
                alt="unsplash img"
                sx={{
                  width: '220px',
                  height: '280px',
                  objectFit: 'contain',
                  backgroundColor: '#e3e3e3',
                }}
              />
              <Stack 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  flexWrap: 'wrap', 
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  alignContent: 'flex-start'
                }}
              > 
                {collections.map((text, index) => (
                  <Typography 
                    align='right'
                    key={index} 
                    width='200px'
                    maxHeight='50px'
                    sx={{ 
                      color: '#786665',
                      pl: '30px',
                      mb: '10px',
                      fontSize: '16px',
                      textAlign: 'left',
                      fontWeight: '600',
                      cursor: 'pointer',
                      "&:hover": { 
                        color: "#4bc1f4"                      
                      }
                    }}
                  >
                  {text}
                </Typography>
                ))}
              </Stack>
              <CardMedia
                component="img"
                image="https://picsum.photos/700/900"
                alt="unsplash img"
                sx={{
                  width: '220px',
                  height: '280px',
                  objectFit: 'contain',
                  backgroundColor: '#e3e3e3',
                }}
              />
            </Stack>
          </Box>
        )}
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