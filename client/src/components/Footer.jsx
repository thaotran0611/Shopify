import React from 'react';
import {
  Box,
  Stack,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardMedia,
} from '@mui/material';
import './../styles/Footer.css';

export const Footer = () => {
  return (
    <React.Fragment>
      <Box className="footer_container">
        <Box>
          <Grid container className='footer_grid'>
            <Grid item lg={3} md={4} sm={6} xs={12} sx={{ mb: '20px' }}>
              <Stack>
                {['SHOPIFY', '685 Market Street', 'San Francisc, CA 94105', 'United States'].map((text, index) => (
                  <Typography 
                    variant="h6"
                    key={index}
                  >
                    {text}
                  </Typography>
                ))}
              </Stack>
            </Grid>
            <Grid item lg={2} md={4} sm={6} xs={12} sx={{ mb: '20px' }}>
              <Stack>
                {['Company', 'About', 'All Products', 'Location', 'FAQ', 'Contact Us'].map((text, index) => (
                  <Typography 
                    variant="h6"
                    key={index}
                  >
                    {text}
                  </Typography>
                ))}
              </Stack>
            </Grid>
            <Grid item lg={2} md={4} sm={6} xs={12} sx={{ mb: '20px' }}>
              <Stack>
                {['Delivery & Collection', 'How to Return', 'Return Policy', 'Refunds', 'Delivery FAQs', 'Site Map'].map((text, index) => (
                  <Typography 
                    variant="h6"
                    key={index}
                  >
                    {text}
                  </Typography>
                ))}
              </Stack>
            </Grid>
            <Grid item lg={2} md={6} sm={6} xs={12} sx={{ mb: '20px' }}>
              <Stack>
                {['Help', 'Security', 'Privacy', 'Accessibility', 'Terms & Conditions', 'Size Guild'].map((text, index) => (
                  <Typography 
                    variant="h6"
                    key={index}
                  >
                    {text}
                  </Typography>
                ))}
              </Stack>
            </Grid>
            <Grid item lg={3} md={6} xs={12}>
              <Stack>
                <Typography variant="h6">
                  Newsletter
                </Typography>
                <Typography variant="h6">
                  Subcribe to our weekly Newsletter and receive updates via email.
                </Typography>
                <Stack direction="row">
                  <TextField
                    id="standard-name"
                    placeholder="Your email..."
                  />
                  <Button
                    variant="contained"
                    disableElevation
                  >
                    Subcribe
                  </Button>
                </Stack>
                <Typography variant="h6">
                  We Accept
                </Typography>
                <Stack>
                  <Card elevation={0}>
                    <CardMedia
                      component="img"
                      image="https://ucarecdn.com/a20788be-d669-4291-b0d1-60d84badc7ea/visa.webp"
                      alt="unsplash img"
                    />
                  </Card>
                  <Card elevation={0}>
                    <CardMedia
                      component="img"
                      image="https://ucarecdn.com/e353427e-e9bb-4670-b286-737a44474a0c/paypal.webp"
                      alt="unsplash img"
                    />
                  </Card>
                  <Card elevation={0}>
                    <CardMedia
                      component="img"
                      image="https://ucarecdn.com/9067f572-e217-41f7-b0e5-17b38eb0c815/momo.png"
                      alt="unsplash img"
                    />
                  </Card>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Typography
          variant="h6"
          component="div"
        >
          &copy; 2022 - E-commerce by Kryptonyte
        </Typography>
      </Box>
    </React.Fragment>
  );
};