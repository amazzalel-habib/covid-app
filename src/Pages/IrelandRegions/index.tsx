import { Grid } from "@material-ui/core";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLatestKnown } from "../../components/ExtraDetailsWithLatest";
import MoreDataRegion from "../../components/MoreDataRegion";
import IrelandRegionsMapCases from "../../components/IrelandRegionsMapCases";
import { IRootState } from "../../store/reducers";
import { ICovidDaily, ICovidRegionsDailyDataByDate } from "../../types";
import { fetchAllIrelandRegionsDailyDataAction } from "../../store/reducers/ie-region-data-reducer";


export default function IrelandRegions() {
    const { regionData, all, regionStatus }: { regionStatus: string, all: { [regionName: string]: ICovidDaily[] }, regionData: ICovidRegionsDailyDataByDate } = useSelector((state: IRootState) => ({
        regionData: state.ieRegionData.data,
        regionStatus: state.ieRegionData.status,
        all: state.ieRegionData.all,
    }))
    const [selectedRegion, setSelectedRegion] = useState<string>("Carlow");
    const [range, setRange] = useState<string | number>(14);
    const dispatch = useDispatch();
    useEffect(() => {
        setTimeout(() => dispatch(fetchAllIrelandRegionsDailyDataAction()), 0);
    }, [dispatch]);
    const onChangeSelect = (newSelect) => {
        if (newSelect === selectedRegion) {
            setSelectedRegion("Hackney and City of London");
        } else {
            setSelectedRegion(newSelect);
        }
    }
    const currentRegion = all[selectedRegion];
    console.log({currentRegion,regionData});
    const regionDataSplited = useMemo(() => {
        if (range === "all") {
            return currentRegion;
        }
        const r: number = Number.parseInt(`${range}`);
        return currentRegion && currentRegion.length > 0 ? currentRegion.slice(0, r) : [];

    }, [range, currentRegion]);
    return <Grid container>
        <IrelandRegionsMapCases casesRate={getLatestKnown(currentRegion, 'CumCasesBySpecimenDateRate')} deathRate={getLatestKnown(currentRegion, 'CumDeaths28DaysByDeathDateRate')} deaths={getLatestKnown(currentRegion, 'CumDeaths')} selectedRegion={selectedRegion} cases={getLatestKnown(currentRegion, 'CumCases')} status={regionStatus} onChangeSelectedRegion={onChangeSelect} data={regionData} />
        <div style={{ backgroundColor: '#1f2124', width: '100%', padding: '1rem' }}>
            <MoreDataRegion status={regionStatus} changeRange={setRange} regionName={selectedRegion} range={range} data={regionDataSplited} />
        </div>
    </Grid>
}