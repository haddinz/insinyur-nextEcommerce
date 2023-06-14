/* eslint-disable @next/next/no-img-element */
import { Grid, Link, Typography } from "@material-ui/core";
import { Layout } from "../Components/Layout";
import useStyles from "../Utils/Style";
import db from "../Utils/db";
import Product from "../model/Product";
import { useContext } from "react";
import { useRouter } from "next/router";
import { Store } from "../Utils/Store";
import axios from "axios";
import ProductItem from "../Components/ProductItem";
import Carousel from "react-material-ui-carousel";
import NextLink from 'next/link'

export default function Home(props) {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const classes = useStyles();
  // const { products } = props;
  const { topRatedProductDocs, featuredProductsDocs } = props;
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
    <Layout>
      {/* <div> */}
        {/* <h1>Product</h1> */}
        <Carousel className={classes.mt1} animation='slide'>
          {featuredProductsDocs.map((product) => (
            <NextLink 
              key={product._id}
              href={`/product/${product.slug}`}
              passHref
            >
              <Link>
                <img
                  src={product.featuredImage}
                  alt={product.name}
                  // className={classes.featuredImage}
                ></img>
              </Link>
            </NextLink>
          ))}
        </Carousel>
        <Typography variant="h2">Popular Products</Typography>
        <Grid container spacing={3} className={classes.grid}>
          {/* {products.map((product) => (
            <Grid item md={3} key={product.name}>
              <ProductItem
                product={product}
                addToCartHandler={addToCartHandler}
              />
              <Card className={classes.card}>
                <NextLink href={`/product/${product.slug}`} passHref>
                  <CardActionArea >
                    <CardMedia
                      component='img'
                      image={product.image}
                      title={product.name}>
                    </CardMedia>
                    <CardContent>
                      <Typography>
                        {product.name}
                      </Typography>
                      <Rating value={product.rating} readOnly></Rating>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
                <CardActions>
                  <Typography>${product.price}</Typography>
                  <Button size='small' color="primary" onClick={() => addToCartHandler(product)}>
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))} */}
          {topRatedProductDocs.map((product) => (
            <Grid item md={3} key={product.name}>
              <ProductItem 
                product={product}
                addToCartHandler={addToCartHandler}
              />
            </Grid>
          ))}
        </Grid>
      {/* </div> */}
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  // const products = await Product.find({}, "-reviews").lean();
  const featuredProductsDocs = await Product.find(
    { isFeatured: true },
    "-reviews"
  )
    .lean()
    .limit(3);

  const topRatedProductDocs = await Product.find({}, "-reviews")
    .lean()
    .sort({
      rating: -1,
    })
    .limit(6);

  await db.disconnect();
  return {
    props: {
      // products: products.map(db.convertDocToObj),
      featuredProductsDocs: featuredProductsDocs.map(db.convertDocToObj),
      topRatedProductDocs: topRatedProductDocs.map(db.convertDocToObj),
    },
  };
}
