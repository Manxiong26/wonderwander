import { makeStyles } from "@material-ui/core";
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  map: {
    marginRight: "auto",
    marginLeft: "auto",
    border: "1px solid black",
  },
  mapContainer: {
    marginTop: "auto",
    marginBottom: "auto",
  },
  toggle: {
    display: "flex",
    justifyContent: "flex-end",
    marginRight: "5%",
    marginBottom: "1%",
  },
  thumbnailContainer: {
    width: '25%',
    height: '60px',
    marginRight: 10,
  },
  thumbnail: {
    border: "1px solid black",

  },
  thumbnailLarge: {
    border: "1px solid black",
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginRight: 10,
  },
  title: {
    textAlign: 'center',
    fontFamily: theme.typography.Pacifico,
    textDecoration: 'underline',
    color: theme.palette.primary.main,
    marginBottom: '2%'

  },
  image: {
    maxWidth: '280px',
    maxHeight: '280px',
    marginRight: 'auto',
    marginLeft: 'auto',
    display: 'block',
    border: '1px solid black',
    marginTop: '5%',

  },
  imageContainer: {
    height: '150px', 
    width: '150px',
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  bigImage: {
    maxWidth: '360px',
    maxHeight: '360px',
    marginRight: 'auto',
    marginLeft: 'auto',
    display: 'block',
    border: '1px solid black',
    marginTop: '5%',
  },
  smallImg: {
    maxWidth: '100px',
    maxHeight: '100px',
    marginRight: 'auto',
    marginLeft: 'auto',
    display: 'block',
    marginTop: '5%',
    marginBottom: '5%',
  },
  imageInfo: {
    textAlign: 'center'
  },
  pageMargin: {
    marginLeft: '6%',
    marginRight: '6%',
  },
  welcomeMargin: {
    marginLeft: '6%',
    marginRight: '6%',
    marginBottom: '6%',
  },
  nextBtn: {
    float: 'right',
  },
  backBtn: {
    float: 'left',
  },
  center: {
    textAlign: 'center',
    marginTop: '5%',
    marginBottom: '5%',
  },
  pageCenter: {
    textAlign: 'center',
    padding: '5%',
    marginTop: '5%',
  },
  card: {
    maxWidth: '300px',
    maxHeight: '300px',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: '5%',
    marginBottom: '5%',
    overflow: 'auto'
  },
  media: {
    height: 300,
  },
  blue: {
    color: '#fff',
    backgroundColor: blue[500],
    width: '60px',
    height: '60px',
    marginRight: 10,
    border: "1px solid black"
  },
  divider: {
    border: "1px solid grey"
  },
  red: {
    marginTop: '5%',
    color: '#DC0100',
    fontFamily: theme.typography.Pacifico,
  },
  redCenter: {
    color: '#DC0100',
    textAlign: 'center',
    fontFamily: theme.typography.Pacifico,
    marginTop: '5%',
    marginBottom: '2%',
  },
  black: {
    color: 'black',
    textAlign: 'center',
    fontFamily: theme.typography.Pacifico,
  },
  seen: {
    background: '#8C8A8C',
  },

  cardForm: {
    width: '60%',
    height: 750,
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingRight: '10%',
    paddingLeft: '10%',
    overflow: 'auto'
  },
  cardTable: {
    width: '80%',
    height: 750,
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingRight: '10%',
    paddingLeft: '10%',
    overflow: 'auto'
  },
  promptCard: {
    width: '80%',
    height: 400,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: '10%',
    paddingRight: '5%',
    paddingLeft: '5%',
    overflow: 'auto',
    display: 'flex'
  },

  btnGroup: {
    display: 'flex',
    alignItems: 'flex-end',
    marginLeft: '15%'
  },
  btn: {
    margin: '1%'
  },
  cameraBtn: {
    marginLeft: '25%',
    marginRight: '25%',
    marginTop: '4%',
    marginBottom: '4%',
    position: 'absolute',
    bottom: 0,
    left: 30

  },
  table: {
    overflow: 'hidden',
    marginTop: '10%',
  },
  cardContent: {
    marginTop: '10%',
  },
  tableContent: {
    marginTop: '5%',
  },
  form: {
    marginTop: '10%',
    display: 'flex',
    flexDirection: 'column',
  },
  inputs: {
    marginTop: '5%',
    marginBottom: '2%',

  },
  loginInputs: {
    display: 'table-cell',
    textAlign: 'center',
  },
  formBtn: {
    marginLeft: '25%',
    marginRight: '25%',
    marginTop: '4%',
    marginBottom: '4%'
  },
  adminNav: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2%',
    flexWrap: 'wrap'

  },
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  loginForm: {
    width: 350,
    height: 500,
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingRight: '2%',
    paddingLeft: '2%',
    overflow: 'auto',
    display: 'flex',
    justifyContent: 'center',

  },
  textBox: {
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%',
    minHeight: '50px',
    maxHeight: '200px',
    overflow:'auto'
  }, 
  reactPlayer: {
    marginRight: 'auto',
    marginLeft: 'auto',
    
  },
  caption: {
    width: '75%',
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingBottom: '5%'
    
  },
  loginBtn: {
  },
}));

export { useStyles }


