import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from "./reducer";
import initialState from "./initialState";

let composeEnhancers = compose;
if (typeof window !== "undefined")
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)));
