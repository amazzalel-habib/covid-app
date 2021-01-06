import React from "react";
import Routes from "./routes";
import configureStore from "./store";
import { Provider } from "react-redux";

const store = configureStore();

const App = () => {
    return (
        <Provider store={store}>
            <Routes />
        </Provider>
    );
}

export default App;