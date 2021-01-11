import { combineReducers } from "redux";
import { DailyDataState } from "./daily-cases-data-reducer";
import dailydata from "./daily-cases-data-reducer";
import { DailyDataForRegionState } from "./data-region-reduce";
import regionDailyData from "./data-region-reduce";
import { AllDataState } from "./all-data-reduce";
import UKAndIrelandData from "./all-data-reduce";

export interface IRootState {
    readonly dailydata: DailyDataState;
    readonly regionDailyData: DailyDataForRegionState;
    readonly UKAndIrelandData: AllDataState;
}


const rootReducer = combineReducers<IRootState>({
    dailydata,
    regionDailyData,
    UKAndIrelandData
});

export default rootReducer;