import { Grid } from "@material-ui/core";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLatestKnown } from "../../components/ExtraDetailsWithLatest";
import MoreDataRegion from "../../components/MoreDataRegion";
import RegionsMapCases from "../../components/RegionsMapCases";
import { Days2Ago } from "../../constants";
import { IRootState } from "../../store/reducers";
import { fetchAllRegionsDailyDataAction, fetchSelectedRegionDailyDataAction } from "../../store/reducers/region-data-reduce";
import { ICovidDaily, ICovidRegionsDailyDataByDate } from "../../types";


export default function Regions() {
    const { regionData, selectedRegionData, regionStatus, selectedRegionStatus }: { selectedRegionStatus: string, regionStatus: string, selectedRegionData: ICovidDaily[], regionData: ICovidRegionsDailyDataByDate } = useSelector((state: IRootState) => ({
        regionData: state.regionData.data,
        regionStatus: state.regionData.status,
        selectedRegionStatus: state.regionData.selectedRegionStatus,
        selectedRegionData: state.regionData.selectedRegionDailyData,
    }))
    const [selectedRegion, setSelectedRegion] = useState<string>("Hackney and City of London");
    const [range, setRange] = useState<string | number>(14);
    const dispatch = useDispatch();
    useEffect(() => {
        setTimeout(() => dispatch(fetchAllRegionsDailyDataAction(Days2Ago)), 0);
    }, [dispatch]);
    const areaCode = regionData[selectedRegion]?.AreaCode || 'E09000012';
    useEffect(() => {
        setTimeout(() => dispatch(fetchSelectedRegionDailyDataAction(areaCode)), 0);
    }, [dispatch, selectedRegion, areaCode]);

    const onChangeSelect = (newSelect) => {
        if (newSelect === selectedRegion) {
            setSelectedRegion("Hackney and City of London");
        } else {
            setSelectedRegion(newSelect);
        }
    }
    const [mapData, setMapData] = useState<any>(null);
    useEffect(() => {
        (async function () {
            const mapD = await import('../../utla-geojson.json');
            setMapData(mapD.default);
        })();
    }, []);

    const regionDataSplited = useMemo(() => {
        if (range === "all") {
            return selectedRegionData;
        }
        const r: number = Number.parseInt(`${range}`);
        return selectedRegionData && selectedRegionData.length > 0 ? selectedRegionData.slice(0, r) : [];

    }, [range, selectedRegionData]);
    return <Grid container>
        <RegionsMapCases casesRate={getLatestKnown(selectedRegionData, 'CumCasesBySpecimenDateRate')} deathRate={getLatestKnown(selectedRegionData, 'CumDeaths28DaysByDeathDateRate')} deaths={getLatestKnown(selectedRegionData, 'CumDeaths')} selectedRegion={selectedRegion} cases={getLatestKnown(selectedRegionData, 'CumCases')} mapData={mapData} status={regionStatus} onChangeSelectedRegion={onChangeSelect} data={regionData} selectedRegionStatus={selectedRegionStatus} />
        <div style={{ backgroundColor: '#1f2124', width: '100%', padding: '1rem' }}>
            <MoreDataRegion status={selectedRegionStatus} changeRange={setRange} regionName={selectedRegion} range={range} data={regionDataSplited} />
        </div>
    </Grid>
}