import { fetchAllIrelandRegionsDailyDataByDate } from "../../api/fetch-ireland-region";
import { ICovidRegionsDailyDataByDate } from "../../types";
import { FAILURE, REQUEST, SUCCESS } from "./action-type.util";

export const ACTION_TYPES = {
    FetchAllRegionsData: 'IrelandRegionData/FetchAllRegionsData',
    FetchSelectedRegionDailyData: 'IrelandRegionData/FetchSelectedRegionDailyData',
};

const initialState = {
    data: {},
    all: {},
    status: "loading"
};

export type IrelandRegionDataState = Readonly<typeof initialState>;

const reducer = (state: IrelandRegionDataState = initialState, action: any): IrelandRegionDataState => {
    switch (action.type) {
        case SUCCESS(ACTION_TYPES.FetchAllRegionsData): {
            const { all, singletons } = action.payload;
            return {
                ...state,
                data: singletons,
                all,
                status: "success"
            };
        }
        case REQUEST(ACTION_TYPES.FetchAllRegionsData): {
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


export const fetchAllIrelandRegionsDailyDataAction = (date: Date = new Date()) => async (dispatch: any, getState: any) => {
    dispatch({
        type: REQUEST(ACTION_TYPES.FetchAllRegionsData),
    });
    try {
        const { all, singletons }: { all: any, singletons: ICovidRegionsDailyDataByDate } = await fetchAllIrelandRegionsDailyDataByDate(date);
        dispatch({
            type: SUCCESS(ACTION_TYPES.FetchAllRegionsData),
            payload: { all, singletons },
        })
    } catch {
        dispatch({
            type: FAILURE(ACTION_TYPES.FetchAllRegionsData),
        })
    }
};
