import React, { useContext, useState } from 'react'
import Head from 'next/head'
import { AppBar, Container, Toolbar, Typography, Link, ThemeProvider, CssBaseline, Switch, Badge, Button, createTheme, Menu, MenuItem} from '@material-ui/core'
import useStyles from '../Utils/Style'
import NextLink from 'next/link'
import { Store } from '../Utils/Store'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

export const Layout = ({ children, title, description }) => {
    const router = useRouter()
    const { state, dispatch } = useContext(Store)
    const { darkMode, cart, userInfo } = state
    const theme = createTheme({
        typography: {
            h1: {
                fontSize: '1.6rem',
                fontWeight: 400,
                margin: '1rem 0',
            },
            h2: {
                fontSize: '1.4rem',
                fontWeight: 400,
                margin: '1rem 0',
            }
        },
        palette: {
            type: darkMode ? 'dark' : 'light',
            primary: {
                main: '#f0c000',
            },
            secondary: {
                main: '#208000'
            }
        }
    })
    const clasess = useStyles()
    const darkModeChangeHandler = () => {
        dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' })
        const newDarkMode = !darkMode
        Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF')
    }
    const [anchorEl, setAnchorEl] = useState(null)
    const loginClickHandler = (e) => {
        setAnchorEl(e.currentTarget)
    }
    const loginMenuCloseHandler = (e, redirect) => {
        setAnchorEl(null)
        if(redirect){
            router.push(redirect)
        }
    }
    const logoutClickHandler = () => {
        setAnchorEl(null)
        dispatch({type: 'USER_LOGOUT'})
        Cookies.remove('userInfo')
        Cookies.remove('cartItems')
        router.push('/')
    }
    return (
        <div>
            <Head>
                <title>{title ? `${title} - insinyur` : 'insinyur'}</title>
                {description && <meta name='description' content={description}></meta>}
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar position='static' className={clasess.navbar}>
                    <Toolbar>
                        <NextLink href='/' passHref>
                            <Link>
                                <Typography className={clasess.brand}> insinyur </Typography>
                            </Link>
                        </NextLink>
                        <div className={clasess.grow}></div>
                        <div>
                            <Switch checked={darkMode} onChange={darkModeChangeHandler}></Switch>
                            <NextLink href="/cart">
                                <Link>
                                    {cart.cartItems.length > 0 ? (
                                        <Badge
                                            color='secondary'
                                            badgeContent={cart.cartItems.length}>Cart</Badge>
                                    ) : (
                                        'Cart'
                                    )}
                                </Link>
                            </NextLink>
                            {userInfo ? (
                                <>
                                    <Button
                                        className={clasess.buttonNavbar}
                                        aria-controls='simple-menu'
                                        aria-haspopup='true'
                                        onClick={loginClickHandler}
                                    > {userInfo.name}
                                    </Button>
                                    <Menu
                                        id='simple-menu'
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={loginMenuCloseHandler}>
                                        <MenuItem onClick={(e) => loginMenuCloseHandler(e, '/profile')}>Profile</MenuItem>
                                        <MenuItem onClick={(e) => loginMenuCloseHandler(e, '/order-history')}>Order History</MenuItem>
                                         {userInfo.isAdmin && (
                                             <MenuItem onClick={(e) => loginMenuCloseHandler(e, '/admin/dashboard')}>Admin Dashboard</MenuItem>
                                         )}
                                        <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <NextLink href="/login">
                                    <Link>Login</Link>
                                </NextLink>
                            )}
                        </div>
                    </Toolbar>
                </AppBar>
                <Container className={clasess.main}>
                    {children}
                </Container>
                <footer className={clasess.footer}>
                    <Typography> All Right Reserved Insinyur</Typography>
                </footer>
            </ThemeProvider>

        </div>
    )
}
