import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles({
    navbar: {
        backgroundColor: '#203040',
        '& a': {
            color: '#fff',
            marginLeft: 10,
        }
    },
    brand :{
        fontWeight: 'bold',
        fontSize: '1.5rem',
    },
    grow : {
        flexGrow: 1,
    },
    main: {
        minHeight: '100vh',
    },
    footer: {
        textAlign: 'center',
        marginTop: '20px',
    },
    card: {
        minHeight: '100px',
        maxWidth: '250px',
    },
    grid: {
        justifyContent: 'center'
    },
    image: {
        width: '10px',
        height: '10px',
    },
    section: {
        margin: '20px 0',
    },
    button: {
        backgroundColor: 'blue',
        color: 'white',
    },
    form: {
        width: '100%',
        maxWidth: 800,
        margin: '0 auto',
    },
    buttonNavbar: {
        color: '#fff',
        textTransform: 'initial',
    },
    backgroundTransparent: {
        backgroundColor: 'transparent',
    },
    error:{
        color: 'F04040',
    },
    fullWidth:{
        width: '100%',
    },
})

export default useStyles