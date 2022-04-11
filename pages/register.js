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

export default function Register() {
    const { handleSubmit, control, formState: { errors } } = useForm()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const router = useRouter()
    const { redirect } = router.query
    const { state, dispatch } = useContext(Store)
    const { userInfo } = state

    // if(userInfo){  // if user info exist
    //     router.push('/')
    // }

    useEffect(() => {
        if (userInfo) {
            router.push('/')
        }
    }, [])
    const clasess = useStyles()
    
    // const [name, setName] = useState('')
    // const [email, setEmail] = useState('')
    // const [confirmPassword, setConfirmPassword] = useState('')
    // const [password, setPassword] = useState('')

    const submitHandler = async ({ name, email, password, confirmPassword }) => {
        // e.preventDefault()
        closeSnackbar()
        if (password !== confirmPassword) {
            enqueueSnackbar('Password dont match',{ variant: 'error'})
            // alert('Password dont Match')
            return
        }
        try {
            const { data } = await axios.post('/api/users/register', {
                name,
                email,
                password,
            })
            dispatch({ type: 'USER_LOGIN', payload: data })
            // Cookies.set('userInfo', data)
            Cookies.set('userInfo', JSON.stringify(data))
            router.push(redirect || '/')
        } catch (err) {
            // enqueueSnackbar(err.response.data ? err.response.data.message : err.message,{ variant: 'error'})
            enqueueSnackbar(getError(err), { variant: 'error' })
            // alert(err.response.data ? err.response.data.message : err.message)
        }
    }
    return (
        <Layout title="Register">
            <form className={clasess.form} onSubmit={handleSubmit(submitHandler)}>
                <Typography component='h1' variant='h1'>
                    Register
                </Typography>
                <List>
                    {/* <ListItem>
                        <TextField
                            variant='outlined'
                            fullWidth
                            id='name'
                            label='Your Name'
                            inputProps={{ type: 'name' }}
                            onChange={(e) => setName(e.target.value)}>
                        </TextField>
                    </ListItem>

                    <ListItem>
                        <TextField
                            variant='outlined'
                            fullWidth
                            id='email'
                            label='Your Email'
                            inputProps={{ type: 'email' }}
                            onChange={(e) => setEmail(e.target.value)}>
                        </TextField>
                    </ListItem>

                    <ListItem>
                        <TextField
                            variant='outlined'
                            fullWidth
                            id='password'
                            label='Your Password'
                            inputProps={{ type: 'password' }}
                            onChange={(e) => setPassword(e.target.value)}>
                        </TextField>
                    </ListItem>
                    
                    <ListItem>
                        <TextField
                            variant='outlined'
                            fullWidth
                            id='confirmPassword'
                            label='Confirm Your Password'
                            inputProps={{ type: 'password' }}
                            onChange={(e) => setConfirmPassword(e.target.value)}>
                        </TextField>
                    </ListItem> */}

                    <ListItem>
                        <Controller
                            name='name'
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
                                    id='name'
                                    label='Your Name'
                                    inputProps={{ type: 'name' }}
                                    error={Boolean(errors.name)}
                                    helperText={
                                        errors.name ? errors.name.type === 'minLength'
                                            ? 'Name Length is more than 1'
                                            : 'Name is required'
                                            : ''
                                    }
                                    {...field}>
                                </TextField>
                            )}
                        ></Controller>
                    </ListItem>

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
                        <Controller
                            name='confirmPassword'
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
                                    id='confirmPassword'
                                    label='Your Confirm Password'
                                    inputProps={{ type: 'password' }}
                                    error={Boolean(errors.confirmPassword)}
                                    helperText={
                                        errors.confirmPassword ? errors.confirmPassword.type === 'minLength'
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
                            Register
                        </Button>
                    </ListItem>

                    <ListItem>
                        Already have an account? &nbsp;
                        <NextLink href={`/login?redirect=${redirect || '/'}`} passHref>
                            <Link>Login</Link>
                        </NextLink>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}

// || = null