import { ButtonGroup, Grid } from "@material-ui/core";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/CustomButton";
import MapCases from "../../components/MapCases";
import MoreData from "../../components/MoreData";
import { Days2Ago, Today, YesterDay } from "../../constants";
import { IRootState } from "../../store/reducers";
import { fetchCoubtriesDataAction } from "../../store/reducers/country-data-reduce";
import { changeDailyDateAction, fetchNationsDailyDataAction } from "../../store/reducers/nation-data-reducer";
import { ICountryData, ICovidRegionsDailyData } from "../../types";


export default function Home() {
    const { nationData, ireland, uk, date, countryStatus, nationStatus }: { nationData: ICovidRegionsDailyData, ireland: ICountryData, uk: ICountryData, date: Date, countryStatus: string, nationStatus: string } = useSelector((state: IRootState) => ({
        nationData: state.nationData.data,
        countryStatus: state.countryData.status,
        nationStatus: state.nationData.status,
        date: state.nationData.date,
        ireland: state.countryData?.data["ireland"],
        uk: state.countryData?.data["uk"],
    }))
    const [selectedNation, setSelectedNation] = useState<string>("England");
    const [range, setRange] = useState<string | number>(14);
    const onChangeSelect = (newSelect) => {
        if (newSelect === selectedNation) {
            setSelectedNation("England");
        } else {
            setSelectedNation(newSelect);
        }
    }
    const changeDate = (newDate: Date) => {
        dispatch(changeDailyDateAction(newDate));
    }
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCoubtriesDataAction());
        dispatch(fetchNationsDailyDataAction());
    }, [dispatch]);
    const selectedNationData = nationData[selectedNation];
    const nationDataSplited = useMemo(() => {
        if (range === "all") {
            return selectedNationData;
        }
        const r: number = Number.parseInt(`${range}`);
        return selectedNationData && selectedNationData.length > 0 ? selectedNationData.slice(0, r) : [];

    }, [range, selectedNationData]);
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
        <MapCases status={nationStatus} dateIndex={dateIndex} onChangeSelectedRegion={onChangeSelect} data={nationData} />
        <div style={{ backgroundColor: '#1f2124', width: '100%', padding: '1rem' }}>
            <MoreData countryStatus={countryStatus} nationStatus={nationStatus} changeDate={changeDate} irelandData={ireland} dateIndex={dateIndex} ukData={uk} changeRange={setRange} regionName={selectedNation} range={range} data={nationDataSplited} />
        </div>
    </Grid>
}