import { Button, Link, List, ListItem, TextField, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { Layout } from '../Components/Layout'
import useStyles from '../Utils/Style'
import { Store } from '../Utils/Store'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { Controller, useForm } from 'react-hook-form'
import CheckoutWizard from '../Components/CheckoutWizard'

export default function Shipping() {
    const { handleSubmit, control, formState: { errors }, setValue } = useForm()
    const router = useRouter()
    const { redirect } = router.query
    const { state, dispatch } = useContext(Store)
    const { userInfo, cart:{shippingAddress}} = state
    useEffect(() => {
        if (!userInfo) {
            router.push('/login?redirect=/shipping')
        }
        setValue('fullName', shippingAddress.fullName)
        setValue('address', shippingAddress.address)
        setValue('city', shippingAddress.city)
        setValue('postalCode', shippingAddress.postalCode)
        setValue('country', shippingAddress.country)
    }, [])
    const clasess = useStyles()
    const submitHandler = async ({ fullName, address, city, postalCode, country }) => {
        // const { dataShipping } = { fullName, address, city, postalCode, country }
        dispatch({ type: 'SAVE_SHIPPINGPAGE_ADDRES', payload: { fullName, address, city, postalCode, country } })
        Cookies.set('shippingAddress', JSON.stringify({ fullName, address, city, postalCode, country }))
        router.push('/payment')
    }
    return (
        <Layout title="Shipping Addres">
            <CheckoutWizard activeStep={1} />
            <form className={clasess.form} onSubmit={handleSubmit(submitHandler)}>
                <Typography component='h1' variant='h1'>
                    Shipping Addres
                </Typography>
                <List>

                    <ListItem>
                        <Controller
                            name='fullName'
                            control={control}
                            defaultValue=''
                            rules={{
                                required: true,
                                minLength: 2,
                            }}
                            render={({ field }) => (
                                <TextField
                                    variant='outlined'
                                    fullWidth
                                    id='fullName'
                                    label='Your Full Name'
                                    error={Boolean(errors.fullName)}
                                    helperText={
                                        errors.fullName ? errors.fullName.type === 'minLength'
                                            ? 'Full Name Length is more than 1'
                                            : 'Full Name is required'
                                            : ''
                                    }
                                    {...field}>
                                </TextField>
                            )}
                        ></Controller>
                    </ListItem>

                    <ListItem>
                        <Controller
                            name='address'
                            control={control}
                            defaultValue=''
                            rules={{
                                required: true,
                                minLength: 2,
                            }}
                            render={({ field }) => (
                                <TextField
                                    variant='outlined'
                                    fullWidth
                                    id='address'
                                    label='Your Address'
                                    error={Boolean(errors.address)}
                                    helperText={
                                        errors.address ? errors.address.type === 'minLength'
                                            ? 'Full Address Length is more than 1'
                                            : 'Full Address is required'
                                            : ''
                                    }
                                    {...field}>
                                </TextField>
                            )}
                        ></Controller>
                    </ListItem>

                    <ListItem>
                        <Controller
                            name='city'
                            control={control}
                            defaultValue=''
                            rules={{
                                required: true,
                                minLength: 2,
                            }}
                            render={({ field }) => (
                                <TextField
                                    variant='outlined'
                                    fullWidth
                                    id='city'
                                    label='Your City'
                                    error={Boolean(errors.city)}
                                    helperText={
                                        errors.city ? errors.city.type === 'minLength'
                                            ? 'City Length is more than 1'
                                            : 'City is required'
                                            : ''
                                    }
                                    {...field}>
                                </TextField>
                            )}
                        ></Controller>
                    </ListItem>

                    <ListItem>
                        <Controller
                            name='postalCode'
                            control={control}
                            defaultValue=''
                            rules={{
                                required: true,
                                minLength: 2,
                            }}
                            render={({ field }) => (
                                <TextField
                                    variant='outlined'
                                    fullWidth
                                    id='postalCode'
                                    label='Your Postal Code'
                                    error={Boolean(errors.postalCode)}
                                    helperText={
                                        errors.postalCode ? errors.postalCode.type === 'minLength'
                                            ? 'Postal Code Length is more than 1'
                                            : 'Postal Code is required'
                                            : ''
                                    }
                                    {...field}>
                                </TextField>
                            )}
                        ></Controller>
                    </ListItem>

                    <ListItem>
                        <Controller
                            name='country'
                            control={control}
                            defaultValue=''
                            rules={{
                                required: true,
                                minLength: 2,
                            }}
                            render={({ field }) => (
                                <TextField
                                    variant='outlined'
                                    fullWidth
                                    id='country'
                                    label='Your Country'
                                    error={Boolean(errors.country)}
                                    helperText={
                                        errors.country ? errors.country.type === 'minLength'
                                            ? 'Country Length is more than 1'
                                            : 'Country is required'
                                            : ''
                                    }
                                    {...field}>
                                </TextField>
                            )}
                        ></Controller>
                    </ListItem>

                    <ListItem>
                        <Button variant='contained' type='submit' fullWidth color='primary'>
                            Continue
                        </Button>
                    </ListItem>

                </List>
            </form>
        </Layout>
    )
}

// || = null

// ! = does item not exist