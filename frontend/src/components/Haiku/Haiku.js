import React, { useEffect, useState } from 'react';
import BasicTable from './BasicTable';

import { Container, Typography } from '@material-ui/core';

import { Redirect, useHistory } from 'react-router-dom';


import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';

import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import IconButton from '@material-ui/core/IconButton';


const Haiku = () => {
    const history = useHistory();

    const [haikuData, setHaikuData] = useState(null);

    const [hasClickedCreate, setHasClickedCreate] = useState(false);
    
    const getData = () => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/haiku/read.php`)
        .then(response => {
            console.log(response.data);
            setHaikuData(response.data.receivedData);
        })
        .catch(err => {
            console.log(err);
        });
    }

    const handleDelete = (id) => {
        axios.delete(`${process.env.REACT_APP_SERVER_URL}/haiku/delete.php`, {
            data: {
                id: id
            }
        })
        .then(response => {
            console.log(response.data);
            getData();
        })
        .catch(err => {
            console.log(err);
        });
    };

    useEffect(() => {
        getData();
    }, []); 

    return (
        <>
            {
                hasClickedCreate && <Redirect push to="/haiku/create" />
            }
   
            <Container maxWidth="lg">
                <IconButton 
                    color="primary"
                    onClick={() => history.push('/')}
                >
                    <KeyboardBackspaceIcon fontSize="large"/>
                </IconButton>

                <Typography variant="h4" align="center" color="textPrimary">
                    Haiku
                </Typography>


                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<CreateIcon />}
                    onClick={() => setHasClickedCreate(true)}
                >
                    Create
                </Button>

                {
                    !haikuData && <div><CircularProgress /></div>
                }

                {
                    haikuData && <BasicTable data={haikuData} handleDelete={handleDelete}/>
                }
                
            </Container>    
        </>
    );
};

export default Haiku;