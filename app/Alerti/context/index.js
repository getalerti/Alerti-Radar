import React from 'react';
import initialState from "./initialState";
const Context = React.createContext();
const Provider = Context.Provider;
export {
    Provider,
    Context,
    initialState
};
