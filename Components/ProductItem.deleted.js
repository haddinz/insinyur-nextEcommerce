import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import NextLink from "next/link";
import { Rating } from "@mui/material/Rating";
import useStyles from "../Utils/Style";

export default function ProductItem({ product, addToCartHandler }) {
    const clasess = useStyles()
    
  return (
    <Card className={clasess.card}>
      <NextLink href={`/product/${product.slug}`} passHref>
        <CardActionArea>
          <CardMedia
            component="img"
            image={product.image}
            title={product.name}
          ></CardMedia>
          <CardContent>
            <Typography>{product.name}</Typography>
            <Rating value={product.rating} readOnly></Rating>
          </CardContent>
        </CardActionArea>
      </NextLink>
      <CardActions>
        <Typography>${product.price}</Typography>
        <Button
          size="small"
          color="primary"
          onClick={() => addToCartHandler(product)}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}