import React from 'react';
import {
  Box,
  Link,
  Breadcrumbs,
  Stack,
  Typography,
  CardMedia,
  Button,
  Avatar,
} from '@mui/material';
import './../../styles/AboutUsPage.css';

export const AboutUsPage = () => {
  return (
    <React.Fragment>
      <Box className="about-us_container">
        <Box className="about-us_wrapper">
          <Stack className="about-us_intro" direction="row">
            <Typography>ABOUT US</Typography>
            <Typography>
              Shopify là một nền tảng thương mại điện tử chuyên về cung cấp các
              sản phẩm thời trang, tập trung chủ yếu vào quần áo. Với mục tiêu
              đáp ứng nhu cầu của người tiêu dùng, Shopify không ngừng cập nhật
              các bộ sưu tập mới nhất, luôn bám sát và đưa ra các xu hướng thời
              trang nhanh chóng và hiệu quả. Nhờ vào việc đầu tư nghiêm túc vào
              phát triển nền tảng và quản lý sản phẩm, Shopify đã trở thành một
              trong những website thương mại điện tử hàng đầu trên thế giới và
              thu hút được sự quan tâm của đông đảo khách hàng trên toàn cầu.
            </Typography>
          </Stack>
          <Stack className="about-us_quote">
            <Typography>
              "It's not about brand, <br />
              it's about style" <br />
              ~Ralph Lauren~
            </Typography>
          </Stack>
          <Stack className="about-us_avatar" direction="row" spacing={2}>
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
