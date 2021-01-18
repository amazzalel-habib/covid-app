import axios from "axios";
import { ICovidDaily, ICovidRegionsDailyDataByDate } from "../types";
import { groupeCovidDailyByAreaName, groupeCovidDailyByAreaNameSingleton } from "./utils";

const IRELAND_ALL_REGIONS = 'https://services1.arcgis.com/eNO7HHeQ3rUcBllm/ArcGIS/rest/services/Covid19CountyStatisticsHPSCIreland/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=false&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=';

export const fetchAllIrelandRegionsDailyDataByDate = async (date: Date): Promise<{ all: { [areaName: string]: ICovidDaily[]; }, singletons: ICovidRegionsDailyDataByDate }> => {
    const irelandRegions = await axios.get(IRELAND_ALL_REGIONS);
    const irelandData: ICovidDaily[] = [];
    for (const d of irelandRegions?.data?.features) {
        const attributes = d?.attributes;
        irelandData.push({
            AreaCode: attributes.CountyName,
            AreaName: attributes.CountyName,
            Date: attributes.TimeStamp,
            AreaType: 'Region',
            CumCases: attributes.ConfirmedCovidCases,
            CumDeaths: attributes.ConfirmedCovidDeaths,
            Recovered: attributes.ConfirmedCovidRecovered,
            PopulationProportionCovidCases: attributes.PopulationProportionCovidCases,
        })
    }
    return {
        singletons: { ...groupeCovidDailyByAreaNameSingleton(irelandData) },
        all: { ...groupeCovidDailyByAreaName(irelandData) },
    }
}

