import React from 'react';

import { Link } from 'react-router-dom';

import { Typography, AppBar, Toolbar} from '@material-ui/core';

import { makeStyles, withTheme } from '@material-ui/core/styles';

const useStyles = makeStyles({
    link: {
        color: "white",
        textDecoration: "none",
        cursor: "pointer"
    }
});
  

const Nav = () => {
    const classes = useStyles();

    return (
        <AppBar position="relative">
            <Toolbar>
                <Typography variant="h6">
                    <Link className={classes.link} to="/">Haiku Collection</Link>
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Nav;