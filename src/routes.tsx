import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./components/Layout";
import Regions from "./Pages/Regions";


export default function Routes() {
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/regions">
                        <Regions />
                    </Route>
                </Switch>
            </Layout>
        </Router>
    );
}
