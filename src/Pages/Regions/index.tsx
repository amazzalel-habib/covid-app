import { ButtonGroup, Grid } from "@material-ui/core";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/CustomButton";
import MoreDataRegion from "../../components/MoreDataRegion";
import RegionsMapCases from "../../components/RegionsMapCases";
import { Days2Ago, Today, YesterDay } from "../../constants";
import { IRootState } from "../../store/reducers";
import { changeDailyDateAction } from "../../store/reducers/region-data-reduce";
import { fetchAllRegionsDailyDataAction, fetchSelectedRegionDailyDataAction } from "../../store/reducers/region-data-reduce";
import { ICovidDaily, ICovidRegionsDailyDataByDate } from "../../types";


export default function Regions() {
    const { regionData, selectedRegionData, date, regionStatus, selectedRegionStatus }: { selectedRegionStatus: string, regionStatus: string, selectedRegionData: ICovidDaily[], regionData: ICovidRegionsDailyDataByDate, date: Date } = useSelector((state: IRootState) => ({
        regionData: state.regionData.data,
        regionStatus: state.regionData.status,
        selectedRegionStatus: state.regionData.selectedRegionStatus,
        selectedRegionData: state.regionData.selectedRegionDailyData,
        date: state.regionData.date,
    }))
    const [selectedRegion, setSelectedRegion] = useState<string>("Hackney and City of London");
    const [range, setRange] = useState<string | number>(14);
    const dispatch = useDispatch();
    useEffect(() => {
        setTimeout(() => dispatch(fetchAllRegionsDailyDataAction(date)), 0);
    }, [dispatch, date]);
    const areaCode = regionData[selectedRegion]?.AreaCode || 'E09000012';
    useEffect(() => {
        setTimeout(() => dispatch(fetchSelectedRegionDailyDataAction(areaCode)), 0);
    }, [dispatch, selectedRegion, areaCode]);

    const onChangeSelect = (newSelect) => {
        if (newSelect === selectedRegion) {
            setSelectedRegion("England");
        } else {
            setSelectedRegion(newSelect);
        }
    }
    const changeDate = (newDate: Date) => {
        dispatch(changeDailyDateAction(newDate));
    }

    const regionDataSplited = useMemo(() => {
        if (range === "all") {
            return selectedRegionData;
        }
        const r: number = Number.parseInt(`${range}`);
        return selectedRegionData && selectedRegionData.length > 0 ? selectedRegionData.slice(0, r) : [];

    }, [range, selectedRegionData]);
    const dateIndex = date === Days2Ago ? 2 : (date === YesterDay ? 1 : 0)
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
        <RegionsMapCases status={regionStatus} onChangeSelectedRegion={onChangeSelect} data={regionData} />
        <div style={{ backgroundColor: '#1f2124', width: '100%', padding: '1rem' }}>
            <MoreDataRegion status={selectedRegionStatus} changeDate={changeDate} dateIndex={dateIndex} changeRange={setRange} regionName={selectedRegion} range={range} data={regionDataSplited} />
        </div>
    </Grid>
}