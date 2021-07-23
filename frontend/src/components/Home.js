import React from 'react';

import { Container, Typography } from '@material-ui/core';

const Home = () => {
    return (
        <main> 
            <Container maxWidth="sm">
                <Typography variant="h4" align="center" color="textPrimary">
                    Welcome to Haiku Collection
                </Typography>
            </Container>
        </main>
    );
};

export default Home;