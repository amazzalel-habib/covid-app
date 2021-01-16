import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            alignContent: "center",
            alignItems: "center",
            width: '100%',
            padding: "4rem 0 0rem 0",
            '& > * + *': {
                marginLeft: theme.spacing(2),
            },
        },
    }),
);
interface LoaderProps {
    status: string;
    Wrapper?: any;
    children: any;
}
const Alert = ({ message }) => {
    const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false);
    }
    return <Snackbar
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        open={open}
        message={message}
        action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
            </IconButton>
        }
    />;
}
export default function Loader({ children, status, Wrapper }: LoaderProps) {
    const classes = useStyles();
    if (!Wrapper) {
        Wrapper = (props) => <>{props.children}</>;
    }
    switch (status) {
        case "success":
            return children;
        case "error":
            return <Alert message={<div style={{display: "flex", alignItems:"center"}}><ErrorIcon style={{color: "red"}} fontSize="small" /><div style={{color: "red"}}>{"An erro occured while trying to load the data, please try again later."}</div></div>} />;
        default:
            return <Wrapper><div className={classes.root}><CircularProgress size={70} style={{ margin: "0 auto" }} /> </div></Wrapper>;
    }
}