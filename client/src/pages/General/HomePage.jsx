import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts().then((data) => setProducts(data));
  }, []);
  const getProducts = async () => {
    return axios
      .get('http://localhost:8080/api/products/all')
      .then((res) => res.data);
  };

  const RenderBestSeller = () => {
    const data = products.map((product, index) => (
      <Card
        elevation={0}
        sx={{ width: '280px', height: '350px', mb: 5 }}
        key={index}>
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
          image={product.IMG1}
          alt="unsplash img"
          sx={{
            width: '100%',
            height: '280px',
            objectFit: 'contain',
            backgroundColor: '#e3e3e3',
          }}
        />
        <CardContent sx={{ pt: 0, pl: 0, pr: 0 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ pt: 1, fontWeight: '600', fontSize: 18 }}>
            {product.NAME}
          </Typography>
          <Stack direction="row" display="flex" justifyContent="space-between">
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
            <Rating
              size="small"
              defaultValue={Math.random() * (5 - 3) + 3}
              sx={{ pt: 0.5 }}></Rating>
          </Stack>
        </CardContent>
      </Card>
    ));
    return data;
  };

  const RenderGrid = () => {
    const brands = [
      {
        id: 1,
        logo: 'https://logos-world.net/wp-content/uploads/2020/11/Giorgio-Armani-Logo.png',
      },
      {
        id: 2,
        logo: 'https://1000logos.net/wp-content/uploads/2017/05/Prada-Logo.png',
      },
      {
        id: 3,
        logo: 'https://1000logos.net/wp-content/uploads/2021/04/Louis-Vuitton-logo.png',
      },
      {
        id: 4,
        logo: 'https://www.freepnglogos.com/uploads/adidas-logo-vector-png-19.png',
      },
      {
        id: 5,
        logo: 'https://brademar.com/wp-content/uploads/2022/09/Coolmate-Logo-PNG-4.png',
      },
      {
        id: 6,
        logo: 'https://www.pngarts.com/files/8/Balenciaga-Logo-Transparent-Image.png',
      },
      {
        id: 7,
        logo: 'https://centimet.vn/wp-content/uploads/thuong-hieu-Gucci.jpg',
      },
      {
        id: 8,
        logo: 'https://r.lvmh-static.com/uploads/2023/02/dior_logo.png',
      },
    ];
    const brandData = brands.map((brand, index) => (
      <Grid item xs={3} key={index}>
        <Card elevation={0}>
          <CardMedia
            component="img"
            image={brand.logo}
            alt="unsplash img"
            sx={{
              width: 280,
              height: '30vh',
              objectFit: 'contain',
              border: '1px solid #f3f4f6',
              backgroundColor: 'white',
            }}
          />
        </Card>
      </Grid>
    ));
    return brandData;
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
              image="https://img.freepik.com/premium-vector/best-season-sale-banner-design-template_2239-1175.jpg?w=2000"
              alt="unsplash img"
              sx={{
                height: '70vh',
                objectFit: 'fill',
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
              image="https://assets.vogue.com/photos/5f5fac8b7d9362f52d645560/16:9/w_1280,c_limit/social-holding.jpg"
              alt="unsplash img"
              sx={{
                height: '40vh',
              }}
            />
          </Card>
          <Card elevation={0} sx={{ width: '49%' }}>
            <CardMedia
              component="img"
              image="https://i.pinimg.com/736x/b8/3f/6c/b83f6c2bb10b0bfe7cf4ab07e3e35b41.jpg"
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
            image="https://raw.githubusercontent.com/anduckhmt146/resource/master/public/342507301_9245703945471694_8487561683018262835_n.png"
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
