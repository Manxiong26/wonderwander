import { makeStyles } from "@material-ui/core";


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
      thumbnail: {
        width: '60px',
        height: '60px',
        marginRight: 10,
        border: "1px solid black"
      },
      title: {
          textAlign: 'center',
          fontFamily: theme.typography.Pacifico,
          textDecoration: 'underline',
          color: theme.palette.primary.main
      },
      image: {
          maxWidth: '280px',
          maxHeight: '280px',
          marginRight: 'auto',
          marginLeft: 'auto',
          display: 'block',
          border: '1px solid black'
      },
      imageInfo: {
          textAlign: 'center'
      },
      pageMargin: {
        marginLeft: '6%',
        marginRight: '6%'
      },
      nextBtn: {
          float: 'right',    
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
        
        

      },
      btnGroup: {
        display: 'flex',
        alignItems: 'flex-end',
        marginLeft: '15%'
      },
      btn: {
        
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
      formBtn: {
          marginLeft: '25%',
          marginRight: '25%',
          marginTop: '4%',
          marginBottom: '4%'
      },
      adminNav: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '2%'
      }

  }));

export { useStyles }


