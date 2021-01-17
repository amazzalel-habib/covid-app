import { ButtonGroup, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import moment from 'moment';
import React, { useState } from 'react';
import { Days2Ago, DefaultDailly, Today, YesterDay } from '../../constants';
import { ICountryData, ICovidDaily } from '../../types';
import CustomButton from '../CustomButton';
import ExtraDetails from '../ExtraDetails';
import Loader from '../loader';
import BarChart from './BarChart';
import Chart from './Chart';
import UKAndIrelandChart from './UKAndIrelandChart';

const useStyles = makeStyles({
    overviewBox: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        padding: 4,
    },
    label: {
        color: "#DDD",
        fontSize: 13,
    },
    value: {
        color: "#ffed07",
        fontSize: 13,
        fontWeight: 'bold'
    },
    tableRow: {
        color: '#EEE',
        borderBottom: '1px solid #444',
    }
});

const Sep = () => {
    return <div style={{ width: '100%', padding: '10px 0px 10px 0px', borderTop: "1px solid #444" }}></div>
}
interface IMoreDataProps {
    regionName: string;
    data: ICovidDaily[] | null;
    changeRange: any;
    range: number | string;
    ukData: ICountryData;
    irelandData: ICountryData;
    dateIndex: number;
    changeDate: any;
    countryStatus: string;
    nationStatus: string;
    selectedNationData: ICovidDaily[] | null;
}
const dateLabels = [
    "Today",
    "Yesterday",
    "2 days ago"
];
const MoreData = ({ regionName, data, changeRange, range, ukData, irelandData, dateIndex, changeDate, countryStatus, nationStatus, selectedNationData }: IMoreDataProps) => {
    const classes = useStyles();
    const [ShowCountriesExtra, setShowCountriesExtra] = useState(false);
    const latest: ICovidDaily = data && data.length > dateIndex ? data[dateIndex] : DefaultDailly;
    const rangeFormatted = range === "all" ? 'all time' : '14 days';
    const dateFormatted = dateLabels[dateIndex];
    return <Container>
        <Grid container>
            <Grid container item xs={12} justify='center' alignContent='center' alignItems='center'>
                <Paper variant="elevation" elevation={3} style={{ position: 'relative', top: -35, padding: 10, backgroundColor: '#18181b', margin: '0 auto', width: '100%' }}>
                    <Grid container justify='center' alignContent='center' alignItems='center'>
                        <Grid container item xs={12} justify='center' alignContent='center' alignItems='center'>
                            <Typography style={{ padding: 4, color: '#FFF', fontSize: 20, fontFamily: 'Roboto', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 10 }}>
                                {"Coronavirus (COVID-19) Overview in the UK and Ireland"}
                            </Typography>
                        </Grid>
                        <Loader status={countryStatus}>
                            <Grid container item xs={12} justify='center' alignContent='center' alignItems='center'>
                                <div style={{ position: 'relative', top: -10, fontSize: 12, color: '#444' }}>
                                    Last updated: {moment(ukData?.updated).fromNow()}
                                </div>
                            </Grid>
                            <Grid container item xs={12} justify='center' alignContent='center'>
                                <Grid className={classes.overviewBox} container justify='center' item md={2} sm={6} xs={12} style={{ borderRight: '1px solid #555' }}>
                                    <div className={classes.label}>Active Cases</div>
                                    <div className={classes.value}>{ukData?.active + irelandData?.active}</div>
                                </Grid>
                                <Grid className={classes.overviewBox} item md={2} sm={6} xs={12} style={{ borderRight: '1px solid #555' }}>
                                    <div className={classes.label}>Total cases</div>
                                    <div className={classes.value}>{ukData?.cases + irelandData?.cases}</div>
                                    <div>
                                        <UKAndIrelandChart color={"#F11"} xLabel="Accumulate new cases" name="Cases" irelandData={irelandData?.timeline && irelandData?.timeline.cases ? irelandData?.timeline.cases : []} ukData={ukData?.timeline && ukData?.timeline.cases ? ukData?.timeline.cases : []} />
                                    </div>
                                </Grid>
                                <Grid className={classes.overviewBox} item md={2} sm={6} xs={12} style={{ borderRight: '1px solid #555' }}>
                                    <div className={classes.label}>Deaths</div>
                                    <div className={classes.value}>{ukData?.deaths + irelandData?.deaths}</div>
                                    <div>
                                        <UKAndIrelandChart color={"#F11"} xLabel="Accumulate New Deaths" name="Deaths" irelandData={irelandData?.timeline && irelandData?.timeline.deaths ? irelandData?.timeline.deaths : []} ukData={ukData?.timeline && ukData?.timeline.deaths ? ukData?.timeline.deaths : []} />
                                    </div>
                                </Grid>
                                <Grid className={classes.overviewBox} item md={2} sm={6} xs={12}>
                                    <div className={classes.label}>Recovered</div>
                                    <div className={classes.value}>{ukData?.recovered + irelandData?.recovered}</div>
                                    <div>
                                        <UKAndIrelandChart color={"#1F1"} xLabel="Recovered" name="Recovered" irelandData={irelandData?.timeline && irelandData?.timeline.recovered ? irelandData?.timeline.recovered : []} ukData={ukData?.timeline && ukData?.timeline.recovered ? ukData?.timeline.recovered : []} />
                                    </div>
                                </Grid>
                            </Grid>
                            {ShowCountriesExtra &&
                                <Grid item container xs={12} spacing={2} style={{ marginTop: 30 }}>
                                    <Grid item container xs={12} className={classes.tableRow}>
                                        <Grid item xs={6} className={classes.label}>Critical:</Grid>
                                        <Grid item xs={6}>UK: <span className={classes.value}>{ukData.critical}</span>  &nbsp;|  &nbsp;Ireland: <span className={classes.value}>{irelandData.critical}</span></Grid>
                                    </Grid>
                                    <Grid item container xs={12} className={classes.tableRow}>
                                        <Grid item xs={6} className={classes.label}>Deaths Per One Million:</Grid>
                                        <Grid item xs={6}>UK: <span className={classes.value}>{ukData.deathsPerOneMillion}</span>  &nbsp;|  &nbsp;Ireland: <span className={classes.value}>{irelandData.deathsPerOneMillion}</span></Grid>
                                    </Grid>
                                    <Grid item container xs={12} className={classes.tableRow}>
                                        <Grid item xs={6} className={classes.label}>Population:</Grid>
                                        <Grid item xs={6}>UK: <span className={classes.value}>{ukData.population}</span>  &nbsp;|  &nbsp;Ireland: <span className={classes.value}>{irelandData.population}</span></Grid>
                                    </Grid>
                                    <Grid item container xs={12} className={classes.tableRow}>
                                        <Grid item xs={6} className={classes.label}>Recovered Today:</Grid>
                                        <Grid item xs={6}>UK: <span className={classes.value}>{ukData.todayRecovered}</span>  &nbsp;|  &nbsp;Ireland: <span className={classes.value}>{irelandData.todayRecovered}</span></Grid>
                                    </Grid>
                                    <Grid item container xs={12} className={classes.tableRow}>
                                        <Grid item xs={6} className={classes.label}>New Cases:</Grid>
                                        <Grid item xs={6}>UK: <span className={classes.value}>{ukData.todayCases}</span>  &nbsp;|  &nbsp;Ireland: <span className={classes.value}>{irelandData.todayCases}</span></Grid>
                                    </Grid>
                                    <Grid item container xs={12} className={classes.tableRow}>
                                        <Grid item xs={6} className={classes.label}>New Deaths:</Grid>
                                        <Grid item xs={6}>UK: <span className={classes.value}>{ukData.todayDeaths}</span>  &nbsp;|  &nbsp;Ireland: <span className={classes.value}>{irelandData.todayDeaths}</span></Grid>
                                    </Grid>
                                    <Grid item container xs={12} className={classes.tableRow}>
                                        <Grid item xs={6} className={classes.label}>Total Tests:</Grid>
                                        <Grid item xs={6}>UK: <span className={classes.value}>{ukData.tests}</span>  &nbsp;|  &nbsp;Ireland: <span className={classes.value}>{irelandData.tests}</span></Grid>
                                    </Grid>
                                    <Grid item container xs={12} className={classes.tableRow}>
                                        <Grid item xs={6} className={classes.label}>Tests Per One Million:</Grid>
                                        <Grid item xs={6}>UK: <span className={classes.value}>{ukData.testsPerOneMillion}</span>  &nbsp;|  &nbsp;Ireland: <span className={classes.value}>{irelandData.testsPerOneMillion}</span></Grid>
                                    </Grid>
                                </Grid>
                            }
                            <Grid container item xs={12} style={{ marginTop: 10 }} justify='center' alignContent='center' >
                                <CustomButton style={{ color: "#444", textTransform: 'uppercase' }} onClick={() => setShowCountriesExtra(!ShowCountriesExtra)}>{ShowCountriesExtra ? "Hide" : "See more stats for UK & ireland"}</CustomButton>
                            </Grid>
                        </Loader>
                    </Grid>
                </Paper>
            </Grid>
            <Grid container >
                <Grid item xs={12} container alignContent='center' justify='space-between' style={{ marginBottom: 20 }}>
                    <Typography style={{ padding: 4, color: '#FFF', fontSize: 20, fontFamily: 'Roboto', fontWeight: 500, textTransform: 'uppercase' }}>
                        {"CORONAVIRUS (COVID-19) OVERVIEW  IN "}<span style={{ color: "#ffed07", fontWeight: 'bold' }}>{regionName}</span> {`(${dateFormatted})`}
                    </Typography>
                    <ButtonGroup color="inherit" variant="text" size="small">
                        <CustomButton disabled={dateIndex === 2} color="inherit" onClick={() => changeDate(Days2Ago)} size="small">
                            {"Last 2 days"}
                        </CustomButton>
                        <CustomButton disabled={dateIndex === 1} color="inherit" onClick={() => changeDate(YesterDay)} size="small">
                            {"Yesterday"}
                        </CustomButton>
                        <CustomButton disabled={dateIndex === 0} color="inherit" onClick={() => changeDate(Today)} size="small">
                            {"Today"}
                        </CustomButton>
                    </ButtonGroup>
                </Grid>
                <Grid item xs={12}>
                    <span style={{ color: '#555', fontSize: 12, position: 'relative', top: -20 }}>{"＊ To change the region click on another one in the map"}</span>
                </Grid>
                <Loader status={nationStatus} >
                    {regionName !== 'Ireland' && <ExtraDetails selectedNationData={selectedNationData} data={latest} />}
                </Loader>
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
                <Loader status={nationStatus} >
                    <Grid item md={12} sm={12}>
                        {(latest?.FemaleCases && latest?.MaleCases && latest?.FemaleCases.length !== 0 && latest?.MaleCases.length !== 0) && <Paper variant="elevation" elevation={3} style={{ padding: 10, backgroundColor: '#18181b', width: '100%' }}>
                            <Typography style={{ padding: 4, color: '#FFF', fontSize: 14, fontFamily: 'Roboto', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 10 }}>
                                {`Cases by age and gender (${rangeFormatted}) in `} <span style={{ color: "rgb(253 241 95)", fontWeight: 'bold' }}>{regionName}</span>
                            </Typography>
                            <div style={{ width: '100%' }}>
                                <BarChart maleData={latest?.MaleCases ? latest?.MaleCases : []} femaleData={latest?.FemaleCases ? latest?.FemaleCases : []} />
                            </div>
                        </Paper>}
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <Paper variant="elevation" elevation={3} style={{ padding: 10, backgroundColor: '#18181b', width: '100%' }}>
                            <Typography style={{ padding: 4, color: '#FFF', fontSize: 14, fontFamily: 'Roboto', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 10 }}>
                                {`New Cases over time (${rangeFormatted}) in `} <span style={{ color: "rgb(253 241 95)", fontWeight: 'bold' }}>{regionName}</span>
                            </Typography>
                            <div style={{ width: '100%' }}>
                                <Chart regionName={regionName} range={range} name="New Cases" data={data ? data.map((d) => [d.Date, d.NewCases]) : []} />
                            </div>
                            <Sep />
                            <Typography style={{ padding: 4, color: '#FFF', fontSize: 14, fontFamily: 'Roboto', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 10 }}>
                                {`Accumulate Cases over time (${rangeFormatted}) in `} <span style={{ color: "rgb(253 241 95)", fontWeight: 'bold' }}>{regionName}</span>
                            </Typography>
                            <div style={{ width: '100%' }}>
                                <Chart regionName={regionName} range={range} name="Cases" data={data ? data.map((d) => [d.Date, d.CumCases]) : []} />
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item md={6} sm={12} >
                        <Paper variant="elevation" elevation={3} style={{ padding: 10, backgroundColor: '#18181b', width: '100%' }}>
                            <Typography style={{ padding: 4, color: '#FFF', fontSize: 14, fontFamily: 'Roboto', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 10 }}>
                                {`Deaths over time (${rangeFormatted}) in `} <span style={{ color: "rgb(253 241 95)", fontWeight: 'bold' }}>{regionName}</span>
                            </Typography>
                            <div style={{ width: '100%' }}>
                                <Chart regionName={regionName} range={range} name="New Deaths" data={data ? data.map((d) => [d.Date, d.NewDeaths]) : []} />
                            </div>
                            <Sep />
                            <Typography style={{ padding: 4, color: '#FFF', fontSize: 14, fontFamily: 'Roboto', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 10 }}>
                                {`Accumulate Deaths over time (${rangeFormatted}) in `} <span style={{ color: "rgb(253 241 95)", fontWeight: 'bold' }}>{regionName}</span>
                            </Typography>
                            <div style={{ width: '100%' }}>
                                <Chart regionName={regionName} range={range} name="Deaths" data={data ? data.map((d) => [d.Date, d.CumDeaths]) : []} />
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item md={6} sm={12} >
                        <Paper variant="elevation" elevation={3} style={{ padding: 10, backgroundColor: '#18181b', width: '100%' }}>
                            <Typography style={{ padding: 4, color: '#FFF', fontSize: 14, fontFamily: 'Roboto', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 10 }}>
                                {`Recovered over time (${rangeFormatted}) in `} <span style={{ color: "rgb(253 241 95)", fontWeight: 'bold' }}>{regionName}</span>
                            </Typography>
                            <div style={{ width: '100%' }}>
                                <Chart regionName={regionName} range={range} name="Recovered" data={data ? data.map((d) => [d.Date, d.Recovered]) : []} />
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item md={6} sm={12} >
                        <Paper variant="elevation" elevation={3} style={{ padding: 10, backgroundColor: '#18181b', width: '100%' }}>
                            <Typography style={{ padding: 4, color: '#FFF', fontSize: 14, fontFamily: 'Roboto', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 10 }}>
                                {`Active cases over time (${rangeFormatted}) in `} <span style={{ color: "rgb(253 241 95)", fontWeight: 'bold' }}>{regionName}</span>
                            </Typography>
                            <div style={{ width: '100%' }}>
                                <Chart regionName={regionName} range={range} name="Active Cases" data={data ? data.map((d) => [d.Date, d.ActiveCases]) : []} />
                            </div>
                        </Paper>
                    </Grid>
                </Loader>
            </Grid>
        </Grid>
    </Container>
}

export default MoreData;