import { Button, FormControl, FormControlLabel, List, ListItem, Radio, RadioGroup, Typography } from '@material-ui/core'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React, { useContext, useState, useEffect } from 'react'
import CheckoutWizard from '../Components/CheckoutWizard'
import { Layout } from '../Components/Layout'
import { Store } from '../Utils/Store'
import useStyles from '../Utils/Style'

export default function Payment() {
    const { enqueueSnackbar, closeSnackbar} = useSnackbar()
    const clasess = useStyles()
    const [paymentMethod, setPaymentMethod] = useState('')
    const router = useRouter()
    const { state, dispatch } = useContext(Store)
    const { cart: {
        shippingAddress
    },} = state
    useEffect(() => {
        if (!shippingAddress.address) {
            router.push('/shipping')
        } else {
            setPaymentMethod(Cookies.get('paymentMethod') || '')
        }
    }, [])
    const submitHandler = (e) => {
        closeSnackbar()
        e.preventDefault()
        if(!paymentMethod){
            enqueueSnackbar('Payment Method is Required', {variant: 'error'})
        } else {
            dispatch({type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod})
            // Cookies.set('paymentMethod', JSON.stringify(paymentMethod))
            Cookies.set('paymentMethod', paymentMethod)
            router.push('/placeorder')
        }
    }

    return (
        <Layout title='Payment Method'>
            <CheckoutWizard activeStep={2} />
            <form className={clasess.form} onSubmit={submitHandler}>
                <Typography>
                    Payment Method
                </Typography>
                <List>

                    <ListItem>
                        <FormControl component='fieldset'>
                            <RadioGroup
                                aria-label='Payment Method'
                                name='paymentMethod'
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            >
                                <FormControlLabel
                                    label='Paypal'
                                    value='Paypal'
                                    control={<Radio />}
                                ></FormControlLabel>

                                <FormControlLabel
                                    label='Stripe'
                                    value='Stripe'
                                    control={<Radio />}
                                ></FormControlLabel>

                                <FormControlLabel
                                    label='Cash'
                                    value='Cash'
                                    control={<Radio />}
                                ></FormControlLabel>

                            </RadioGroup>
                        </FormControl>
                    </ListItem>

                    <ListItem>
                        <Button fullWidth type='submit' variant='contained' color='primary'>
                            Continue
                        </Button>
                    </ListItem>

                    <ListItem>
                        <Button fullWidth type='button' variant='contained' onClick={() => router.push('/shipping')}>
                            Back
                        </Button>
                    </ListItem>

                </List>
            </form>
        </Layout>
    )
}
