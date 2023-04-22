import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Stack,
  CardMedia,
  Typography,
  Rating,
  Grid,
  Button,
} from '@mui/material';

export const HomePage = ({ setLoggedIn }) => {
  setLoggedIn(true);
  const RenderBestSeller = () => {
    let list = [];
    for (let i = 0; i < 5; i++) {
      list.push(
        <Card elevation={0} sx={{ width: '280px', height: '350px' }} key={i}>
          <Box sx={{ position: 'absolute', ml: 0.5, mt: 0.5 }}>
            <Typography
              sx={{
                color: '#fff',
                backgroundColor: '#000',
                mb: 1,
                textAlign: 'center',
                fontSize: 15,
                px: 1,
              }}>
              New
            </Typography>
            <Typography
              sx={{
                backgroundColor: '#f33e5d',
                color: '#fff',
                textAlign: 'center',
                fontSize: 15,
              }}>
              -20%
            </Typography>
          </Box>
          <CardMedia
            component="img"
            image="https://source.unsplash.com/random"
            alt="unsplash img"
            sx={{ width: '100%', height: '280px' }}
          />
          <CardContent sx={{ pt: 0, pl: 0, pr: 0 }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ pt: 1, fontWeight: '600', fontSize: 18 }}>
              Luiz Vitton Lace Suit
            </Typography>
            <Stack
              direction="row"
              display="flex"
              justifyContent="space-between">
              <Typography
                variant="h6"
                component="div"
                sx={{ fontSize: 18, fontWeight: '600' }}>
                $180.00
              </Typography>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  textDecoration: 'line-through',
                  color: '#f5647d',
                  fontSize: 16,
                  lineHeight: '1.8',
                  verticalAlign: 'middle',
                  pt: 0.1,
                  ml: -4,
                }}>
                $210.90
              </Typography>
              <Rating size="small" sx={{ pt: 0.5 }}></Rating>
            </Stack>
          </CardContent>
        </Card>
      );
    }
    return list;
  };

  const RenderGrid = () => {
    let list = [];
    for (let i = 0; i < 8; i++) {
      list.push(
        <Grid item xs={3} key={i}>
          <Card elevation={0}>
            <CardMedia
              component="img"
              image="https://source.unsplash.com/random"
              alt="unsplash img"
              sx={{
                height: '20vh',
                border: '1px solid #f3f4f6',
              }}
            />
          </Card>
        </Grid>
      );
    }
    return list;
  };

  const RenderFollowBtn = () => {
    let list = [];
    var text = 'Facebook';
    for (let i = 0; i < 4; i++) {
      if (i === 1) text = 'Instagram';
      if (i === 2) text = 'Twitter';
      if (i === 3) text = 'Linkedln';

      list.push(
        <Button
          variant="contained"
          disableElevation
          key={i}
          sx={{
            background: 'inherit',
            color: '#000',
            fontWeight: 600,
            fontSize: 30,
            textTransform: 'none',
            '&:hover': {
              color: '#fff',
            },
          }}>
          {text}
        </Button>
      );
    }
    return list;
  };

  return (
    <React.Fragment>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box sx={{ width: '80%', mt: 22 }}>
          <Card elevation={0}>
            <CardMedia
              component="img"
              image="https://source.unsplash.com/random"
              alt="unsplash img"
              sx={{
                height: '70vh',
              }}
            />
          </Card>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 15 }}>
        <Box sx={{ width: '80%' }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ fontSize: 40, fontWeight: 700 }}>
            Best Sellers
          </Typography>
          <Stack
            direction="row"
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            <RenderBestSeller />
          </Stack>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box
          direction="row"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: '80%', mt: 10 }}>
          <Card elevation={0} sx={{ width: '49%' }}>
            <CardMedia
              component="img"
              image="https://source.unsplash.com/random"
              alt="unsplash img"
              sx={{
                height: '40vh',
              }}
            />
          </Card>
          <Card elevation={0} sx={{ width: '49%' }}>
            <CardMedia
              component="img"
              image="https://source.unsplash.com/random"
              alt="unsplash img"
              sx={{
                height: '40vh',
              }}
            />
          </Card>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 15 }}>
        <Box sx={{ width: '80%' }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ fontSize: 40, fontWeight: 700 }}>
            Newly Added
          </Typography>
          <Stack
            direction="row"
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            <RenderBestSeller />
          </Stack>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 15 }}>
        <Box sx={{ width: '80%' }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ fontSize: 40, fontWeight: 700 }}>
            Explore Our Brand
          </Typography>
          <Grid container spacing={2}>
            <RenderGrid />
          </Grid>
        </Box>
      </Box>
      <Box sx={{ width: '100%', mt: 10 }}>
        <Card elevation={0}>
          <CardMedia
            component="img"
            image="https://source.unsplash.com/random"
            alt="unsplash img"
            sx={{
              height: '100vh',
              border: '1px solid #f3f4f6',
            }}
          />
        </Card>
      </Box>
      <Box
        mt={10}
        mb={10}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column">
        <Typography mb={2}>Follow Us</Typography>
        <Stack direction="row">
          <RenderFollowBtn />
        </Stack>
      </Box>
    </React.Fragment>
  );
};
