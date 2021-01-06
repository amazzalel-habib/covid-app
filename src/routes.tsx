import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";


export default function Routes() {
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                </Switch>
            </Layout>
        </Router>
    );
}
