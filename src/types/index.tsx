export interface ICovidDaily {
    NewCases: number;
    NewDeaths?: number;
    CumCases?: number;
    CumDeaths?: number;
    ActiveCases?: number;
    Recovered?: number;
    Date: number;
}


export interface ICovidDailyData {
    eng: ICovidDaily;
    wls: ICovidDaily;
    sct: ICovidDaily;
    nir: ICovidDaily;
    irl: ICovidDaily;
}

export interface UKAndIrelandData {
    ireland: IAllData;
    uk: IAllData;
}
export interface IAllData {
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