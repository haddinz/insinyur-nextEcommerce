const classes = {
  //common
  flex: {
    display: "flex",
  },
  hidden: {
    display: "none",
  },
  visible: {
    display: "initial",
  },
  sort: {
    marginRight: 1,
  },
  fullHeight: {
    height: "100vh",
  },
  fullWidth: {
    width: "100%",
  },
  error: {
    color: "#f04040",
  },

  //layout
  main: {
    marginTop: 2,
    minHeight: "80vh",
  },
  footer: {
    marginTop: 1,
    textAlign: "center",
  },
  section: {
    marginTop: 1,
    marginBottom: 1,
  },

  //header
  appbar: {
    backgroundColor: "#203040",
    "& a": {
      color: "#fff",
      marginLeft: 1,
    },
  },
  toolbar: {
    justifyContent: "space-between",
  },
  brand: {
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  grow: {
    flexGrow: 1,
  },
  navbarButton: {
    color: "#fff",
    textTransform: "initial",
  },
  manuButton: {
    padding: 0,
  },

  //seacrh
  searchForm: {
    border: '1px solid #fff',
    backgroundColor: '#fff',
    borderRadius: 1,
  },
  seacrhInput: {
    paddingLeft: 1,
    color: '#000',
    '& ::placeholder': {
      color: '#606060',
    }
  },
  seacrhButton: {
    backgroundColor: '#f8c040',
    padding: 5,
    borderRadius: ' 0 5px 5px 0',
    '& span': {
      color: '#000'
    },
  },

  //review
  reviewItem: {
    marginRight: '1rem',
    borderRight: '1px #808080 solid',
    paddingRight: '1rem',
  },

  //map
  mapInputBox: {
    position: 'absolute',
    display: 'flex',
    width: 250,
  },

  // navbar: {
  //   backgroundColor: "#203040",
  //   "& a": {
  //     color: "#fff",
  //     marginLeft: 10,
  //   },
  // },
  // brand: { 
  //   fontWeight: "bold",
  //   fontSize: "1.5rem",
  // },
  // grow: {
  //   flexGrow: 1,
  // },
  // main: {
  //   minHeight: "100vh",
  // },
  // footer: {
  //   textAlign: "center",
  //   marginTop: "20px",
  // },
  // card: {
  //   minHeight: "100px",
  //   maxWidth: "250px",
  // },
  // grid: {
  //   justifyContent: "center",
  // },
  // image: {
  //   width: "10px",
  //   height: "10px",
  // },
  // section: {
  //   margin: "20px 0",
  // },
  // button: {
  //   backgroundColor: "blue",
  //   color: "white",
  // },
  // form: {
  //   width: "100%",
  //   maxWidth: 800,
  //   margin: "0 auto",
  // },
  // buttonNavbar: {
  //   color: "#fff",
  //   textTransform: "initial",
  // },
  // backgroundTransparent: {
  //   backgroundColor: "transparent",
  // },
  // error: {
  //   color: "F04040",
  // },
  // fullWidth: {
  //   width: "100%",
  // },
  // reviewForm: {
  //   maxWidth: 800,
  //   width: "100%",
  // },
  // reviewItem: {
  //   marginRight: "1rem",
  //   borderRight: "1px solid #808080",
  //   paddingRight: "1rem",
  // },
  // toolbar: {
  //   justifyContent: "space-between",
  // },
  // menuButton: {
  //   padding: 0,
  // },
  // mt1: {
  //   marginTop: "1rem",
  // },
  // //search
  // // searchSection: {
  // //   display: "none",
  // //   [theme.breakpoints.up("md")]: {
  // //     display: "flex",
  // //   },
  // // },
  // searchForm: {
  //   border: "1px solid #fff",
  //   backgroundColor: "#fff",
  //   borderRadius: 5,
  // },
  // searchInput: {
  //   paddingLeft: 5,
  //   color: "black",
  //   "& ::placeholder": {
  //     color: "#000",
  //   },
  // },
  // iconButton: {
  //   backgroundColor: "#f8c040",
  //   padding: 5,
  //   borderRadius: "0 5px 5px 0",
  //   "& span": {
  //     color: "#000",
  //   },
  // },
  // sort: {
  //   marginRight: 5,
  // },
  // fullContainer: { height: "100vh" },
  // mapInputBox: {
  //   position: "absolute",
  //   display: "flex",
  //   left: 0,
  //   right: 0,
  //   margin: "10px auto",
  //   width: 300,
  //   height: 40,
  //   "& input": {
  //     width: 250,
  //   },
  // },
};

export default classes;
