import axios from "axios";
import { ICovidDaily, ICovidDailyData } from "../types";


function dateToYMD(date): string {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}
const mappedCountries = {
    'eng': 'England',
    'sct': 'Scotland',
    'irl': 'Northern Ireland',
    'nir': 'Northern Ireland',
    'wls': 'Wales'
}
function getDataByCode(data, code: 'eng' | 'sct' | 'irl' | 'nir' | 'wls'): ICovidDaily {
    for (const d of data) {
        if (d.name === mappedCountries[code]) {
            const ret: ICovidDaily = {
                NewCases: d.newCasesByPublishDate ? d.newCasesByPublishDate : 0,
                ActiveCases: d.cumCasesByPublishDate ? d.cumCasesByPublishDate : 0,
                CumCases: d.cumCasesByPublishDate ? d.cumCasesByPublishDate : 0,
                CumDeaths: d.cumDeathsByDeathDate ? d.cumDeathsByDeathDate : 0,
                NewDeaths: d.newDeathsByDeathDate ? d.newDeathsByDeathDate : 0,
                Recovered: d.newDeathsByDeathDate ? d.newDeathsByDeathDate : 0,
            }
            return ret;
        }
    }
    return {
        NewCases: 0,
        ActiveCases: 0,
        CumCases: 0,
        CumDeaths: 0,
        NewDeaths: 0,
        Recovered: 0,
    };
}


export const fetchUKDailyData = async (date: Date): Promise<ICovidDailyData | null> => {
    const UK_API_URL = 'https://api.coronavirus.data.gov.uk/v1/data';
    const filters = [
        `date=${dateToYMD(date)}`,
        `areaType=nation`
    ];
    const structure = {
        "date": "date",
        "name": "areaName",
        "code": "areaCode",
        "newCasesByPublishDate": "newCasesByPublishDate",
        "cumCasesByPublishDate": "cumCasesByPublishDate",
        "cumDeathsByDeathDate": "cumDeathsByDeathDate",
        "newDeathsByDeathDate": "newDeathsByDeathDate",
        "newAdmissions": "newAdmissions",
        "cumAdmissions": "cumAdmissions",
        "cumTestsByPublishDate": "cumTestsByPublishDate",
        "hospitalCases": "hospitalCases"
    }
    const apiParams = {
        filters: filters.join(";"),
        structure: JSON.stringify(structure),
    };

    const { data } = await axios.get(UK_API_URL, {
        params: apiParams,
        timeout: 10000
    });
    const stats = data.data;
    const mappedStats: ICovidDailyData = {
        eng: getDataByCode(stats, 'eng'),
        irl: getDataByCode(stats, 'irl'),
        nir: getDataByCode(stats, 'nir'),
        sct: getDataByCode(stats, 'sct'),
        wls: getDataByCode(stats, 'wls'),

    }

    return mappedStats;
}