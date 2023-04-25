import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Box,
  Stack,
  Breadcrumbs,
  Link,
  ButtonBase,
  Typography,
  FormControlLabel,
  ToggleButtonGroup,
  ToggleButton,
  RadioGroup,
  Checkbox,
  Radio,
  TextField,
  Card,
  CardMedia,
  CardContent,
  Rating,
  Button,
  ButtonGroup,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import '../../styles/ProductDetailPage.css';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';
export const ProductDetailPage = () => {
  const params = new URLSearchParams(document.location.search);
  const code = params.get('code');
  const [products, setProducts] = useState('');
  const [items, setItems] = useState('');
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  useEffect(() => {
    getItems().then((data) => setItems(data));
  }, []);
  const getItems = async () => {
    return axios
      .get('http://localhost:8080/api/products/all')
      .then((res) => res.data);
  };
  const getProducts = async () => {
    return axios
      .get(`http://localhost:8080/api/products/detail?code=${code}`)
      .then((res) => res.data);
  };
  const getData = async () => {
    return await getProducts().then((res) => {
      setProducts(res);
      setMainImg(res[0].IMG1);
      setColor(res[0].COLOR.split(','));
      setColorSelected(res[0].COLOR.split(',')[0][0]);
      setSize(res[0].SIZE.split(','));
    });
  };
  useEffect(() => {
    getData();
  }, [code]);

  const [mainImg, setMainImg] = useState('');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState(1);
  const [colors, setColor] = useState(['red']);
  const [colorSelected, setColorSelected] = useState('');
  const handleQuantity = (val) => {
    let tmp = quantity;

    if (val === 0) tmp++;
    else tmp--;

    if (tmp >= 1) setQuantity(tmp);
    else setQuantity(1);
  };
  const handleClickAdd = () => {
    let isCustomer = '';
    let customerID = '';
    if (sessionStorage.getItem('user')) {
      isCustomer = JSON.parse(sessionStorage.getItem('user')).name;
      customerID = JSON.parse(sessionStorage.getItem('user')).id;
    } else {
      setOpen(true);
      return;
    }
    axios({
      method: 'post',
      url: 'http://localhost:8080/api/cart/add',
      data: {
        CustomerID: customerID,
        CODE: code,
        COLOR: colorSelected,
        SIZE: size,
        NUM: quantity,
      },
    })
      .then((res) => {
        console.log('Success');
      })
      .catch((res) => {
        console.log('Error');
        console.log(res);
      });
    console.log(customerID, code, colorSelected, size, quantity);
  };
  const handleClickBuy = () => {
    let isCustomer = JSON.parse(sessionStorage.getItem('user')) != null;
    if (isCustomer == false) {
      setOpen(true);
    } else {
      navigate('/cart');
    }
  };
  const RenderImage = () => {
    let img;
    if (products.length == 0) {
      return <div></div>;
    } else {
      img = [products[0].IMG1, products[0].IMG2, products[0].IMG3];
    }
    let list = [];
    for (let i = 0; i < 3; i++) {
      list.push(
        <ButtonBase
          disableRipple
          key={i}
          value={i}
          onClick={(event) => setMainImg(event.target.currentSrc)}>
          <CardMedia
            component="img"
            image={img[i]}
            alt="unsplash img"
            sx={{ objectFit: 'contain', backgroundColor: '#e3e3e3' }}
          />
        </ButtonBase>
      );
    }
    return list;
  };

  const RenderBestSeller = () => {
    if (items.length == 0) {
      return <div></div>;
    }
    const data = items.map((item, index) => (
      <Card
        className="product-detail_recommend-image"
        elevation={0}
        key={index}>
        <Box className="product-detail_img-detail">
          <Typography>New</Typography>
          <Typography>-20%</Typography>
        </Box>
        <CardMedia
          component="img"
          image={item.IMG1}
          alt="unsplash img"
          onClick={() => navigate(`/product/detail?code=${item.CODE}`)}
          sx={{ objectFit: 'contain', backgroundColor: '#e3e3e3' }}
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {item.NAME}
          </Typography>
          <Stack direction="row" display="flex" justifyContent="space-between">
            <Typography variant="h6" component="div">
              ${item.PRICE}
            </Typography>
            <Typography variant="h6" component="div">
              ${item.PRICE * 1.2}
            </Typography>
            <Rating size="small"></Rating>
          </Stack>
        </CardContent>
      </Card>
    ));
    return data;
  };

  const RenderSellerComment = () => {
    return (
      <Stack className="seller_comment">
        <Stack>
          <Typography>Seller</Typography>
          <Typography>6 days ago</Typography>
        </Stack>
        <Typography className="product_comment">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate
          aliquid dolor iusto ullam qui ipsa ducimus neque, nobis eos hic amet
          labore eligendi error voluptatibus quidem tempore odit temporibus
          harum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
          optio, natus aliquid minima blanditiis officia magnam omnis nihil ea
          quibusdam accusamus placeat distinctio reiciendis ex necessitatibus
          molestias fuga mollitia eos!
        </Typography>
      </Stack>
    );
  };

  const RenderAllComment = () => {
    let list = [];
    for (let i = 0; i < 5; i++) {
      list.push(
        <Stack
          className={
            'product-detail_comment-element ' +
            (i === 4 && 'remove-border-bottom')
          }>
          <Stack>
            <Typography>John Deo</Typography>
            <Typography>6 days ago</Typography>
          </Stack>
          <Typography className="product_comment">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate
            aliquid dolor iusto ullam qui ipsa ducimus neque, nobis eos hic amet
            labore eligendi error voluptatibus quidem tempore odit temporibus
            harum!
          </Typography>
          {i % 2 === 0 && <RenderSellerComment />}
        </Stack>
      );
    }
    return list;
  };

  const RenderQuestion = () => {
    return (
      <Stack className="product-detail_comment-content">
        <Stack direction="row">
          <TextField id="standard-name" placeholder="Ask seller a question" />
          <Button variant="contained" disableElevation>
            Ask Question
          </Button>
        </Stack>
        <RenderAllComment />
        <Button variant="contained" disableElevation>
          Load More Question
        </Button>
      </Stack>
    );
  };

  const RenderRating = () => {
    return (
      <Stack className="product-detail_comment-content">
        <Stack className="product-detail_comment-content-description">
          <Typography>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum
            cumque dolores harum temporibus accusantium est, quisquam, molestiae
            exercitationem non nam sapiente laboriosam nemo repudiandae?
            Recusandae cupiditate unde suscipit exercitationem possimus.
          </Typography>
          <Typography>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum
            cumque dolores harum temporibus accusantium est, quisquam, molestiae
            exercitationem non nam sapiente laboriosam nemo repudiandae?
            Recusandae cupiditate unde suscipit exercitationem possimus.
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
            doloribus distinctio optio.
          </Typography>
          <List>
            {[1, 2, 3].map((value) => (
              <ListItem key={value} disableGutters>
                <ListItemIcon>
                  <CircleIcon />
                </ListItemIcon>
                <ListItemText primary={`Line item ${value}`} />
              </ListItem>
            ))}
          </List>
          <Typography>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum
            cumque dolores harum temporibus accusantium est, quisquam, molestiae
            exercitationem non nam sapiente laboriosam nemo repudiandae?
            Recusandae cupiditate unde suscipit exercitationem possimus. Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Natus iste iusto
            facilis assumenda asperiores ducimus ea officia. Eius, temporibus
            dicta esse libero accusantium error nam itaque eos, quam enim
            maxime! Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem aliquid eaque molestiae eius ducimus totam incidunt
            illum commodi ea. Itaque cupiditate tempora aspernatur
            exercitationem hic corrupti quibusdam aperiam facilis assumenda.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            ratione laborum nulla nostrum, itaque cum architecto nemo saepe
            obcaecati vel quae aliquid facere ducimus quod temporibus ut magni
            ullam dignissimos!
          </Typography>
          <Typography>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum
            cumque dolores harum temporibus accusantium est, quisquam, molestiae
            exercitationem non nam sapiente laboriosam nemo repudiandae?
            Recusandae cupiditate unde suscipit exercitationem possimus. Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Natus iste iusto
            facilis assumenda asperiores ducimus ea officia. Eius, temporibus
            dicta esse libero accusantium error nam itaque eos, quam enim
            maxime! Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem aliquid eaque molestiae eius ducimus totam incidunt
            illum commodi ea. Itaque cupiditate tempora aspernatur
            exercitationem hic corrupti quibusdam aperiam facilis assumenda.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            ratione laborum nulla nostrum, itaque cum architecto nemo saepe
            obcaecati vel quae aliquid facere ducimus quod temporibus ut magni
            ullam dignissimos!
          </Typography>
        </Stack>
      </Stack>
    );
  };

  const RenderDescription = () => {
    if (products.length == 0) {
      return <div></div>;
    }
    return (
      <Stack className="product-detail_comment-content">
        <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
          {products[0].DESCRIPTION}
        </Typography>
      </Stack>
    );
  };
  const navigate = useNavigate();
  return (
    <React.Fragment>
      {products && (
        <Box className="product-detail_container">
          <Box className="product-detail_wrapper">
            <Stack className="product-detail_breadcrumbs">
              <Breadcrumbs aria-label="breadcrumbs" separator=">">
                <Link href="#">Home</Link>
                <Link href="#">Shop All</Link>
                <Link href="#">Shop All</Link>
              </Breadcrumbs>
            </Stack>
            <Box className="product-detail_content">
              <Stack className="product-detail_content-side">
                <RenderImage />
              </Stack>
              <Box className="product-detail_main">
                <Stack className="product-detail_main-img">
                  <CardMedia
                    component="img"
                    image={mainImg}
                    alt="unsplash img"
                  />
                </Stack>
                <Stack className="product-detail_main-detail">
                  <Typography variant="h6" component="div">
                    {products[0].NAME}
                  </Typography>
                  <Stack direction="row">
                    <Rating
                      size="small"
                      value={Math.random() * (5 - 3) + 3}></Rating>
                    <Typography variant="h6" component="div">
                      (12)
                    </Typography>
                  </Stack>
                  <Stack direction="row">
                    <Typography variant="h6" component="div">
                      ${products[0].PRICE}
                    </Typography>
                    <Typography variant="h6" component="div">
                      ${products[0].PRICE * 1.2}
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography variant="h6" component="div">
                      Color:
                    </Typography>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      value={colorSelected}
                      name="radio-buttons-group"
                      row>
                      {colors.map((color) => (
                        <FormControlLabel
                          value={color}
                          control={<Radio />}
                          onChange={(e) => {
                            setColorSelected(e.target.value);
                          }}
                          sx={{
                            '& .Mui-checked': {
                              color: colorSelected,
                            },
                          }}
                        />
                      ))}
                    </RadioGroup>
                  </Stack>
                  <Stack>
                    <Typography variant="h6" component="div">
                      Size:
                    </Typography>
                    <ToggleButtonGroup
                      value={size}
                      exclusive
                      onChange={(e) => setSize(e.target.value)}
                      aria-label="size">
                      {products[0].SIZE.split(',').map((text) => (
                        <ToggleButton
                          key={text}
                          value={text}
                          aria-label={text}
                          disableRipple>
                          {text}
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                  </Stack>
                  <Stack>
                    <Typography variant="h6" component="div">
                      Quantity:
                    </Typography>
                    <ButtonGroup
                      disableElevation
                      variant="contained"
                      aria-label="Disabled elevation buttons">
                      <Button
                        disableRipple
                        endIcon={<RemoveIcon />}
                        onClick={() => handleQuantity(1)}></Button>
                      <Button
                        disableRipple
                        sx={{
                          fontSize: '16px',
                        }}>
                        {quantity}
                      </Button>
                      <Button
                        disableRipple
                        startIcon={<AddIcon />}
                        onClick={() => handleQuantity(0)}></Button>
                    </ButtonGroup>
                  </Stack>
                  <Stack direction="row">
                    <Button onClick={() => handleClickAdd()}>
                      Add to Cart
                    </Button>
                    <Button onClick={() => handleClickBuy()}>Buy Now</Button>
                    <IconButton aria-label="delete">
                      <FavoriteIcon />
                    </IconButton>
                  </Stack>
                  <Stack direction="column">
                    <Box>
                      <Typography variant="h6" component="div">
                        Product Code: &nbsp;
                      </Typography>
                      <Typography variant="h6" component="div">
                        #20344690
                      </Typography>
                    </Box>
                    <Box>
                      <LocalShippingOutlinedIcon />
                      &nbsp;
                      <Typography variant="h6" component="div">
                        FREE delivery Friday, 14 October on first order.
                        <Typography variant="h6" component="span">
                          Details
                        </Typography>
                      </Typography>
                    </Box>
                    <Box>
                      <UpdateOutlinedIcon />
                      &nbsp;
                      <Typography variant="h6" component="div">
                        Delivers in: 3-7 Working Days. &nbsp;
                      </Typography>
                      <Typography variant="h6" component="div">
                        Learn More
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </Box>
          <Box className="product-detail_comment">
            <Stack className="product-detail_comment-header" direction="row">
              <Button
                className={tab === 0 && 'border_bottom'}
                onClick={() => setTab(0)}
                disableRipple>
                Product Description
              </Button>
              <Button
                className={tab === 1 && 'border_bottom'}
                onClick={() => setTab(1)}
                disableRipple>
                Rating & Reviews
              </Button>
              <Button
                className={tab === 2 && 'border_bottom'}
                onClick={() => setTab(2)}
                disableRipple>
                Questions
              </Button>
            </Stack>
            {tab === 0 && <RenderDescription />}
            {tab === 1 && <RenderRating />}
            {tab === 2 && <RenderQuestion />}
            <Stack className="product-detail_recommend">
              <Typography gutterBottom variant="h6" component="div">
                Silimar Items You Might Like
              </Typography>
              <Stack>
                <RenderBestSeller />
              </Stack>
            </Stack>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
              <Alert
                onClose={handleClose}
                severity="warning"
                sx={{ width: '100%' }}>
                Please Login!!!
              </Alert>
            </Snackbar>
          </Box>
        </Box>
      )}
    </React.Fragment>
  );
};
