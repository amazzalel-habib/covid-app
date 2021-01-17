import { ICovidDaily, ICovidRegionsDailyDataByDate } from "../types";
import { fetchIrelandDailyData } from "./fetch-nation";
import { fetchUKAreaDailyData, groupeCovidDailyByAreaNameSingleton } from "./utils";

export const fetchRegionDailyData = async (regionName: string): Promise<ICovidDaily[] | null> => {
    if (regionName === "Ireland") {
        return fetchIrelandDailyData();
    }
    return fetchUKAreaDailyData('utla', regionName);
}

export const fetchAllRegionsDailyDataByDate = async (date: Date): Promise<ICovidRegionsDailyDataByDate | null> => {
    const ukRegions = await fetchUKAreaDailyData('utla', undefined, undefined, date);
    return {
        ...groupeCovidDailyByAreaNameSingleton(ukRegions),
        // "Ireland": ir || null
    }
}



export const fetchRegionDailyDataByAreaCode = async (areaCode: string): Promise<ICovidDaily[] | null> => {
    /*if (areaCode === "ireland") {
        const ireland = await fetchIrelandDailyData();
        return ireland;
    }*/
    const ukRegions = await fetchUKAreaDailyData('utla', undefined, areaCode, undefined);
    return ukRegions;
}


