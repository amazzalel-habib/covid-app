import * as React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Container } from "@material-ui/core";

interface ILayoutProps {
    children: React.ReactElement
}

const Layout = ({ children }: ILayoutProps) => {
    return (<div>
        <Header />
        <Container>{children}</Container>
        <Footer />
    </div>);
}

export default Layout;