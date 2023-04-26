import { Link } from 'react-router-dom';
import '../../styles/Product.css';
import Chart from '../../components/chart/Chart';
import '../../styles/NewProduct.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Grid from '@mui/system/Unstable_Grid/Grid';
import {
  Input,
  InputLabel,
  TextField,
  FormControl,
  Select,
  SelectChangeEvent,
  MenuItem,
  Paper,
  Box,
  Typography,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  Button,
} from '@mui/material';
import { MuiColorInput } from 'mui-color-input';
export default function Product() {
  const navigate = useNavigate();
  const path = window.location.pathname.split('/');
  const id = path[3];
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/products/get_detail?id=${id}`)
      .then((result) => {
        setCode(result.data[0]['CODE']);
        setName(result.data[0]['NAME']);
        setPrice(result.data[0]['PRICE']);
        setSale(result.data[0]['SALEOFF']);
        setImg1(result.data[0]['IMG1']);
        setImg2(result.data[0]['IMG2']);
        setImg3(result.data[0]['IMG3']);
        setImg4(result.data[0]['IMG4']);
        setMaterial(result.data[0]['MATERIAL']);
        setDescription(result.data[0]['DESCRIPTION']);
        setCategory(result.data[0]['CATEGORY']);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/products/get_info?id=${id}`)
      .then((result) => {
        setColorList(result.data[0]['COLOR'].split('/'));
        setSizeList(result.data[0]['SIZE'].split(','));
      })
      .catch((error) => console.log(error));
  }, []);

  const [category, setCategory] = useState('');
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [sale, setSale] = useState('');
  const [img1, setImg1] = useState('');
  const [img2, setImg2] = useState('');
  const [img3, setImg3] = useState('');
  const [img4, setImg4] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [quantity, setQuantity] = useState('');
  const [material, setMaterial] = useState('');
  const [description, setDescription] = useState('');
  const [color_list, setColorList] = useState([]);
  const [size_list, setSizeList] = useState([]);

  const handleRestock = () => {
    axios({
      method: 'post',
      url: 'http://localhost:8080/api/products/restock',
      data: {
        CODE: code,
        SIZE: size,
        COLOR: color,
        QUANITY: quantity,
      },
    })
      .then((res) => {
        navigate('../dashboard/products');
      })
      .catch((res) => {
        console.log('hello');
      });
  };
  const handleEdit = () => {
    axios({
      method: 'post',
      url: 'http://localhost:8080/api/products/edit',
      data: {
        CODE: code,
        NAME: name,
        PRICE: price,
        SALE: sale,
        MATERIAL: material,
        DESCRIPTION: description,
        IMG: [img1, img2, img3, img4],
      },
    })
      .then((res) => {
        navigate('../dashboard/products');
      })
      .catch((res) => {
        console.log('hello');
      });
  };
  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleSize = (event) => {
    setSize(event.target.value);
    handleEditQuantity();
  };

  const handleColor = (event) => {
    setColor(event.target.value);
    handleEditQuantity();
  };

  const [isRestock, setIsRestock] = useState(false);
  const handleRestok = () => {
    setIsRestock(!isRestock);
  };

  const handleEditQuantity = async () => {
    console.log(color);
    console.log(size);
    if (color != '' && size != '') {
      await axios
        .get(
          `http://localhost:8080/api/products/get_quanity?id=${id}&&color=${color}&&size=${size}`
        )
        .then((result) => {
          console.log(result.data);
          setQuantity(result.data[0]['QUANITY']);
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <button onClick={handleRestok} className="productAddButton">
          {isRestock ? 'Edit General' : 'Restock'}
        </button>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img
              src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="productInfoImg"
            />
            <span className="productName">Apple Airpods</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">active:</span>
              <span className="productInfoValue">yes</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">no</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        {/* RESTOCK */}
        {isRestock ? (
          <div className="newProduct">
            <Paper elevation={3} sx={{ marginRight: '15%', marginLeft: '15%' }}>
              <Box sx={{ padding: 5 }}>
                <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
                  Restock
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={2}>
                    <InputLabel
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontWeight: 700,
                      }}>
                      Code
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <TextField
                      required
                      id="code"
                      name="code"
                      label="Code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      fullWidth
                      size="small"
                      autoComplete="off"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <InputLabel
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontWeight: 700,
                      }}>
                      Name
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <TextField
                      required
                      id="name"
                      name="name"
                      label="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      fullWidth
                      size="small"
                      autoComplete="off"
                      variant="outlined"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <InputLabel
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontWeight: 700,
                      }}>
                      Size
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="demo-simple-select-label">
                        Size
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={size}
                        label="Size"
                        onChange={handleSize}>
                        {size_list.map((item) => (
                          <MenuItem value={item}>{item}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={2}>
                    <InputLabel
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontWeight: 700,
                      }}>
                      Color
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <FormControl fullWidth size="mall">
                      <InputLabel id="demo-simple-select-label">
                        Color
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={color}
                        label="Color"
                        onChange={handleColor}>
                        {color_list.map((item) => (
                          <MenuItem value={item}>
                            {item}
                            {/* <Button fullWidth sx={{backgroundColor: `${item}`}}></Button> */}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <InputLabel
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontWeight: 700,
                      }}>
                      Quantity
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      id="code"
                      name="quantity"
                      label="Quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      fullWidth
                      size="small"
                      autoComplete="off"
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12} sm={10} />
                  <Grid
                    item
                    xs={12}
                    sm={2}
                    sx={{
                      justifyContent: 'right',
                    }}>
                    <Button
                      onClick={handleRestock}
                      fullWidth
                      variant="contained"
                      sx={{
                        color: '#fff',
                      }}>
                      Apply
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={5} />
                </Grid>
              </Box>
            </Paper>
          </div>
        ) : (
          // EDIT GENERAL
          <div className="newProduct">
            <Paper elevation={3} sx={{ marginRight: '15%', marginLeft: '15%' }}>
              <Box sx={{ padding: 5 }}>
                <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
                  Edit General
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={2}>
                    <InputLabel
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontWeight: 700,
                      }}>
                      Code
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <TextField
                      required
                      id="code"
                      name="code"
                      label="Code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      fullWidth
                      size="small"
                      autoComplete="off"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <InputLabel
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontWeight: 700,
                      }}>
                      Name
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <TextField
                      required
                      id="name"
                      name="name"
                      label="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      fullWidth
                      size="small"
                      autoComplete="off"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <InputLabel
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontWeight: 700,
                      }}>
                      Price
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      id="price"
                      name="price"
                      label="Price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      fullWidth
                      size="small"
                      autoComplete="off"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">VND</InputAdornment>
                        ),
                      }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <InputLabel
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontWeight: 700,
                      }}>
                      Sale off
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      id="sale"
                      name="sale"
                      label="Sale"
                      fullWidth
                      value={sale}
                      onChange={(e) => setSale(e.target.value)}
                      size="small"
                      autoComplete="off"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            Percent
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <InputLabel
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontWeight: 700,
                      }}>
                      Material
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      id="material"
                      name="material"
                      label="Material"
                      fullWidth
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                      size="small"
                      autoComplete="off"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <InputLabel
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontWeight: 700,
                      }}>
                      Category
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      disabled
                      id="category"
                      name="category"
                      label="Category"
                      fullWidth
                      value={category}
                      size="small"
                      autoComplete="off"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <InputLabel
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontWeight: 700,
                      }}>
                      Image 1
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <TextField
                      required
                      id="image1"
                      name="image1"
                      label="URL"
                      value={img1}
                      onChange={(e) => setImg1(e.target.value)}
                      fullWidth
                      size="small"
                      autoComplete="off"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <InputLabel
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontWeight: 700,
                      }}>
                      Image 2
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <TextField
                      required
                      id="image2"
                      name="image2"
                      value={img2}
                      onChange={(e) => setImg2(e.target.value)}
                      label="URL"
                      fullWidth
                      size="small"
                      autoComplete="off"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <InputLabel
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontWeight: 700,
                      }}>
                      Image 3
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <TextField
                      required
                      id="image3"
                      name="image3"
                      value={img3}
                      onChange={(e) => setImg3(e.target.value)}
                      label="URL"
                      fullWidth
                      size="small"
                      autoComplete="off"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <InputLabel
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontWeight: 700,
                      }}>
                      Image 4
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <TextField
                      required
                      id="image4"
                      name="image4"
                      value={img4}
                      onChange={(e) => setImg4(e.target.value)}
                      label="URL"
                      fullWidth
                      size="small"
                      autoComplete="off"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <InputLabel
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontWeight: 700,
                      }}>
                      Description
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <TextField
                      id="outlined-multiline-static"
                      label="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      multiline
                      fullWidth
                      rows={4}
                    />
                  </Grid>
                  <Grid item xs={12} sm={10} />
                  <Grid
                    item
                    xs={12}
                    sm={2}
                    sx={{
                      justifyContent: 'right',
                    }}>
                    <Button
                      onClick={handleEdit}
                      fullWidth
                      variant="contained"
                      sx={{
                        color: '#fff',
                      }}>
                      Edit
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={5} />
                </Grid>
              </Box>
            </Paper>
          </div>
        )}
      </div>
    </div>
  );
}
