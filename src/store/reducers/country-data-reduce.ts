import { fetchCountriesData } from "../../api/fetch-country";
import { ICountriesData } from "../../types";
import { FAILURE, REQUEST, SUCCESS } from "./action-type.util";

export const ACTION_TYPES = {
    FetchCountryData: 'CountryData/FetchCountryData',
};

const initialState = {
    data: {},
    status: "loading"
};

export type CountryDataState = Readonly<typeof initialState>;

const reducer = (state: CountryDataState = initialState, action: any): CountryDataState => {
    switch (action.type) {
        case SUCCESS(ACTION_TYPES.FetchCountryData): {
            const { data } = action.payload;
            return {
                ...state,
                data: data,
                status: "success"
            };
        }
        case REQUEST(ACTION_TYPES.FetchCountryData): {
            return {
                ...state,
                status: "loading"
            }
        }
        default:
            return state;
    }
}
export default reducer;


export const fetchCoubtriesDataAction = (yesterday: boolean = false, twoDaysAgo: boolean = false, lastDays = -1) => async (dispatch: any, getState: any) => {
    dispatch({
        type: REQUEST(ACTION_TYPES.FetchCountryData),
    });
    try {
        const data: ICountriesData = await fetchCountriesData(yesterday, twoDaysAgo, lastDays);
        dispatch({
            type: SUCCESS(ACTION_TYPES.FetchCountryData),
            payload: { data },
        })
    } catch {
        dispatch({
            type: FAILURE(ACTION_TYPES.FetchCountryData),
        })
    }
};
