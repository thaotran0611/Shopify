import React from 'react';
import { useState } from 'react';
import {
  Box,
  Stack,
  Breadcrumbs,
  Link,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
  Slider,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  RadioGroup,
  Radio,
  Autocomplete,
  TextField,
  InputAdornment,
  Card,
  CardMedia,
  CardContent,
  Rating,
  Pagination,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../../styles/ProductPage.css';

const marks = [
  {
    value: 0,
    label: '5$',
  },
  {
    value: 100,
    label: '499$',
  },
];

export const ProductPage = () => {
  const [price, setPrice] = useState(300);
  const [size, setSize] = useState('S');
  const navigate = useNavigate();
  const handleSize = (e) => {
    setSize(e.target.value);
  };

  function handlePrice(value) {
    if (value === 0) {
      setPrice(5);
      return;
    }
    if (value === 100) {
      setPrice(499);
      return;
    }
    setPrice(value * 4);
  }

  function handleColor(value) {
    if (value === 'Blue') return 'secondary';
    if (value === 'White') return '#D3D3D3';
    if (value === 'Pink') return '#f59c96';
    if (value === 'Green') return '#09a35b';
    if (value === 'Red') return '#ce1211';
    return '#000';
  }

  const RenderProduct = () => {
    let list = [];
    for (let i = 0; i < 20; i++) {
      list.push(
        <Card className="product_item" elevation={0} key={i}>
          <Box>
            <Typography>New</Typography>
            <Typography>-20%</Typography>
          </Box>
          <CardMedia
            component="img"
            image="https://picsum.photos/1900/800"
            alt="unsplash img"
            onClick={() => navigate('/product/detail')}
          />
          <CardContent>
            <Typography variant="h6" component="div">
              Luiz Vitton Lace Suit
            </Typography>
            <Stack>
              <Typography variant="h6" component="div">
                $180.00
              </Typography>
              <Typography variant="h6" component="div">
                $210.90
              </Typography>
              <Rating size="small"></Rating>
            </Stack>
          </CardContent>
        </Card>
      );
    }
    return list;
  };

  return (
    <React.Fragment>
      <Box className="product_container">
        <Box className="product_wrapper">
          <Stack className="product_breadcrumbs">
            <Breadcrumbs aria-label="breadcrumbs" separator=">">
              <Link href="#">Home</Link>
              <Link href="#">Shop All</Link>
              <Link href="#">Shop All</Link>
            </Breadcrumbs>
          </Stack>
          <Box className="product_content">
            <Stack className="product_sidebar">
              <Accordion elevation={0} defaultExpanded={true}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Categories</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {['Tops(64)', 'Dresses(54)', 'T-shirts(29)', 'Jeans(18)'].map(
                    (text, index) => (
                      <FormControlLabel
                        key={text}
                        label={text}
                        control={<Checkbox />}
                      />
                    )
                  )}
                </AccordionDetails>
              </Accordion>
              <Divider />
              <Accordion elevation={0} defaultExpanded={true}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Brand</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {['URBANIC', 'BoStreet', 'Tokyo', 'Vero', 'H&M'].map(
                    (text) => (
                      <FormControlLabel
                        key={text}
                        label={text}
                        control={<Checkbox />}
                      />
                    )
                  )}
                </AccordionDetails>
              </Accordion>
              <Divider />
              <Accordion elevation={0} defaultExpanded={true}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Size</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ToggleButtonGroup
                    value={size}
                    exclusive
                    onChange={handleSize}
                    aria-label="size">
                    {['S', 'M', 'L', 'XL', 'XXL'].map((text) => (
                      <ToggleButton
                        value={text}
                        aria-label={text}
                        disableRipple>
                        {text}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </AccordionDetails>
              </Accordion>
              <Divider />
              <Accordion elevation={0} defaultExpanded={true}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Color</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="Blue"
                    name="radio-buttons-group">
                    {['Blue', 'Black', 'White', 'Pink', 'Green', 'Red'].map(
                      (text) => (
                        <FormControlLabel
                          value={text}
                          control={<Radio />}
                          label={text}
                          sx={{
                            '& .Mui-checked': {
                              color: handleColor(text),
                            },
                          }}
                        />
                      )
                    )}
                  </RadioGroup>
                </AccordionDetails>
              </Accordion>
              <Divider />
              <Accordion elevation={0} defaultExpanded={true}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Price</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>$5 - ${price}</Typography>
                  <Slider
                    aria-label="Always visible"
                    step={1}
                    marks={marks}
                    valueLabelDisplay="on"
                    defaultValue={75}
                    disableSwap
                    onChange={(e) => handlePrice(e.target.value)}
                  />
                </AccordionDetails>
              </Accordion>
            </Stack>
            <Box className="product_display" component="main">
              <Stack>
                <Typography>Showing 1-16 of 96 products</Typography>
                <Autocomplete
                  options={top100Films.map((option) => option.title)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      defaultValue={[top100Films[0]]}
                      placeholder="Sort options"
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <>
                            <InputAdornment position="start">
                              <Typography>Sort by:</Typography>
                            </InputAdornment>
                            {params.InputProps.startAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              </Stack>
              <Box>
                <RenderProduct />
              </Box>
              <Stack spacing={2}>
                <Pagination count={10} shape="rounded" />
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
];
