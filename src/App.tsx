import React from "react";
import Routes from "./routes";
import Layout from "./components/Layout";
import configureStore from "./store";
import { Provider } from "react-redux";

const store = configureStore();

export default function App() {
    return (
        <Provider store={store}>
            <Layout>
                <Routes />
            </Layout>
        </Provider>
    );
}
