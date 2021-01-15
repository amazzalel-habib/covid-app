import { fetchAllNationsDailyData } from "../../api/fetch-nation";
import { YesterDay } from "../../constants";
import { ICovidRegionsDailyData } from "../../types";
import { FAILURE, REQUEST, SUCCESS } from "./action-type.util";

export const ACTION_TYPES = {
    FetchAllNationDailyData: 'NationData/FetchAllNationDailyData',
    ChangeDate: 'NationData/ChangeDate',
};

const initialState = {
    data: {},
    date: YesterDay,
    status: "loading"
};

export type NationDataState = Readonly<typeof initialState>;

const reducer = (state: NationDataState = initialState, action: any): NationDataState => {
    switch (action.type) {
        case SUCCESS(ACTION_TYPES.FetchAllNationDailyData): {
            const { data } = action.payload;
            return {
                ...state,
                data: data,
                status: "success"
            };
        }
        case REQUEST(ACTION_TYPES.FetchAllNationDailyData): {
            return {
                ...state,
                status: "loading"
            }
        }
        case ACTION_TYPES.ChangeDate: {
            const { date } = action.payload;
            return {
                ...state,
                date: date
            }
        }
        default:
            return state;
    }
}
export default reducer;


export const fetchNationsDailyDataAction = () => async (dispatch: any, getState: any) => {
    dispatch({
        type: REQUEST(ACTION_TYPES.FetchAllNationDailyData),
    });
    try {
        const data: ICovidRegionsDailyData | null = await fetchAllNationsDailyData();
        dispatch({
            type: SUCCESS(ACTION_TYPES.FetchAllNationDailyData),
            payload: { data },
        })
    } catch {
        dispatch({
            type: FAILURE(ACTION_TYPES.FetchAllNationDailyData),
        })
    }
};

export const changeDailyDateAction = (newDate: Date) => ({
    type: ACTION_TYPES.ChangeDate,
    payload: { date: newDate },
})
