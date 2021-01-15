import axios from "axios";
import moment from "moment";
import { ICountryData, ICountriesData } from "../types";

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



export async function fetchCountryData(country: 'Ireland' | 'UK', yesterday: boolean = false, twoDaysAgo: boolean = false, lastdays: number = -1): Promise<ICountryData> {
    const params: any = {
        strict: 'true',
    }
    if (yesterday) {
        params.yesterday = 'true';
    }
    if (twoDaysAgo) {
        params.twoDaysAgo = 'true';
    }
    const API_URL = `https://corona.lmao.ninja/v2/countries/`;
    const HISTO_API_URL = `https://corona.lmao.ninja/v2/historical/`
    const { data } = await axios.get(API_URL + country, {
        params: { query: country, ...params },
    });
    const { data: timeline } = await axios.get(HISTO_API_URL + country, {
        params: { lastdays: lastdays },
    });
    (data as ICountryData).timeline = {
        cases: mapHistoData(timeline?.timeline.cases),
        deaths: mapHistoData(timeline?.timeline.deaths),
        recovered: mapHistoData(timeline?.timeline.recovered),
    };
    return data;
}

export async function fetchCountriesData(yesterday: boolean = false, twoDaysAgo: boolean = false, lastdays: number = -1): Promise<ICountriesData> {
    const ireland = await fetchCountryData("Ireland", yesterday, twoDaysAgo, lastdays);
    const uk = await fetchCountryData("UK", yesterday, twoDaysAgo, lastdays);
    return { ireland, uk }
}