import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer, { IRootState } from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'

export default function configureStore(preloadedState?: IRootState) {
    const middlewares = [thunkMiddleware]
    const middlewareEnhancer = applyMiddleware(...middlewares)

    const enhancers = [middlewareEnhancer]
    let composedEnhancers = compose<any>(...enhancers)
    composedEnhancers = composeWithDevTools(...enhancers)
    const store = createStore(rootReducer, preloadedState, composedEnhancers)

    return store
}
