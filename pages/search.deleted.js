import React, { useContext } from "react";
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { Layout } from "../Components/Layout";
import useStyles from "../Utils/Style";
import { useRouter } from "next/router";
import db from "../Utils/db";
import Product from "../model/Product";
import ProductItem from "../Components/ProductItem";
import { Store } from "../Utils/Store";
import axios from "axios";
import { Pagination, Rating } from "@material-ui/lab";

const PAGE_SIZE = 3;

const prices = [
  {
    name: "$1 to $50",
    value: "1-50",
  },
  {
    name: "$51 to $200",
    value: "51-200",
  },
  {
    name: "$201 to $1000",
    value: "201-1000",
  },
];

const ratings = [1, 2, 3, 4, 5];

export default function Search(props) {
  const classes = useStyles();
  const router = useRouter();
  const {
    query = "all",
    category = "all",
    name = "all",
    price = "all",
    rating = "all",
    sort = "featured",
  } = router.query;

  const { products, countProducts, categories, names, pages } = props;
  // console.log('ini ialah isi catagories:',categories)

  const filterSearch = ({
    page,
    category,
    name,
    sort,
    min,
    max,
    seacrhQuery,
    price,
    rating,
  }) => {
    const path = router.pathname;
    const { query } = router;
    if (page) query.page = page;
    if (seacrhQuery) query.seacrhQuery = seacrhQuery;
    if (sort) query.sort = sort;
    if (category) query.category = category;
    if (name) query.name = name;
    if (price) query.price = price;
    if (rating) query.rating = rating;
    if (min) query.min ? query.min : query.min === 0 ? 0 : min;
    if (max) query.max ? query.max : query.max === 0 ? 0 : max;

    router.push({
      pathname: path,
      query: query,
    });
  };

  const categoryHandler = (e) => {
    filterSearch({ category: e.target.value });
  };
  const pageHandler = (e, page) => {
    filterSearch({ page });
  };
  const nameHandler = (e) => {
    filterSearch({ name: e.target.value });
  };
  const sortHanlder = (e) => {
    filterSearch({ sort: e.target.value });
  };
  const priceHandler = (e) => {
    filterSearch({ price: e.target.value });
  };
  const ratingHandler = (e) => {
    filterSearch({ rating: e.target.value });
  };

  const { state, dispatch } = useContext(Store);
  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry, Product Is Out Of Stock");
    }
    dispatch({ type: "CART_ADD_ITEMQ", payload: { ...product, quantity } });
    router.push("/cart");
  };

  return (
    <Layout title="search">
      <Grid className={classes.mt1} container spacing={1}>
        <Grid item md={3}>
          <List>
            <ListItem>
              <Box className={classes.fullWidth}>
                <Typography>Categories</Typography>
                <Select fullWidth value={category} onChange={categoryHandler}>
                  <MenuItem value="all">All</MenuItem>
                  {categories &&
                    categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                </Select>
              </Box>
            </ListItem>

            <ListItem>
              <Box className={classes.fullWidth}>
                <Typography>Brands</Typography>
                <Select fullWidth value={name} onChange={nameHandler}>
                  <MenuItem value="all">All</MenuItem>
                  {names &&
                    names.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                </Select>
              </Box>
            </ListItem>

            <ListItem>
              <Box className={classes.fullWidth}>
                <Typography>Prices</Typography>
                <Select fullWidth value={price} onChange={priceHandler}>
                  <MenuItem value="all">All</MenuItem>
                  {prices &&
                    prices.map((price) => (
                      <MenuItem key={price.value} value={price.value}>
                        {price.name}
                      </MenuItem>
                    ))}
                </Select>
              </Box>
            </ListItem>

            <ListItem>
              <Box className={classes.fullWidth}>
                <Typography>Rating</Typography>
                <Select fullWidth value={rating} onChange={ratingHandler}>
                  <MenuItem value="all">All</MenuItem>
                  {ratings &&
                    ratings.map((rating) => (
                      <MenuItem key={rating} value={rating}>
                        <Rating value={rating} readOnly />
                        <Typography component="span">&amp; Up</Typography>
                      </MenuItem>
                    ))}
                </Select>
              </Box>
            </ListItem>
          </List>
        </Grid>

        <Grid item md={9}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography component="span">
                {products.length === 0 ? "No" : countProducts} Results
                {query !== "all" && query !== " " && " : " + query}
                {category !== "all" && " : " + category}
                {name !== "all" && " : " + name}
                {price !== "all" && " : Price " + price}
                {rating !== "all" && " : Rating " + rating + " & up "}
                {(query !== "all" && query !== "") ||
                category !== "all" ||
                name !== "all" ||
                rating !== "all" ||
                price !== "all" ? (
                  <Button onClick={() => router.push("/search")}>
                    <CancelIcon />
                  </Button>
                ) : null}
              </Typography>
            </Grid>

            <Grid item>
              <Typography component="span" className={classes.sort}>
                Sort By
              </Typography>
              <Select value={sort} onChange={sortHanlder}>
                <MenuItem value="featured">Featured</MenuItem>
                <MenuItem value="lowes">Price: Low to High</MenuItem>
                <MenuItem value="highest">Price: High to Low</MenuItem>
                <MenuItem value="toprated">Costumer Reviews</MenuItem>
                <MenuItem value="newest">Newest Arrivals</MenuItem>
              </Select>
            </Grid>
          </Grid>

          <Grid className={classes.mt1} container spacing={3}>
            {products.map((product) => (
              <Grid item md={4} key={product.name}>
                <ProductItem
                  product={product}
                  addToCartHandler={addToCartHandler}
                />
              </Grid>
            ))}
          </Grid>
          
          <Pagination 
            className={classes.mt1}
            defaultChecked={parseInt(query.page || '1')}
            count={pages}
            onChange={pageHandler}
          ></Pagination>

        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  await db.connect();
  const pageSize = query.pageSize || PAGE_SIZE;
  const page = query.page || 1;
  const category = query.category || "";
  const name = query.name || "";
  const price = query.price || "";
  const rating = query.rating || "";
  const sort = query.sort || "";
  const searchQuery = query.query || "";

  const queryFilter =
    searchQuery && searchQuery !== "all"
      ? {
          name: {
            $regex: searchQuery,
            $options: "i",
          },
        }
      : {};

  const categoryFilter = category && category !== "all" ? { category } : {};
  const nameFilter = name && name !== "all" ? { name } : {};
  const ratingFilter =
    rating && rating !== "all"
      ? {
          rating: {
            $gte: Number(rating),
          },
        }
      : {};

  //10-50
  const priceFilter =
    price && price !== "all"
      ? {
          price: {
            $gte: Number(price.split("-")[0]),
            $lte: Number(price.split("-")[1]),
          },
        }
      : {};

  const order =
    sort === "featured"
      ? { featured: -1 }
      : sort === "lowest"
      ? { price: 1 }
      : sort === "highest"
      ? { price: -1 }
      : sort === "toprated"
      ? { rating: -1 }
      : sort === "newest"
      ? { createdAt: -1 }
      : { _id: -1 };

  const categories = await Product.find().distinct("category");
  const names = await Product.find().distinct("name");
  const productDocs = await Product.find(
    {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...nameFilter,
      ...ratingFilter,
    },
    "-reviews"
  )
    .sort(order)
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean();

  const countProducts = await Product.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...nameFilter,
    ...ratingFilter,
  });
  await db.disconnect();

  const products = productDocs.map(db.convertDocToObj);

  return {
    props: {
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
      categories,
      names,
    },
  };
}
 