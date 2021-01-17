import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { ICovidDaily } from '../../types';

const useStyles = makeStyles({
    label1: {
        color: "#DDD",
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 16
    },
    value1: {
        color: "#ffed07",
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    label: {
        color: "#DDD",
        fontSize: 12,
        fontWeight: 'bold'
    },
    value: {
        color: "#ffed07",
        fontSize: 12,
    },
    tableRow: {
        borderBottom: '1px solid #444',
        marginTop: 5,
        marginBottom: 5,
    }
});
export function getLatestKnown(data: ICovidDaily[] | null, prop: string): string {
    if (!data) {
        return '#';
    }
    for (const d of data) {
        if (!d[prop]) {
            continue;
        }
        return `${d[prop]}`;
    }
    return '#';
}

interface IExtraDetailsProps {
    data: ICovidDaily[] | null;
}
const ExtraDetailsWithLatest = ({ data }: IExtraDetailsProps) => {
    const classes = useStyles();
    return <Grid item xs={12} container alignContent='center' justify='space-between' style={{ marginBottom: 20 }}>
        <Grid item md={4} sm={6} xs={12} style={{ borderRight: '1px solid #555' }}>
            <div className={classes.label1}>Total cases</div>
            <div className={classes.value1}>{getLatestKnown(data, 'CumCases')}</div>
        </Grid>
        <Grid item md={4} sm={6} xs={12} style={{ borderRight: '1px solid #555' }}>
            <div className={classes.label1}>Hospital Cases</div>
            <div className={classes.value1}>{getLatestKnown(data, 'ActiveCases')}</div>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
            <div className={classes.label1}>Deaths</div>
            <div className={classes.value1}>{getLatestKnown(data, 'CumDeaths')}</div>
        </Grid>
        <Grid item container xs={12} spacing={2} style={{ marginTop: 30 }}>
            <Grid item container xs={12} className={classes.tableRow}>
                <Grid item xs={8} className={classes.label}>COVID-19 occupied beds with mechanical ventilators:</Grid>
                <Grid item xs={4} className={classes.value}>{getLatestKnown(data, 'CovidOccupiedMVBeds')}</Grid>
            </Grid>
            <Grid item container xs={12} className={classes.tableRow}>
                <Grid item xs={8} className={classes.label}>New cases by specimen date:</Grid>
                <Grid item xs={4} className={classes.value}>{getLatestKnown(data, 'NewCasesBySpecimenDate')}</Grid>
            </Grid>
            <Grid item container xs={12} className={classes.tableRow}>
                <Grid item xs={8} className={classes.label}>New cases by specimen date:</Grid>
                <Grid item xs={4} className={classes.value}>{getLatestKnown(data, 'NewCasesBySpecimenDate')}</Grid>
            </Grid>
            <Grid item container xs={12} className={classes.tableRow}>
                <Grid item xs={8} className={classes.label}>Rate of cumulative cases by specimen date per 100k resident population:</Grid>
                <Grid item xs={4} className={classes.value}>{getLatestKnown(data, 'CumCasesBySpecimenDateRate')}%</Grid>
            </Grid>
            <Grid item container xs={12} className={classes.tableRow}>
                <Grid item xs={8} className={classes.label}>Cumulative cases by specimen date:</Grid>
                <Grid item xs={4} className={classes.value}>{getLatestKnown(data, 'CumCasesBySpecimenDate')}</Grid>
            </Grid>
            <Grid item container xs={12} className={classes.tableRow}>
                <Grid item xs={8} className={classes.label}>Cumulative deaths within 28 days of positive test:</Grid>
                <Grid item xs={4} className={classes.value}>{getLatestKnown(data, 'CumDeaths28DaysByPublishDate')}</Grid>
            </Grid>
            <Grid item container xs={12} className={classes.tableRow}>
                <Grid item xs={8} className={classes.label}>Rate of cumulative deaths within 28 days of positive test per 100k resident population:</Grid>
                <Grid item xs={4} className={classes.value}>{getLatestKnown(data, 'CumDeaths28DaysByPublishDateRate')}%</Grid>
            </Grid>
            <Grid item container xs={12} className={classes.tableRow}>
                <Grid item xs={8} className={classes.label}>Deaths within 28 days of positive test by death date:</Grid>
                <Grid item xs={4} className={classes.value}>{getLatestKnown(data, 'NewDeaths28DaysByDeathDate')}</Grid>
            </Grid>
            <Grid item container xs={12} className={classes.tableRow}>
                <Grid item xs={8} className={classes.label}>Rate of cumulative deaths within 28 days of positive test by death date per 100k resident population:</Grid>
                <Grid item xs={4} className={classes.value}>{getLatestKnown(data, 'CumDeaths28DaysByDeathDateRate')}%</Grid>
            </Grid>
            <Grid item container xs={12} className={classes.tableRow}>
                <Grid item xs={8} className={classes.label}>Number of tests :</Grid>
                <Grid item xs={4} className={classes.value}>{getLatestKnown(data, 'CumTestsByPublishDate')}</Grid>
            </Grid>
            <Grid item container xs={12} className={classes.tableRow}>
                <Grid item xs={8} className={classes.label}>New tests :</Grid>
                <Grid item xs={4} className={classes.value}>{getLatestKnown(data, 'NewTestsByPublishDate')}</Grid>
            </Grid>
        </Grid>
    </Grid>
}

export default ExtraDetailsWithLatest;