import { Days2Ago, YesterDay } from "../constants";
import { ICovidDaily, ICovidRegionsDailyData } from "../types";
import { fetchCountryData } from "./fetch-country";
import { isSameDay, begining, fetchUKAreaDailyData, groupeCovidDailyByAreaName } from "./utils";

export const fetchIrelandDailyData = async (date: Date = new Date()): Promise<ICovidDaily[] | null> => {
    const irl: ICovidDaily[] = [];
    const irelandData = await fetchCountryData("Ireland", isSameDay(date, YesterDay), isSameDay(date, Days2Ago), -1);
    const todayData = {
        Date: irelandData.updated,
        NewCases: irelandData.todayCases ? irelandData.todayCases : 0,
        ActiveCases: irelandData.active ? irelandData.active : 0,
        CumCases: irelandData.cases ? irelandData.cases : 0,
        CumDeaths: irelandData.deaths ? irelandData.deaths : 0,
        NewDeaths: irelandData.todayDeaths ? irelandData.todayDeaths : 0,
        Recovered: irelandData.recovered ? irelandData.recovered : 0,
        AreaType: 'nation',
        AreaName: 'Ireland',
        AreaCode: 'Ireland'
    }
    irl.push(todayData);
    irelandData.timeline.cases.forEach(([Date, CumCases], index) => {
        let CumDeaths: number | undefined = undefined;
        let Recovered: number | undefined = undefined;
        if (irelandData.timeline.deaths && irelandData.timeline.deaths.length > index) {
            CumDeaths = irelandData.timeline.deaths[index][1];
        }
        if (irelandData.timeline.recovered && irelandData.timeline.recovered.length > index) {
            Recovered = irelandData.timeline.recovered[index][1];
        }
        irl.push({
            Date,
            CumCases,
            CumDeaths,
            Recovered,
            AreaType: 'nation',
            AreaName: 'Ireland',
            AreaCode: 'Ireland'
        });
    })
    return irl.sort((a, b) => b.Date - a.Date).filter((a) => a.Date >= begining);
}

export const fetchNationDailyData = async (nationName: 'Ireland' | 'England' | 'Scotland' | 'Wales' | 'Northern Ireland'): Promise<ICovidDaily[] | null> => {
    if (nationName === "Ireland") {
        return fetchIrelandDailyData();
    }
    return fetchUKAreaDailyData('nation', nationName);
}


export const fetchAllNationsDailyData = async (): Promise<ICovidRegionsDailyData | null> => {
    const ireland = await fetchNationDailyData('Ireland');
    const uk = await fetchUKAreaDailyData('nation');
    return {
        ...groupeCovidDailyByAreaName(uk),
        "Ireland": ireland
    }
}
