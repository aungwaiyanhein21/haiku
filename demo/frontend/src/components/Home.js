import React from 'react';

import { Container, Typography } from '@material-ui/core';
import { Button, TextField, MenuItem  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh"
    },
    btn: {
        width: "200px",
        height: "50px",
        margin: "20px 0"
    }
});

const Home = () => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <main> 
            <Container maxWidth="sm">
                <Typography variant="h4" align="center" color="textPrimary">
                    Welcome to Haiku Collection
                </Typography>


                <Container className={classes.container} maxWidth="sm">
                    <Typography variant="body1" align="center" color="textPrimary">
                        If you want to contribute in adding more haiku, please email <a href="mailto:mgbarsky@gmail.com">mgbarsky@gmail.com</a>.
                    </Typography>
                
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.btn}
                        onClick={() => history.push('/haiku')}
                    >
                        View Haiku
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.btn}
                        onClick={() => history.push('/authors')}
                    >
                        View Authors
                    </Button>
                </Container>

               
            </Container>
        </main>
    );
};

export default Home;