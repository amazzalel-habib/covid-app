import { combineReducers } from "redux";
import { TestState } from "./test-reducer";
import testReducer from "./test-reducer";

export interface IRootState {
    readonly test: TestState;
}


const rootReducer = combineReducers<IRootState>({
    test: testReducer
});

export default rootReducer;