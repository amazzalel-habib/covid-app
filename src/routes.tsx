import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./components/Layout";
import Regions from "./Pages/Regions";
import IrelandRegions from "./Pages/IrelandRegions";


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
                    <Route exact path="/ireland">
                        <IrelandRegions />
                    </Route>
                </Switch>
            </Layout>
        </Router>
    );
}
