export interface ICovidDaily {
    NewCases?: number | null;
    NewDeaths?: number | null;
    CumCases?: number | null;
    CumDeaths?: number | null;
    ActiveCases?: number | null;
    Recovered?: number | null;
    Date: number;
    AreaType: string,
    AreaName: string,
    AreaCode: string,
    FemaleCases?: CasesByAge[] | null,
    MaleCases?: CasesByAge[] | null,
    CumCasesBySpecimenDateRate?: number | null,
    CumCasesBySpecimenDate?: number | null,
    NewCasesBySpecimenDate?: number | null,
    CumAdmissionsByAge?: any | null,
    NewAdmissions?: number | null,
    CumAdmissions?: number | null,
    CumTestsByPublishDate?: number | null,
    HospitalCases?: number | null,
    NewTestsByPublishDate?: number | null,
    CovidOccupiedMVBeds?: number | null,
    PlannedCapacityByPublishDate?: number | null,
    NewDeaths28DaysByPublishDate?: number | null,
    CumDeaths28DaysByPublishDate?: number | null,
    CumDeaths28DaysByPublishDateRate?: number | null,
    NewDeaths28DaysByDeathDate?: number | null,
    CumDeaths28DaysByDeathDate?: number | null,
    CumDeaths28DaysByDeathDateRate?: number | null
}
export interface CasesByAge {
    age: string;
    rate: number;
    value: number;
}
export interface ICovidRegionsDailyData {
    [regionName: string]: ICovidDaily[] | null;
}
export interface ICovidRegionsDailyDataByDate {
    [regionName: string]: ICovidDaily | null;
}

export interface ICountriesData {
    [countryName: string]: ICountryData;
}
export interface ICountryData {
    updated: number;
    cases: number;
    todayCases: number;
    deaths: number;
    todayDeaths: number;
    recovered: number;
    todayRecovered: number;
    active: number;
    critical: number;
    casesPerOneMillion: number;
    deathsPerOneMillion: number;
    tests: number;
    testsPerOneMillion: number;
    population: number;
    continent: number;
    oneCasePerPeople: number;
    oneDeathPerPeople: number;
    oneTestPerPeople: number;
    activePerOneMillion: number;
    recoveredPerOneMillion: number;
    criticalPerOneMillion: number;
    timeline: {
        cases: [number, number][];
        deaths: [number, number][];
        recovered: [number, number][];
    }
}

export interface IUKData {
    areaType: string,
    areaName: string,
    date: string,
    areaCode: string,
    newCasesByPublishDate: number | null,
    cumCasesByPublishDate: number | null,
    cumDeathsByDeathDate: number | null,
    newDeathsByDeathDate: number | null,
    cumCasesBySpecimenDateRate: number | null,
    cumCasesBySpecimenDate: number | null,
    newCasesBySpecimenDate: number | null,
    maleCases: any | null,
    femaleCases: any | null,
    newAdmissions: number | null,
    cumAdmissions: number | null,
    cumTestsByPublishDate: number | null,
    hospitalCases: number | null,
    cumAdmissionsByAge: any | null,
    newTestsByPublishDate: number | null,
    covidOccupiedMVBeds: number | null,
    plannedCapacityByPublishDate: number | null,
    newDeaths28DaysByPublishDate: number | null,
    cumDeaths28DaysByPublishDate: number | null,
    cumDeaths28DaysByPublishDateRate: number | null,
    newDeaths28DaysByDeathDate: number | null,
    cumDeaths28DaysByDeathDate: number | null,
    cumDeaths28DaysByDeathDateRate: number | null
}