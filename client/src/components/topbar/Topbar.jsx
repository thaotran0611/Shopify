import React, { useState } from 'react';
import './topbar.css';
import { Avatar } from '@mui/material';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
export default function Topbar() {
  const navigate = useNavigate();
  const setLogOut = () => {
    sessionStorage.removeItem('user');
    navigate('/login');
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Shopify</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            {JSON.parse(sessionStorage.getItem('user')).name}
          </div>
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
          <Link
            to={
              'http://localhost:3000/dashboard/user/' +
              JSON.parse(sessionStorage.getItem('user')).username
            }>
            <Avatar
              src={JSON.parse(sessionStorage.getItem('user')).avatar}
              alt=""
              className="topAvatar"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
