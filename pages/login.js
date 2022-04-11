import { Button, Link, List, ListItem, TextField, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { Layout } from '../Components/Layout'
import useStyles from '../Utils/Style'
import NextLink from 'next/link'
import axios from 'axios'
import { Store } from '../Utils/Store'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { Controller, useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'
import { getError } from '../utils/error'

export default function Login() {
    const { handleSubmit, control, formState: { errors } } = useForm()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const router = useRouter()
    const { redirect } = router.query
    const { state, dispatch } = useContext(Store)
    const { userInfo } = state
    
    useEffect(() => { // if user info exist
        if (userInfo) {
            router.push('/')
        }
    }, [])
    const clasess = useStyles()

    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('') 
    // removing because useState propertis fecth form handler

    const submitHandler = async ({email, password}) => {
        closeSnackbar()
        try {
            const { data } = await axios.post('/api/users/login', {
                email,
                password,
            })
            dispatch({ type: 'USER_LOGIN', payload: data })
            // Cookies.set('userInfo', data)
            Cookies.set('userInfo', JSON.stringify(data))
            router.push(redirect || '/')
        } catch (err) {
            // enqueueSnackbar(err.response.data ? err.response.data.message : err.message,{
            //     variant: 'error'
            // })
            enqueueSnackbar(getError(err), { variant: 'error' })
            // alert(err.response.data ? err.response.data.message : err.message)
        }
    }
    return (
        <Layout title="Login">
            <form className={clasess.form} onSubmit={handleSubmit(submitHandler)}>
                <Typography component='h1' variant='h1'>
                    Login
                </Typography>
                <List>
                    <ListItem>
                        <Controller
                            name='email'
                            control={control}
                            defaultValue=''
                            rules={{
                                required: true,
                                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                            }}
                            render={({ field }) => (
                                <TextField
                                    variant='outlined'
                                    fullWidth
                                    id='email'
                                    label='Your Email'
                                    inputProps={{ type: 'email' }}
                                    error={Boolean(errors.email)}
                                    helperText={
                                        errors.email ? errors.email.type === 'pattern'
                                        ? 'Email is not valid'
                                        : 'Email is required'
                                        : ''
                                    }
                                    {...field}>
                                </TextField>
                            )}
                        ></Controller>
                    </ListItem>

                    <ListItem>
                        <Controller
                            name='password'
                            control={control}
                            defaultValue=''
                            rules={{
                                required: true,
                                minLength: 6,
                            }}
                            render={({ field }) => (
                                <TextField
                                    variant='outlined'
                                    fullWidth
                                    id='password'
                                    label='Your Password'
                                    inputProps={{ type: 'password' }}
                                    error={Boolean(errors.password)}
                                    helperText={
                                        errors.password ? errors.password.type === 'minLength'
                                        ? 'Password must more than 5'
                                        : 'Password is required'
                                        : ''
                                    }
                                    {...field}>
                                </TextField>
                            )}
                        ></Controller>
                    </ListItem>

                    <ListItem>
                        <Button variant='contained' type='submit' fullWidth color='primary'>
                            Login
                        </Button>
                    </ListItem>

                    <ListItem>
                        Don't Have an Account? &nbsp;
                        <NextLink href={`/register?redirect=${redirect || '/'}`} passHref>
                            <Link>Register</Link>
                        </NextLink>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}

// || = null