import { ICovidDaily } from "./types";

export const YesterDay = new Date();
YesterDay.setDate(YesterDay.getDate() - 1);

export const Days2Ago = new Date();
Days2Ago.setDate(Days2Ago.getDate() - 2);

export const Today = new Date();

export const DefaultDailly: ICovidDaily = {
    Date: Date.now(),
    NewCases: 0,
    ActiveCases: 0,
    CumCases: 0,
    CumDeaths: 0,
    NewDeaths: 0,
    Recovered: 0,
    AreaCode: '',
    AreaName: '',
    AreaType: '',
}