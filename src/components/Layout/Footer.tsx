import { Container, Grid, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
    footer: {
        textAlign: "center",
        padding: "1rem 0",
        color: "#aaa",
        fontSize: "14px",
        fontFamily: "Roboto",
        marginTop: "auto",
        bottom: 0,
        position: "absolute",
        width: "100%",
    }
});

export default function Footer() {
    const classes = useStyles();
    return <footer className={classes.footer}>
        <Container>
            <Grid container alignContent="center" justify="center">
                Copyright@2021
            </Grid>
        </Container>
    </footer>
}