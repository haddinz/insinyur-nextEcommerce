import React, { useContext, useEffect, useReducer } from "react"
import dynamic from "next/dynamic"
import { Store } from "../Utils/Store"
import { useRouter } from "next/router"
import { Layout } from "../Components/Layout"
import { Button, Card, CircularProgress, Grid, List, ListItem, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core"
import useStyles from "../Utils/Style"
import NextLink from 'next/link'
import { getError } from '../Utils/error';
import axios from "axios"

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' }
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, orders: action.payload, error: '' }
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        default:
            state
    }
}

function OrderHistory() {
    const { state } = useContext(Store)
    const { userInfo } = state
    const router = useRouter()
    const clasess = useStyles()

    const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
        loading: true,
        orders: [],
        error: '',
    })

    useEffect(() => {
        if (!userInfo) {
            router.push('/login')
        }
        const fetchOrders = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' })
                const { data } = await axios.get(`/api/orders/history`, {
                    headers: { authorization: `Bearer ${userInfo.token}` }
                })
                dispatch({ type: 'FETCH_SUCCESS', payload: data })
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
            }
        }
        fetchOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Layout title='Order History'>
            <Grid container spacing={1}>

                <Grid item md={3} xs={12}>
                    <Card className={clasess.section}>
                        <List>
                            <NextLink href="/profile" passHref>
                                <ListItem button component="a">
                                    <ListItemText primary="User Profile"></ListItemText>
                                </ListItem>
                            </NextLink>
                            <NextLink href="/order-history" passHref>
                                <ListItem selected button component="a">
                                    <ListItemText primary="Order History"></ListItemText>
                                </ListItem>
                            </NextLink>
                        </List>
                    </Card>
                </Grid>

                <Grid item md={9} xs={12}>
                    <Card className={clasess.section}>
                        <List>
                            <ListItem>
                                <Typography component="h1" variant="h1">
                                    Order History 
                                </Typography>
                            </ListItem>
                            <ListItem>
                                {loading ? (
                                    <CircularProgress />
                                ) : error ? (
                                    <Typography className={clasess.error}>
                                        {error}
                                    </Typography>
                                ) : (
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>ID</TableCell>
                                                    <TableCell>DATE</TableCell>
                                                    <TableCell>TOTAL</TableCell>
                                                    <TableCell>PAID</TableCell>
                                                    <TableCell>DELIVERED</TableCell>
                                                    <TableCell>ACTION</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {orders.map((order) => (
                                                    <TableRow key={order.id}>
                                                        <TableCell>{order._id.substring(20, 24)}</TableCell>
                                                        <TableCell>{order.createdAt}</TableCell>
                                                        <TableCell>${order.totalPrice}</TableCell>
                                                        <TableCell>
                                                            {order.isPaid
                                                                ? `paid at ${order.paidAt}`
                                                                : 'not paid'}
                                                        </TableCell>
                                                        <TableCell>
                                                            {order.isDelivered
                                                                ? `delivered at ${order.deliveredAt}`
                                                                : 'not delivered'}
                                                        </TableCell>
                                                        <TableCell>
                                                            <NextLink href={`/order/${order._id}`} passHref>
                                                                <Button variant="contained">Details</Button>
                                                            </NextLink>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                )}
                            </ListItem>
                        </List>
                    </Card>
                </Grid>

            </Grid>
        </Layout>
    )
}

export default dynamic(() => Promise.resolve(OrderHistory), { ssr: false })