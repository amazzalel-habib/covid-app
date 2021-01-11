import { fetchUKDailyData } from "../../api";
import { YesterDay } from "../../constants";
import { FAILURE, REQUEST, SUCCESS } from "./action-type.util";

export const ACTION_TYPES = {
    FetchDailyData: 'DailyCases/FetchDailyData',
    ChangeDate: 'DailyCases/ChangeDate',
};

const initialState = {
    data: null,
    date: YesterDay,
    status: "loading"
};

export type DailyDataState = Readonly<typeof initialState>;

const reducer = (state: DailyDataState = initialState, action: any): DailyDataState => {
    switch (action.type) {
        case SUCCESS(ACTION_TYPES.FetchDailyData): {
            const { data } = action.payload;
            return {
                ...state,
                data: data,
                status: "success"
            };
        }
        case REQUEST(ACTION_TYPES.FetchDailyData): {
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


export const fetchDailyDataAction = (date: Date) => async (dispatch: any, getState: any) => {
    dispatch({
        type: REQUEST(ACTION_TYPES.FetchDailyData),
    });
    try {
        const data = await fetchUKDailyData(date);
        dispatch({
            type: SUCCESS(ACTION_TYPES.FetchDailyData),
            payload: { data: data },
        })
    } catch {
        dispatch({
            type: FAILURE(ACTION_TYPES.FetchDailyData),
        })
    }
};

export const changeDailyDate = (newDate: Date) => ({
    type: ACTION_TYPES.ChangeDate,
    payload: { date: newDate },
})
