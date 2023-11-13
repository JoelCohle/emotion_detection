import React from 'react';
import Grid from '@material-ui/core/Grid';
import makeStyles from "@material-ui/core/styles/makeStyles";
// import 'simplebar-react/dist/simplebar.min.css';
// import '../../styles/css/SimplebarCustom.css';

const useStyles = makeStyles((theme) => ({
  
    scrollDivs: {
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
  
    
  }));

const TimeBar = (props) =>{
    console.log(props)
    const classes = useStyles();
    function toHMSTimeString(seconds) {

        //new logic
        let timeString =
          "" +
          (Math.floor(seconds / 3600) < 10 ? "0" : "") +
          Math.floor(seconds / 3600) +
          ":"; //hours
        timeString +=
          (Math.floor(seconds / 60) < 10 ? "0" : "") +
          Math.floor(seconds / 60) +
          ":"; //minutes
        timeString +=
          (Math.floor(seconds % 60) < 10 ? "0" : "") + Math.floor(seconds % 60);
    
        return timeString;
      }
    

    return(
        <Grid
            item
            container
            wrap="nowrap"
            style={{
                height: "21.7%",
                background: "#d7d7d7",
            }}
            className={classes.scrollDivs}
            // onScroll={() => {scrollOtherDiv(1)}}
        >
            {Array.from(Array(props.totalSeconds + 1).keys()).map(
                (value, index) => (
                <Grid
                    item
                    container
                    direction="column"
                    style={{
                    minWidth: "7%",
                    width: '7%',
                    height: "100%",
                    background: "#d7d7d7",
                    }}
                >
                    <Grid
                    item
                    container
                    justify="center"
                    alignItems="flex-end"
                    style={{
                        width: "100%",
                        height: "60%",
                        color: "#7b7b7b",
                        fontSize: '2vh'
                    }}
                    >
                    {toHMSTimeString(index)}
                    </Grid>

                    <Grid
                    item
                    container
                    alignItems="flex-end"
                    style={{
                        width: "100%",
                        height: "40%",
                        position: "relative",
                        left: "50%",
                    }}
                    >
                    <Grid
                        item
                        container
                        alignItems="flex-end"
                        style={{ width: "20%", height: "100%" }}
                    >
                        <img
                        src="images/BigVerticalLine.png"
                        alt="\"
                        width="1px"
                        height="100%"
                        />
                    </Grid>
                    {
                        index < props.totalSeconds
                        ?
                        <>
                        <Grid
                        item
                        container
                        alignItems="flex-end"
                        style={{ width: "20%", height: "100%" }}
                        >
                        <img
                            src="images/SmallVerticalLine.png"
                            alt="|"
                            width="1px"
                            height="50%"
                        />
                        </Grid>

                        <Grid
                        item
                        container
                        alignItems="flex-end"
                        style={{ width: "20%", height: "100%" }}
                        >
                        <img
                            src="images/SmallVerticalLine.png"
                            alt="|"
                            width="1px"
                            height="50%"
                        />
                        </Grid>

                        <Grid
                        item
                        container
                        alignItems="flex-end"
                        style={{ width: "20%", height: "100%" }}
                        >
                        <img
                            src="images/SmallVerticalLine.png"
                            alt="|"
                            width="1px"
                            height="50%"
                        />
                        </Grid>

                        <Grid
                        item
                        container
                        alignItems="flex-end"
                        style={{ width: "20%", height: "100%" }}
                        >
                        <img
                            src="images/SmallVerticalLine.png"
                            alt="|"
                            width="1px"
                            height="50%"
                        />
                        </Grid>
                    </>
                    :
                        null
                    }
                    </Grid>
                </Grid>
                )
            )}
                        </Grid>
    )
};
export default TimeBar;
