import { fetchAllRegionsDailyDataByDate, fetchRegionDailyDataByAreaCode } from "../../api/fetch-region";
import { Today } from "../../constants";
import { ICovidDaily, ICovidRegionsDailyDataByDate } from "../../types";
import { FAILURE, REQUEST, SUCCESS } from "./action-type.util";

export const ACTION_TYPES = {
    FetchAllRegionsData: 'RegionData/FetchAllRegionsData',
    FetchSelectedRegionDailyData: 'RegionData/FetchSelectedRegionDailyData',
    ChangeDate: 'RegionData/ChangeDate',
};

const initialState = {
    data: {},
    selectedRegionDailyData: [],
    selectedRegionStatus: "loading",
    date: Today,
    status: "loading"
};

export type RegionDataState = Readonly<typeof initialState>;

const reducer = (state: RegionDataState = initialState, action: any): RegionDataState => {
    switch (action.type) {
        case SUCCESS(ACTION_TYPES.FetchAllRegionsData): {
            const { data } = action.payload;
            return {
                ...state,
                data: data,
                status: "success"
            };
        }
        case REQUEST(ACTION_TYPES.FetchAllRegionsData): {
            return {
                ...state,
                status: "loading"
            }
        }
        case SUCCESS(ACTION_TYPES.FetchSelectedRegionDailyData): {
            const { data } = action.payload;
            return {
                ...state,
                selectedRegionDailyData: data,
                selectedRegionStatus: "success"
            };
        }
        case REQUEST(ACTION_TYPES.FetchSelectedRegionDailyData): {
            return {
                ...state,
                selectedRegionStatus: "loading"
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


export const fetchAllRegionsDailyDataAction = (date: Date = new Date()) => async (dispatch: any, getState: any) => {
    dispatch({
        type: REQUEST(ACTION_TYPES.FetchAllRegionsData),
    });
    try {
        const data: ICovidRegionsDailyDataByDate | null = await fetchAllRegionsDailyDataByDate(date);
        dispatch({
            type: SUCCESS(ACTION_TYPES.FetchAllRegionsData),
            payload: { data },
        })
    } catch {
        dispatch({
            type: FAILURE(ACTION_TYPES.FetchAllRegionsData),
        })
    }
};

export const fetchSelectedRegionDailyDataAction = (areaCode: string) => async (dispatch: any, getState: any) => {
    dispatch({
        type: REQUEST(ACTION_TYPES.FetchSelectedRegionDailyData),
    });
    try {
        const data: ICovidDaily[] | null = await fetchRegionDailyDataByAreaCode(areaCode);
        dispatch({
            type: SUCCESS(ACTION_TYPES.FetchSelectedRegionDailyData),
            payload: { data },
        })
    } catch {
        dispatch({
            type: FAILURE(ACTION_TYPES.FetchSelectedRegionDailyData),
        })
    }
};

export const changeDailyDateAction = (newDate: Date) => ({
    type: ACTION_TYPES.ChangeDate,
    payload: { date: newDate },
})
