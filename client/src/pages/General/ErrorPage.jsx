import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Button, Container } from '@mui/material';

export const ErrorPage = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/');
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
          <Grid container spacing={2}>
            <Grid item lg={6} xs={12}>
              <Typography variant="h1">404</Typography>
              <Typography variant="h6" sx={{ fontSize: 30, fontWeight: 600 }}>
                Oops! Page not found
              </Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>
                The page you are looking for might have been removed or
                temporarily unavailable.
              </Typography>
              <Button
                variant="contained"
                sx={{
                  color: '#fff',
                  backgroundColor: '#000',
                  width: '100%',
                  p: 1.5,
                  mt: 4,
                }}
                onClick={() => handleBack()}>
                Back to Homepage
              </Button>
            </Grid>
            <Grid item lg={6} xs={12}>
              <img
                src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
                alt=""
                width="100%"
                height={250}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </React.Fragment>
  );
};
