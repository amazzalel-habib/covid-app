import { fetchAllData } from "../../api";
import { UKAndIrelandData } from "../../types";
import { FAILURE, REQUEST, SUCCESS } from "./action-type.util";

export const ACTION_TYPES = {
    FetchUKandIrelandOverviewData: 'AllData/FetchAll',
};

const initialState = {
    ireland: {},
    uk: {},
    status: "loading"
};

export type AllDataState = Readonly<typeof initialState>;

const reducer = (state: AllDataState = initialState, action: any): AllDataState => {
    switch (action.type) {
        case SUCCESS(ACTION_TYPES.FetchUKandIrelandOverviewData): {
            const { ireland, uk } = action.payload;
            return {
                ...state,
                uk: uk,
                ireland: ireland,
                status: "success"
            };
        }
        case REQUEST(ACTION_TYPES.FetchUKandIrelandOverviewData): {
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


export const fetchAllDataAction = (yesterday: boolean = false) => async (dispatch: any, getState: any) => {
    dispatch({
        type: REQUEST(ACTION_TYPES.FetchUKandIrelandOverviewData),
    });
    try {
        const data: UKAndIrelandData = await fetchAllData(yesterday);
        dispatch({
            type: SUCCESS(ACTION_TYPES.FetchUKandIrelandOverviewData),
            payload: data,
        })
    } catch {
        dispatch({
            type: FAILURE(ACTION_TYPES.FetchUKandIrelandOverviewData),
        })
    }
};
