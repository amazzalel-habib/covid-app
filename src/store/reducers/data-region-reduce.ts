import { fetchRegionData } from "../../api";
import { FAILURE, REQUEST, SUCCESS } from "./action-type.util";

export const ACTION_TYPES = {
    FetchDailyData: 'RegionDailyCases/FetchDailyData',
};

const initialState = {
    data: [],
    status: "loading"
};

export type DailyDataForRegionState = Readonly<typeof initialState>;

const reducer = (state: DailyDataForRegionState = initialState, action: any): DailyDataForRegionState => {
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
        default:
            return state;
    }
}
export default reducer;


export const fetchDailyDataForRegionAction = (region: string, date?: Date) => async (dispatch: any, getState: any) => {
    dispatch({
        type: REQUEST(ACTION_TYPES.FetchDailyData),
    });
    try {
        const data = await fetchRegionData(region, date);
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
