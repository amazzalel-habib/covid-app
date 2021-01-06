import { REQUEST, SUCCESS } from "./action-type.util";

export const ACTION_TYPES = {
    Test: 'Test/Test',
};

const initialState = {
    data: "",
    status: "loading"
};

export type TestState = Readonly<typeof initialState>;

const reducer = (state: TestState = initialState, action: any): TestState => {
    switch (action.type) {
        case SUCCESS(ACTION_TYPES.Test): {
            const { data } = action.payload;
            return {
                ...state,
                data: data,
                status: "success"
            };
        }
        case REQUEST(ACTION_TYPES.Test): {
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


export const TestAction = () => async (dispatch: any, getState: any) => {
    dispatch({
        type: REQUEST(ACTION_TYPES.Test),
    });
    setTimeout(() => {
        dispatch({
            type: SUCCESS(ACTION_TYPES.Test),
            payload: { data: "Wow" },
        })
    }, 10000);

};
