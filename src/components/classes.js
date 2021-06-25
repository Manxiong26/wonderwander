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
      }
  }));

export { useStyles }


