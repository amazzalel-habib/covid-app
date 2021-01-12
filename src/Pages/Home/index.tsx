import { ButtonGroup, Grid } from "@material-ui/core";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/CustomButton";
import MapCases from "../../components/MapCases";
import MoreData from "../../components/MoreData";
import { Days2Ago, Today, YesterDay } from "../../constants";
import { IRootState } from "../../store/reducers";
import { fetchAllDataAction } from "../../store/reducers/all-data-reduce";
import { changeDailyDate, fetchDailyDataAction } from "../../store/reducers/daily-cases-data-reducer";
import { fetchDailyDataForRegionAction } from "../../store/reducers/data-region-reduce";


export default function Home() {
    const { data, date, regionData, ireland, uk }: any = useSelector((state: IRootState) => ({
        data: state.dailydata.data,
        date: state.dailydata.date,
        status: state.dailydata.status,
        regionData: state.regionDailyData.data,
        ireland: state.UKAndIrelandData.ireland,
        uk: state.UKAndIrelandData.uk,
    }))
    const [selectedRegion, setSelectedRegion] = useState<string>("England");
    const [range, setRange] = useState<string | number>(14);
    const onChangeSelect = (newSelect) => {
        if (newSelect === selectedRegion) {
            setSelectedRegion("England");
        } else {
            setSelectedRegion(newSelect);
        }
    }
    const changeDate = (newDate: Date) => {
        dispatch(changeDailyDate(newDate));
    }
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchDailyDataAction(date))
    }, [dispatch, date]);
    useEffect(() => {
        dispatch(fetchDailyDataForRegionAction(selectedRegion));
    }, [dispatch, selectedRegion]);
    useEffect(() => {
        dispatch(fetchAllDataAction(true));
    }, [dispatch]);
    const regionDataSplited = useMemo(() => {
        if (range === "all") {
            return regionData;
        }
        return regionData && regionData.length > 0 ? regionData.slice(0, range) : [];

    }, [range, regionData]);
    return <Grid container>
        <div style={{ position: 'absolute', zIndex: 1, padding: 4, color: "#ccc", margin: 8 }} >
            <ButtonGroup color="inherit" variant="text" size="small">
                <CustomButton disabled={date === Days2Ago} color="inherit" onClick={() => changeDate(Days2Ago)} size="small">
                    {"Last 2 days"}
                </CustomButton>
                <CustomButton disabled={date === YesterDay} color="inherit" onClick={() => changeDate(YesterDay)} size="small">
                    {"Yesterday"}
                </CustomButton>
                <CustomButton disabled={date === Today} color="inherit" onClick={() => changeDate(Today)} size="small">
                    {"Today"}
                </CustomButton>
            </ButtonGroup>
        </div>
        <MapCases onChangeSelectedRegion={onChangeSelect} data={data} />
        <div style={{ backgroundColor: '#1f2124', width: '100%', padding: '1rem' }}>
            <MoreData irelandData={ireland} ukData={uk} changeRange={setRange} regionName={selectedRegion} range={range} data={regionDataSplited} />
        </div>
    </Grid>
}