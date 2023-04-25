import '../../styles/NewProduct.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/system/Unstable_Grid/Grid';
import { useNavigate } from 'react-router-dom';

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
export default function NewProduct() {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [sale, setSale] = useState('');
  const [color1, setColor1] = useState('');
  const [color2, setColor2] = useState('');
  const [color3, setColor3] = useState('');
  const [img1, setImg1] = useState('');
  const [img2, setImg2] = useState('');
  const [img3, setImg3] = useState('');
  const [img4, setImg4] = useState('');
  const [material, setMaterial] = useState('');
  const [description, setDescription] = useState('');

  const handleColor1 = (color1) => {
    setColor1(color1);
  };
  const handleColor2 = (color2) => {
    setColor2(color2);
  };
  const handleColor3 = (color3) => {
    setColor3(color3);
  };
  const handleCategory = (event) => {
    setCategory(event.target.value);
  };
  const [sizes, setSizes] = useState(() => []);

  const handleSize = (event, newSizes) => {
    setSizes(newSizes);
  };

  const handleSubmit = () => {
    axios({
      method: 'post',
      url: 'http://localhost:8080/api/products/add',
      data: {
        CODE: code,
        NAME: name,
        CATEGORY: category,
        PRICE: price,
        SALE: sale,
        MATERIAL: material,
        DESCRIPTION: description,
        IMG: [img1, img2, img3, img4],
        SIZE: sizes,
        COLOR: [color1, color2, color3],
      },
    })
      .then((res) => {
        navigate('../dashboard/products');
      })
      .catch((res) => {
        console.log('hello');
      });
  };

  const [category_list, setCategorylist] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/products/categories')
      .then((result) => {
        console.log(result.data);
        setCategorylist(result.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="newProduct">
      <Paper elevation={3} sx={{ marginRight: '15%', marginLeft: '15%' }}>
        <Box sx={{ padding: 5 }}>
          <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
            New Product
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
                    <InputAdornment position="start">Percent</InputAdornment>
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
                Size
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={4}>
              <ToggleButtonGroup
                value={sizes}
                onChange={handleSize}
                aria-label="text formatting">
                <ToggleButton value={'xs'} aria-label="bold">
                  XS
                </ToggleButton>
                <ToggleButton value={'s'} aria-label="bold">
                  S
                </ToggleButton>
                <ToggleButton value={'m'} aria-label="bold">
                  M
                </ToggleButton>
                <ToggleButton value={'l'} aria-label="bold">
                  L
                </ToggleButton>
                <ToggleButton value={'xl'} aria-label="bold">
                  XL
                </ToggleButton>
                <ToggleButton value={'xxl'} aria-label="bold">
                  XXL
                </ToggleButton>
              </ToggleButtonGroup>
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
            <Grid item xs={12} sm={1}>
              <MuiColorInput value={color1} onChange={handleColor1} />
            </Grid>
            <Grid item xs={12} sm={1}>
              <MuiColorInput value={color2} onChange={handleColor2} />
            </Grid>
            <Grid item xs={12} sm={1}>
              <MuiColorInput value={color3} onChange={handleColor3} />
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
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Category"
                  onChange={handleCategory}>
                  {category_list.map((item) => (
                    <MenuItem value={item.ID}>{item.NAME}</MenuItem>
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
                onClick={handleSubmit}
                fullWidth
                variant="contained"
                sx={{
                  color: '#fff',
                }}>
                Create
              </Button>
            </Grid>
            <Grid item xs={12} sm={5} />
          </Grid>
        </Box>
      </Paper>
    </div>
  );
}
