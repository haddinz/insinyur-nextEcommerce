import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@material-ui/core'
import { Layout } from '../Components/Layout'
import useStyles from '../Utils/Style'
import NextLink from 'next/link'
import db from '../Utils/db'
import Product from '../model/Product'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import { Store } from '../Utils/Store'
import  axios  from 'axios'

export default function Home(props) {
  const { state, dispatch } = useContext(Store)
  const router = useRouter()
  const clasess = useStyles()
  const { products } = props
  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find(x => x._id === product._id)
    const quantity = existItem? existItem.quantity + 1 : 1
    const { data } = await axios.get(`/api/products/${product._id}`)
    if(data.countInStock < quantity) {
      window.alert('Sorry, Product Is Out Of Stock')
  }
    dispatch({ type: 'CART_ADD_ITEMQ', payload: { ...product, quantity } })
    router.push('/cart')
  }
  return (
    <Layout>
      <div>
        <h1>Product</h1>
        <Grid container spacing={3} className={clasess.grid}>
          {products.map((product) => (
            <Grid item md={3} key={product.name}>
              <Card className={clasess.card}>
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
          ))}
        </Grid>
      </div>
    </Layout>
  )
}


export async function getServerSideProps() {
  await db.connect()
  const products = await Product.find({}).lean()
  await db.disconnect()
  return {
    props: {
      products: products.map(db.convertDocToObj)
    },
  }
}