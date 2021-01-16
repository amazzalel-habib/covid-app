import { ButtonGroup, Container, Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { Days2Ago, DefaultDailly, Today, YesterDay } from '../../constants';
import { ICovidDaily } from '../../types';
import CustomButton from '../CustomButton';
import ExtraDetails from '../ExtraDetails';
import Loader from '../loader';
import Chart from './Chart';


const Sep = () => {
    return <div style={{ width: '100%', padding: '10px 0px 10px 0px', borderTop: "1px solid #444" }}></div>
}
interface IMoreDataProps {
    regionName: string;
    data: ICovidDaily[] | null;
    changeRange: any;
    range: number | string;
    dateIndex: number;
    changeDate: any;
    status: string;
}
const dateLabels = [
    "Today",
    "Yesterday",
    "2 days ago"
];
const MoreDataRegion = ({ regionName, data, changeRange, range, dateIndex, changeDate, status }: IMoreDataProps) => {
    const latest: ICovidDaily = data && data.length > dateIndex ? data[dateIndex] : DefaultDailly;
    const rangeFormatted = range === "all" ? 'all time' : '14 days';
    const dateFormatted = dateLabels[dateIndex];
    return <Container>
        <Grid container>
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
                <Loader status={status} >
                    <ExtraDetails data={latest} />
                </Loader>
            </Grid>
            <Grid container justify='center' alignContent='center' alignItems='center' spacing={4}>
                <Grid item xs={12} style={{ marginTop: 30 }}>
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
                <Loader status={status} >
                    <Grid item md={6} sm={12}>
                        <Paper variant="elevation" elevation={3} style={{ padding: 10, backgroundColor: '#18181b' }}>
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
                        <Paper variant="elevation" elevation={3} style={{ padding: 10, backgroundColor: '#18181b' }}>
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
                        <Paper variant="elevation" elevation={3} style={{ padding: 10, backgroundColor: '#18181b' }}>
                            <Typography style={{ padding: 4, color: '#FFF', fontSize: 14, fontFamily: 'Roboto', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 10 }}>
                                {`Recovered over time (${rangeFormatted}) in `} <span style={{ color: "rgb(253 241 95)", fontWeight: 'bold' }}>{regionName}</span>
                            </Typography>
                            <div style={{ width: '100%' }}>
                                <Chart regionName={regionName} range={range} name="Recovered" data={data ? data.map((d) => [d.Date, d.Recovered]) : []} />
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item md={6} sm={12} >
                        <Paper variant="elevation" elevation={3} style={{ padding: 10, backgroundColor: '#18181b' }}>
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

export default MoreDataRegion;