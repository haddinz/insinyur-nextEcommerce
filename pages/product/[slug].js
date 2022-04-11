import { Grid, Link, List, ListItem, Typography, Card, Button } from '@material-ui/core'
import NextLink from 'next/link'
import Image from 'next/image'
import React, { useContext } from 'react'
import { Layout } from '../../Components/Layout'
import useStyles from '../../Utils/Style'
import Product from '../../model/Product'
import db from '../../Utils/db'
import axios from 'axios'
import { Store } from '../../Utils/Store'
import { useRouter } from 'next/router'
// import data from '../../Utils/Data'
// import { useRouter } from 'next/router'

export default function ProductScreen(props) {
    const { state, dispatch } = useContext(Store)
    const {product} = props
    const router = useRouter()
    // const router = useRouter()
    // const { slug } = router.query
    // const product = data.products.find((a) => a.slug === slug)
    const clasess = useStyles()
    if (!product) {
        return <div>
            Product Not Found
        </div>
    }

//  no7
    const addToCartHandler = async () => {
        const existItem = state.cart.cartItems.find(x => x._id === product._id)
        const quantity = existItem?  existItem.quantity + 1 : 1
        const { data } = await axios.get(`/api/products/${product._id}`)
        if(data.countInStock < quantity) {
            window.alert('Sorry, This Product is Limited Of Stock')
            quantity > data.countInStock ? existItem.quantity - 1 : 1
        }
        dispatch({ type : 'CART_ADD_ITEMQ', payload:{...product, quantity}})
        router.push('/cart')
    }
//  no7

    return (
        <Layout title={product.name} description={product.description}>
            <NextLink href="/" passHref>
                <Link>
                    <Typography className={clasess.section}>Back To Product </Typography>
                </Link>
            </NextLink>
            <Grid container spacing={1}>
                <Grid item md={6} xs={12}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={'400px'}
                        height={'400px'}
                        layout='responsive'
                    >
                    </Image>
                </Grid>
                <Grid item md={3} xs={12}>
                    <List>
                        <ListItem><Typography component="h1" variant='h1'>{product.name}</Typography></ListItem>
                        <ListItem><Typography>Rating: {product.rating} stars ({product.numReviews} reviews)</Typography></ListItem>
                        <ListItem><Typography>Description: {product.description}</Typography></ListItem>
                    </List>
                </Grid>
                <Grid item md={3} xs={12}>
                    <Card>
                        <List>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>Price</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>${product.price}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>Status</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>{product.countInStock > 0? `In Stock` : `Unavailable`}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Button fullWidth variant="contained" color="primary" onClick={addToCartHandler}>
                                    Add To Cart
                                </Button>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
            </Grid>
        </Layout>
    )
}


export async function getServerSideProps(context) {
    const {params} = context
    const {slug} = params

    await db.connect()
    const product = await Product.findOne({slug}).lean()
    await db.disconnect()
    return {
      props: {
        product : db.convertDocToObj(product)
      },
    }
  }