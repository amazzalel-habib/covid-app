import { combineReducers } from "redux";
import { NationDataState } from "./nation-data-reducer";
import nationData from "./nation-data-reducer";
import { RegionDataState } from "./region-data-reduce";
import regionData from "./region-data-reduce";
import { CountryDataState } from "./country-data-reduce";
import countryData from "./country-data-reduce";
import { IrelandRegionDataState } from "./ie-region-data-reducer";
import ieRegionData from "./ie-region-data-reducer";
export interface IRootState {
    readonly nationData: NationDataState;
    readonly regionData: RegionDataState;
    readonly ieRegionData: IrelandRegionDataState;
    readonly countryData: CountryDataState;
}


const rootReducer = combineReducers<IRootState>({
    nationData,
    regionData,
    countryData,
    ieRegionData
});

export default rootReducer;