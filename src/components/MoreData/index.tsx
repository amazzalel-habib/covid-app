import { Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
    label:{
        color: "#DDD",
        fontSize: 16,
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: 4
    },
    value:{
        color: "#ffed07",
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bold'
    }
});


const MoreData = () => {
    const classes = useStyles();
    return <Container>
        <Grid container>
            <Grid container item xs={12} justify='center' alignContent='center' alignItems='center'>
                <Paper variant="elevation" elevation={3} style={{ position: 'relative', top: -35, padding: 10, backgroundColor: '#18181b' }}>
                    <Grid container justify='center' alignContent='center' alignItems='center'>
                        <Grid container item xs={12} justify='center' alignContent='center' alignItems='center'>
                            <Typography style={{ padding: 4, color: '#FFF', fontSize: 18, fontFamily: 'Roboto', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 10 }}>
                                {"Coronavirus (COVID-19) Overview in the UK and Ireland"}
                            </Typography>
                        </Grid>
                        <Grid item md={3} sm={6} xs={12}>
                            <div className={classes.label}>Total Cases:</div>
                            <div className={classes.value}>265253</div>
                        </Grid>
                        <Grid item md={3} sm={6} xs={12}>
                            <div className={classes.label}>Active:</div>
                            <div className={classes.value}>265253</div>
                        </Grid>
                        <Grid item md={3} sm={6} xs={12}>
                            <div className={classes.label}>Total Deaths:</div>
                            <div className={classes.value}>265253</div>
                        </Grid>
                        <Grid item md={3} sm={6} xs={12}>
                            <div className={classes.label}>Total Recovered:</div>
                            <div className={classes.value}>265253</div>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <div style={{color: '#555', fontSize: 12}}>{"＊ To change the region click on another one in the map"}</div>
            </Grid>
        </Grid>
    </Container>
}

export default MoreData;