import { ButtonGroup, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { DefaultDailly } from '../../constants';
import { ICovidDaily, IAllData } from '../../types';
import CustomButton from '../CustomButton';
import Chart from './Chart';
import UKAndIrelandChart from './UKAndIrelandChart';

const useStyles = makeStyles({
    label: {
        color: "#DDD",
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 4
    },
    value: {
        color: "#ffed07",
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bold'
    }
});

const Sep = () => {
    return <div style={{ width: '100%', padding: '10px 0px 10px 0px', borderTop: "1px solid #444" }}></div>
}
interface IMoreDataProps {
    regionName: string;
    data: ICovidDaily[];
    changeRange: any;
    range: number | string;
    ukData: IAllData;
    irelandData: IAllData;
}
const MoreData = ({ regionName, data, changeRange, range, ukData, irelandData }: IMoreDataProps) => {
    const classes = useStyles();
    const latest: ICovidDaily = data && data.length > 0 ? data[0] : DefaultDailly;
    return <Container>
        <Grid container>
            <Grid container item xs={12} justify='center' alignContent='center' alignItems='center'>
                <Paper variant="elevation" elevation={3} style={{ position: 'relative', top: -35, padding: 10, backgroundColor: '#18181b' }}>
                    <Grid container justify='center' alignContent='center' alignItems='center'>
                        <Grid container item xs={12} justify='center' alignContent='center' alignItems='center'>
                            <Typography style={{ padding: 4, color: '#FFF', fontSize: 20, fontFamily: 'Roboto', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 10 }}>
                                {"Coronavirus (COVID-19) Overview in the UK and Ireland"}
                            </Typography>
                        </Grid>
                        <Grid container item xs={12} justify='center' alignContent='center' alignItems='center'>
                            <div style={{ position: 'relative', top: -10, fontSize: 12, color: '#444' }}>
                                Last updated: {moment(ukData?.updated).fromNow()}
                            </div>
                        </Grid>
                        <Grid item md={3} sm={6} xs={12}>
                            <div className={classes.label}>Total cases</div>
                            <div className={classes.value}>{ukData?.cases + irelandData?.cases}</div>
                        </Grid>
                        <Grid item md={3} sm={6} xs={12}>
                            <div className={classes.label}>Active</div>
                            <div className={classes.value}>{ukData?.active + irelandData?.active}</div>
                        </Grid>
                        <Grid item md={3} sm={6} xs={12}>
                            <div className={classes.label}>Deaths</div>
                            <div className={classes.value}>{ukData?.deaths + irelandData?.deaths}</div>
                        </Grid>
                        <Grid item md={3} sm={6} xs={12}>
                            <div className={classes.label}>Recovered</div>
                            <div className={classes.value}>{ukData?.recovered + irelandData?.recovered}</div>
                        </Grid>
                        <Grid container item md={6} xs={12}>
                            <div style={{ marginTop: 50 }}>
                                <UKAndIrelandChart xLabel="Accumulate new cases" name="Cases" irelandData={irelandData.timeline && irelandData.timeline.cases ? irelandData.timeline.cases : []} ukData={ukData.timeline && ukData.timeline.cases ? ukData.timeline.cases : []} />
                            </div>
                        </Grid>
                        <Grid container item md={6} xs={12}>
                            <div style={{ marginTop: 50 }}>
                                <UKAndIrelandChart color={"#F11"} xLabel="Accumulate New Deaths" name="Deaths" irelandData={irelandData.timeline && irelandData.timeline.deaths ? irelandData.timeline.deaths : []} ukData={ukData.timeline && ukData.timeline.deaths ? ukData.timeline.deaths : []} />
                            </div>
                        </Grid>
                        <Grid container item xs={12} style={{ marginTop: 10 }} >
                            <Link style={{ color: "#444", textTransform: 'uppercase' }} to="/uk-ireland">See more stats for UK & ireland</Link>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid container >
                <Grid item xs={12}>
                    <Typography style={{ padding: 4, color: '#FFF', fontSize: 20, fontFamily: 'Roboto', fontWeight: 500, textTransform: 'uppercase', marginBottom: 10 }}>
                        {"CORONAVIRUS (COVID-19) OVERVIEW  IN "}<span style={{ color: "#ffed07", fontWeight: 'bold' }}>{regionName}</span>
                    </Typography>
                    <span style={{ color: '#555', fontSize: 12, position: 'relative', top: -20 }}>{"＊ To change the region click on another one in the map"}</span>
                    <br />
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                    <div className={classes.label}>Total cases</div>
                    <div className={classes.value}>{latest.CumCases}</div>
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                    <div className={classes.label}>Active</div>
                    <div className={classes.value}>{latest.ActiveCases}</div>
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                    <div className={classes.label}>Deaths</div>
                    <div className={classes.value}>{latest.CumDeaths}</div>
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                    <div className={classes.label}>Recovered</div>
                    <div className={classes.value}>{latest.Recovered}</div>
                </Grid>
            </Grid>
            <Grid container justify='center' alignContent='center' alignItems='center' spacing={4}>
                <Grid item xs={12} style={{ borderTop: '1px solid #555', marginTop: 30 }}>
                    <Typography style={{ padding: 4, color: '#FFF', fontSize: 14, fontFamily: 'Roboto', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 10 }}>
                        {"Visualizations"}
                    </Typography>
                    <ButtonGroup color="inherit" variant="text" size="small">
                        <CustomButton disabled={range === 14} color="inherit" onClick={() => changeRange(14)} size="small">
                            {"Last 14 days"}
                        </CustomButton>
                        <CustomButton disabled={range === "all"} color="inherit" onClick={() => changeRange("all")} size="small">
                            {"All"}
                        </CustomButton>
                    </ButtonGroup>
                </Grid>
                <Grid item md={6} sm={12}>
                    <Paper variant="elevation" elevation={3} style={{ padding: 10, backgroundColor: '#18181b' }}>
                        <Typography style={{ padding: 4, color: '#FFF', fontSize: 14, fontFamily: 'Roboto', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 10 }}>
                            {"New Cases over time (14 days) in"} <span style={{ color: "rgb(253 241 95)", fontWeight: 'bold' }}>{regionName}</span>
                        </Typography>
                        <div style={{ width: '100%' }}>
                            <Chart regionName={regionName} range={range} name="New Cases" data={data ? data.map((d) => [d.Date, d.NewCases]) : []} />
                        </div>
                        <Sep />
                        <Typography style={{ padding: 4, color: '#FFF', fontSize: 14, fontFamily: 'Roboto', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 10 }}>
                            {"Accumulate Cases over time (14 days) in"} <span style={{ color: "rgb(253 241 95)", fontWeight: 'bold' }}>{regionName}</span>
                        </Typography>
                        <div style={{ width: '100%' }}>
                            <Chart regionName={regionName} range={range} name="Cases" data={data ? data.map((d) => [d.Date, d.CumCases]) : []} />
                        </div>
                    </Paper>
                </Grid>
                <Grid item md={6} sm={12} >
                    <Paper variant="elevation" elevation={3} style={{ padding: 10, backgroundColor: '#18181b' }}>
                        <Typography style={{ padding: 4, color: '#FFF', fontSize: 14, fontFamily: 'Roboto', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 10 }}>
                            {"Deaths over time (14 days) in "} <span style={{ color: "rgb(253 241 95)", fontWeight: 'bold' }}>{regionName}</span>
                        </Typography>
                        <div style={{ width: '100%' }}>
                            <Chart regionName={regionName} range={range} name="New Deaths" data={data ? data.map((d) => [d.Date, d.NewDeaths]) : []} />
                        </div>
                        <Sep />
                        <Typography style={{ padding: 4, color: '#FFF', fontSize: 14, fontFamily: 'Roboto', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 10 }}>
                            {"Accumulate Deaths over time (14 days) in "} <span style={{ color: "rgb(253 241 95)", fontWeight: 'bold' }}>{regionName}</span>
                        </Typography>
                        <div style={{ width: '100%' }}>
                            <Chart regionName={regionName} range={range} name="Deaths" data={data ? data.map((d) => [d.Date, d.CumDeaths]) : []} />
                        </div>
                    </Paper>
                </Grid>
                <Grid item md={6} sm={12} >
                    <Paper variant="elevation" elevation={3} style={{ padding: 10, backgroundColor: '#18181b' }}>
                        <Typography style={{ padding: 4, color: '#FFF', fontSize: 14, fontFamily: 'Roboto', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 10 }}>
                            {"Recovered over time (14 days) in "} <span style={{ color: "rgb(253 241 95)", fontWeight: 'bold' }}>{regionName}</span>
                        </Typography>
                        <div style={{ width: '100%' }}>
                            <Chart regionName={regionName} range={range} name="Recovered" data={data ? data.map((d) => [d.Date, d.Recovered]) : []} />
                        </div>
                    </Paper>
                </Grid>
                <Grid item md={6} sm={12} >
                    <Paper variant="elevation" elevation={3} style={{ padding: 10, backgroundColor: '#18181b' }}>
                        <Typography style={{ padding: 4, color: '#FFF', fontSize: 14, fontFamily: 'Roboto', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 10 }}>
                            {"Active cases over time (14 days) in "} <span style={{ color: "rgb(253 241 95)", fontWeight: 'bold' }}>{regionName}</span>
                        </Typography>
                        <div style={{ width: '100%' }}>
                            <Chart regionName={regionName} range={range} name="Active Cases" data={data ? data.map((d) => [d.Date, d.ActiveCases]) : []} />
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    </Container>
}

export default MoreData;