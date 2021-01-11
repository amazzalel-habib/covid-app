import axios from "axios";
import moment from "moment";
import { DefaultDailly } from "../constants";
import { IAllData, ICovidDaily, ICovidDailyData, UKAndIrelandData } from "../types";

const begining = Date.parse("2020-03-01");

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
                Date: d.date ? Date.parse(d.date) : Date.now(),
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
    return DefaultDailly;
}

function getAllData(data): ICovidDaily[] {
    let result: ICovidDaily[] = []
    for (const d of data) {
        const data: ICovidDaily = {
            Date: d.date ? Date.parse(d.date) : Date.now(),
            NewCases: d.newCasesByPublishDate ? d.newCasesByPublishDate : null,
            ActiveCases: d.cumCasesByPublishDate ? d.cumCasesByPublishDate : null,
            CumCases: d.cumCasesByPublishDate ? d.cumCasesByPublishDate : null,
            CumDeaths: d.cumDeathsByDeathDate ? d.cumDeathsByDeathDate : null,
            NewDeaths: d.newDeathsByDeathDate ? d.newDeathsByDeathDate : null,
            Recovered: d.newDeathsByDeathDate ? d.newDeathsByDeathDate : null,
        }
        result.push(data);
    }
    result = result.sort((a, b) => b.Date - a.Date).filter((a) => a.Date >= begining);
    return result;
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


export const fetchRegionData = async (regionName: string, date?: Date): Promise<ICovidDaily[] | null> => {
    const UK_API_URL = 'https://api.coronavirus.data.gov.uk/v1/data';
    const filters = [
        `areaType=nation`,
        `areaName=${regionName}`,

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

    return getAllData(data.data);
}

function mapHistoData(data: { [date: string]: number }): [number, number][] {
    const result: [number, number][] = [];
    if (!data) {
        return result;
    }
    for (const [key, value] of Object.entries(data)) {
        const mo = moment(key, "M/D/YY", true)
        //console.log({orig: key, newD: mo.format("MM/DD/YYYY")})
        const ts = mo.toDate().getTime();
        result.push([ts, value])
    }
    return result.sort((a, b) => b[0] - a[0]);
}
export async function fetchAllData(yesterday: boolean = false, lastdays: number = 30): Promise<UKAndIrelandData> {
    const params: any = {
        strict: 'true',
    }
    if (yesterday) {
        params.yesterday = 'true';
    }
    const API_URL = `https://corona.lmao.ninja/v2/countries/`;
    const HISTO_API_URL = `https://corona.lmao.ninja/v2/historical/`
    const { data: uk } = await axios.get(API_URL + 'UK', {
        params: { query: 'UK', ...params },
    });
    const { data: ukTimeline } = await axios.get(HISTO_API_URL + 'UK', {
        params: { lastdays: lastdays },
    });
    const { data: ireland } = await axios.get(API_URL + 'Ireland', {
        params: { query: 'Ireland', ...params },
    });
    const { data: irelandTimeline } = await axios.get(HISTO_API_URL + 'Ireland', {
        params: { lastdays: lastdays },
    });
    (uk as IAllData).timeline = {
        cases: mapHistoData(ukTimeline?.timeline.cases),
        deaths: mapHistoData(ukTimeline?.timeline.deaths),
        recovered: mapHistoData(ukTimeline?.timeline.recovered),
    };
    (ireland as IAllData).timeline = {
        cases: mapHistoData(irelandTimeline?.timeline.cases),
        deaths: mapHistoData(irelandTimeline?.timeline.deaths),
        recovered: mapHistoData(irelandTimeline?.timeline.recovered),
    };
    return {
        ireland, uk
    }
}