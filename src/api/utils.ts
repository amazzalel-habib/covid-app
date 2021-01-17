import axios from "axios";
import { IUKData, ICovidDaily } from "../types";

export const UK_API_URL = 'https://api.coronavirus.data.gov.uk/v1/data';

export const begining = Date.parse("2020-03-01");

export function dateToYMD(date): string {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}
export function isSameDay(date1: Date, date2: Date) {
    return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
}
export function mapSingleUKData(d: IUKData): ICovidDaily {
    const mapped: ICovidDaily = {
        Date: d.date ? Date.parse(d.date) : Date.now(),
        NewCases: d.newCasesByPublishDate ? d.newCasesByPublishDate : null,
        ActiveCases: d.hospitalCases ? d.hospitalCases : null,
        CumCases: d.cumCasesByPublishDate ? d.cumCasesByPublishDate : null,
        CumDeaths: d.cumDeathsByDeathDate ? d.cumDeathsByDeathDate : null,
        NewDeaths: d.newDeathsByDeathDate ? d.newDeathsByDeathDate : null,
        AreaType: d.areaType,
        AreaName: d.areaName,
        AreaCode: d.areaCode,
        MaleCases: d.maleCases,
        FemaleCases: d.femaleCases,
        CumCasesBySpecimenDateRate: d.cumCasesBySpecimenDateRate,
        CumCasesBySpecimenDate: d.cumCasesBySpecimenDate,
        NewCasesBySpecimenDate: d.newCasesBySpecimenDate,
        CumTestsByPublishDate: d.cumTestsByPublishDate,
        HospitalCases: d.hospitalCases,
        CumAdmissionsByAge: d.cumAdmissionsByAge,
        CumAdmissions:d.cumAdmissions,
        NewAdmissions:d.newAdmissions,
        NewTestsByPublishDate: d.newTestsByPublishDate,
        CovidOccupiedMVBeds: d.covidOccupiedMVBeds,
        PlannedCapacityByPublishDate: d.plannedCapacityByPublishDate,
        NewDeaths28DaysByPublishDate: d.newDeaths28DaysByPublishDate,
        CumDeaths28DaysByPublishDate: d.cumDeaths28DaysByPublishDate,
        CumDeaths28DaysByPublishDateRate: d.cumDeaths28DaysByPublishDateRate,
        NewDeaths28DaysByDeathDate: d.newDeaths28DaysByDeathDate,
        CumDeaths28DaysByDeathDate: d.cumDeaths28DaysByDeathDate,
        CumDeaths28DaysByDeathDateRate: d.cumDeaths28DaysByDeathDateRate
    }
    return mapped;
}
export function mapUKData(data: IUKData[]): ICovidDaily[] {
    let result: ICovidDaily[] = []
    for (const d of data) {
        result.push(mapSingleUKData(d));
    }
    result = result.sort((a, b) => b.Date - a.Date).filter((a) => a.Date >= begining);
    return result;
}

export const mappedCountries = {
    'eng': 'England',
    'sct': 'Scotland',
    'irl': 'Northern Ireland',
    'nir': 'Northern Ireland',
    'wls': 'Wales'
}

export const UKDataStructure = {
    "areaType": "areaType",
    "areaName": "areaName",
    "date": "date",
    "areaCode": "areaCode",
    "newCasesByPublishDate": "newCasesByPublishDate",
    "cumCasesByPublishDate": "cumCasesByPublishDate",
    "cumDeathsByDeathDate": "cumDeathsByDeathDate",
    "newDeathsByDeathDate": "newDeathsByDeathDate",
    "cumCasesBySpecimenDateRate": "cumCasesBySpecimenDateRate",
    "cumCasesBySpecimenDate": "cumCasesBySpecimenDate",
    "newCasesBySpecimenDate": "newCasesBySpecimenDate",
    "cumTestsByPublishDate": "cumTestsByPublishDate",
    "femaleCases": "femaleCases",
    "maleCases": "maleCases",
    "hospitalCases": "hospitalCases",
    "cumAdmissions": "cumAdmissions",
    "newAdmissions": "newAdmissions",
    "cumAdmissionsByAge": "cumAdmissionsByAge",
    "newTestsByPublishDate": "newTestsByPublishDate",
    "covidOccupiedMVBeds": "covidOccupiedMVBeds",
    "plannedCapacityByPublishDate": "plannedCapacityByPublishDate",
    "newDeaths28DaysByPublishDate": "newDeaths28DaysByPublishDate",
    "cumDeaths28DaysByPublishDate": "cumDeaths28DaysByPublishDate",
    "cumDeaths28DaysByPublishDateRate": "cumDeaths28DaysByPublishDateRate",
    "newDeaths28DaysByDeathDate": "newDeaths28DaysByDeathDate",
    "cumDeaths28DaysByDeathDate": "cumDeaths28DaysByDeathDate",
    "cumDeaths28DaysByDeathDateRate": "cumDeaths28DaysByDeathDateRate"
}

export const fetchUKAreaDailyData = async (areaType: string = 'nation', areaName?: string, areaCode?: string, date?: Date, latestBy?: string): Promise<ICovidDaily[] | null> => {
    const filters = [
        `areaType=${areaType}`,
    ];
    if (areaName) {
        filters.push(`areaName=${areaName}`);
    }
    if (areaCode) {
        filters.push(`areaCode=${areaCode}`);
    }
    if (date) {
        filters.push(`date=${dateToYMD(date)}`);
    }
    const apiParams: any = {
        filters: filters.join(";"),
        structure: JSON.stringify(UKDataStructure),
    };
    if(latestBy){
        apiParams['latestBy']= latestBy;
    }
    let { data } = await axios.get(UK_API_URL, {
        params: apiParams,
        timeout: 10000
    });
    return mapUKData(data.data);
}

export function groupeCovidDailyByAreaName(list: ICovidDaily[] | null): { [areaName: string]: ICovidDaily[] } {
    const data: { [areaName: string]: ICovidDaily[] } = {};
    list?.forEach((d) => {
        if (!data[d.AreaName]) {
            data[d.AreaName] = [];
        }
        data[d.AreaName].push(d);
    })
    return data;
}

export function groupeCovidDailyByAreaNameSingleton(list: ICovidDaily[] | null): { [areaName: string]: ICovidDaily } {
    const data: { [areaName: string]: ICovidDaily } = {};
    list?.forEach((d) => {
        if (!data[d.AreaName]) {
            data[d.AreaName] = d;
        }
    })
    return data;
}