import React from 'react';
import { 
  Box,
  Link,
  Breadcrumbs,
  Stack,
  Typography,
  CardMedia,
  Button,
  Avatar
} from '@mui/material';
import './../../styles/AboutUsPage.css';

export const AboutUsPage = () => {

  return (
    <React.Fragment>
      <Box className="about-us_container">
        <Box className="about-us_wrapper">
          <Stack className='about-us_intro' direction='row'>
            <Typography>
              ABOUT US
            </Typography>
            <Typography>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio fugit mollitia dolor dolore vitae, quibusdam enim ex voluptatum officiis molestias quia nam qui! Dignissimos, quae commodi atque molestias rerum ex. Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, sit libero magni, voluptas sequi eos ullam voluptatem tenetur saepe nulla pariatur quod? Sint facere earum nisi unde repellendus, eligendi quisquam?
            </Typography>
          </Stack>
          <Stack className='about-us_quote'>
            <Typography>
              It's not about brand, <br/>
              it's about style
            </Typography>
          </Stack>
          <Stack className='about-us_avatar' direction='row' spacing={2}>
            <Stack>
              <Avatar sx={{ bgcolor: '#085c25' }}>ĐA</Avatar>
              <Typography>Nguyễn Đức An</Typography>
            </Stack>
            <Stack>
              <Avatar sx={{ bgcolor: '#1f6cfa' }}>AD</Avatar>
              <Typography>Dương Huỳnh Anh Đức</Typography>
            </Stack>
            <Stack>
              <Avatar sx={{ bgcolor: '#fd7e97' }}>TT</Avatar>
              <Typography>Trần Thị Thu Thảo</Typography>
            </Stack>
            <Stack>
              <Avatar sx={{ bgcolor: '#ff5722' }}>PĐ</Avatar>
              <Typography>Lê Phước Đạt</Typography>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </React.Fragment>
  );
};