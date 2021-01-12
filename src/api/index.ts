import axios from "axios";
import moment from "moment";
import { Days2Ago, DefaultDailly, YesterDay } from "../constants";
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

function isSameDay(date1: Date, date2: Date) {
    return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
}
export const fetchDailyData = async (date: Date): Promise<ICovidDailyData | null> => {
    const UK_API_URL = 'https://api.coronavirus.data.gov.uk/v1/data';
    const IRELAND_API_URL = 'https://disease.sh/v3/covid-19/countries/ireland';
    const ireland_params = {
        'strict': 'true',
    }
    if (isSameDay(date, YesterDay)) {
        ireland_params['yesterday'] = 'true';
    } else if (isSameDay(date, Days2Ago)) {
        ireland_params['twoDaysAgo'] = 'true';
    }
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
    let { data: irelandData } = await axios.get(IRELAND_API_URL, {
        params: ireland_params,
        timeout: 10000
    });
    if (!irelandData) {
        irelandData = {};
    }
    const stats = data.data;
    const mappedStats: ICovidDailyData = {
        eng: getDataByCode(stats, 'eng'),
        nir: getDataByCode(stats, 'nir'),
        sct: getDataByCode(stats, 'sct'),
        wls: getDataByCode(stats, 'wls'),
        irl: {
            Date: date.getTime(),
            NewCases: irelandData.todayCases ? irelandData.todayCases : 0,
            ActiveCases: irelandData.active ? irelandData.active : 0,
            CumCases: irelandData.cases ? irelandData.cases : 0,
            CumDeaths: irelandData.deaths ? irelandData.deaths : 0,
            NewDeaths: irelandData.todayDeaths ? irelandData.todayDeaths : 0,
            Recovered: irelandData.recovered ? irelandData.recovered : 0,
        },

    }

    return mappedStats;
}


export const fetchRegionData = async (regionName: string, date: Date = new Date()): Promise<ICovidDaily[] | null> => {
    if (regionName === "Ireland") {
        const irl: ICovidDaily[] = [];
        const irelandData = await fetchAllDataFor("Ireland", isSameDay(date, YesterDay), -1);
        const todayData = {
            Date: irelandData.updated,
            NewCases: irelandData.todayCases ? irelandData.todayCases : 0,
            ActiveCases: irelandData.active ? irelandData.active : 0,
            CumCases: irelandData.cases ? irelandData.cases : 0,
            CumDeaths: irelandData.deaths ? irelandData.deaths : 0,
            NewDeaths: irelandData.todayDeaths ? irelandData.todayDeaths : 0,
            Recovered: irelandData.recovered ? irelandData.recovered : 0,
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
            });
        })
        return irl.sort((a, b) => b.Date - a.Date).filter((a) => a.Date >= begining);
    }
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
        const ts = mo.toDate().getTime();
        result.push([ts, value])
    }
    return result.sort((a, b) => b[0] - a[0]);
}


export async function fetchAllDataFor(country: 'Ireland' | 'UK', yesterday: boolean = false, lastdays: number = 30): Promise<IAllData> {
    const params: any = {
        strict: 'true',
    }
    if (yesterday) {
        params.yesterday = 'true';
    }
    const API_URL = `https://corona.lmao.ninja/v2/countries/`;
    const HISTO_API_URL = `https://corona.lmao.ninja/v2/historical/`
    const { data: ireland } = await axios.get(API_URL + country, {
        params: { query: country, ...params },
    });
    const { data: irelandTimeline } = await axios.get(HISTO_API_URL + country, {
        params: { lastdays: lastdays },
    });
    (ireland as IAllData).timeline = {
        cases: mapHistoData(irelandTimeline?.timeline.cases),
        deaths: mapHistoData(irelandTimeline?.timeline.deaths),
        recovered: mapHistoData(irelandTimeline?.timeline.recovered),
    };
    return ireland;
}

export async function fetchAllData(yesterday: boolean = false, lastdays: number = 30): Promise<UKAndIrelandData> {
    const ireland = await fetchAllDataFor("Ireland", yesterday, lastdays);
    const uk = await fetchAllDataFor("UK", yesterday, lastdays);
    return { ireland, uk }
}