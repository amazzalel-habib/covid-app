import * as React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface ILayoutProps {
    children: React.ReactElement
}

const Layout = ({ children }: ILayoutProps) => {
    return (<div>
        <Header />
        <>{children}</>
        <Footer />
    </div>);
}

export default Layout;