import { combineReducers } from "redux";
import { DailyDataState } from "./daily-cases-data-reducer";
import dailydata from "./daily-cases-data-reducer";

export interface IRootState {
    readonly dailydata: DailyDataState;
}


const rootReducer = combineReducers<IRootState>({
    dailydata
});

export default rootReducer;