import React from 'react';

import { Typography, AppBar, Toolbar} from '@material-ui/core';



const Nav = () => {
    return (
        <AppBar position="relative">
            <Toolbar>
                <Typography variant="h6">
                    Haiku Collection
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Nav;