import {
  Box,
  Grid,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Layout } from "../Components/Layout";
import Product from "../model/Product";
import db from "../Utils/db";
import useStyles from "../Utils/Style";
import { useRouter } from "next/router";

const PAGE_SIZE = 3;

export default function Searchold(props) {
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

  return (
    <Layout title="SearchBro">
      Ok Bro Login
      <Grid className={classes.mt1} container spacing={1}>
        <Grid item md={3}>
          <List>
            <ListItem>
              <Box className={classes.fullWidth}>
                <Typography>Categories</Typography>
                <Select fullWidth value={category} onChange={categoryHandler}>
                  <MenuItem value="all">All</MenuItem>
                  {categories &&
                    categories.map((category) => {
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>;
                    })}
                </Select>
              </Box>
            </ListItem>
          </List> 
        </Grid>

        <Grid item md={9}></Grid>
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
            $gte: Number(price.split('-')[0]),
            $lte: Number(price.split('-')[1]),
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

  const categories = await Product.find().distinct('category')
  const names = await Product.find().distinct('name');
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
