import React from 'react';

import { Container, Typography } from '@material-ui/core';

const Page404 = () => {

    return (
        <main> 
            <Container maxWidth="sm">
                <Typography variant="h4" align="center" color="textPrimary">
                   404: Page Not Found
                </Typography>
            </Container>
        </main>
    );
};

export default Page404;