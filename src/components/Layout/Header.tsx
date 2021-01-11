import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, List, ListItem, ListItemText, Container, Drawer, Hidden } from "@material-ui/core"
import { Home, Menu } from "@material-ui/icons"
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles"

const useDrawerStyles = makeStyles({
    list: {
        width: 250,
    },
    linkText: {
        textDecoration: `none`,
        textTransform: `uppercase`,
        color: `black`,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: '14px'
    },
})

const useStyles = makeStyles({
    header:{
        backgroundColor: "rgb(32, 33, 36)",
        boxShadow: '0px 50px 50px #fff'
    },
    navDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`
    },
    navbarDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`
    },
    linkText: {
        textDecoration: `none`,
        textTransform: `uppercase`,
        color: `rgba(255,255,255, .87 )`,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: '14px'
    }
});

const navLinks: { title: string, path: string }[] = [
    { title: `Covid`, path: `/covid` },
    { title: `about us`, path: `/about-us` },
    { title: `contact`, path: `/contact` },
]

const SideDrawer = () => {
    const classes = useDrawerStyles();
    const [state, setState] = useState<any>({ right: false }) // Add this
    const toggleDrawer = (anchor: any, open: any) => (event: any) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return
        }
        setState({ [anchor]: open })
    }
    const sideDrawerList = (anchor) => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List component="nav">
                {navLinks.map(({ title, path }) => (
                    <a href={path} key={title} className={classes.linkText}>
                        <ListItem className={classes.linkText}>
                            {title}
                        </ListItem>
                    </a>
                ))}
            </List>
        </div>
    );
    return <>
        <IconButton onClick={toggleDrawer("right", true)} edge="start" aria-label="menu">
            <Menu />
        </IconButton>
        <Drawer
            anchor="right"
            open={state.right}
            onClose={toggleDrawer("right", false)}
        >
            {sideDrawerList("right")}
        </Drawer>
    </>
}


export default function Header() {
    const classes = useStyles();
    return <header>
        <AppBar  className={classes.header}  position="static">
            <Toolbar>
                <Container className={classes.navbarDisplayFlex}>
                    <IconButton edge="start" color="inherit" aria-label="home">
                        <Home fontSize="large" />
                    </IconButton>
                    <Hidden smDown>
                        <List className={classes.navDisplayFlex} component="nav" aria-labelledby="main navigation">
                            {navLinks.map(({ title, path }) => (
                                <Link className={classes.linkText} to={path} key={title}>
                                    <ListItem button>
                                        <ListItemText primary={title} />
                                    </ListItem>
                                </Link>
                            ))}
                        </List>
                    </Hidden>
                    <Hidden mdUp>
                        <SideDrawer />
                    </Hidden>
                </Container>
            </Toolbar>
        </AppBar>
    </header>
}