export interface ICovidDaily {
    NewCases: number;
    NewDeaths?: number;
    CumCases?: number;
    CumDeaths?: number;
    ActiveCases?: number;
    Recovered?: number;
    Date?: number;
}


export interface ICovidDailyData {
    eng: ICovidDaily;
    wls: ICovidDaily;
    sct: ICovidDaily;
    nir: ICovidDaily;
    irl: ICovidDaily;
}
