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

const Authors = () => {
    const history = useHistory();

    const [authorData, setAuthorData] = useState(null);

    const [hasClickedCreate, setHasClickedCreate] = useState(false);
    
    const getData = () => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/authors/read.php`)
        .then(response => {
            console.log(response.data);
            setAuthorData(response.data.data);
        })
        .catch(err => {
            console.log(err);
        });
    }

    const handleDelete = (id) => {
        axios.delete(`${process.env.REACT_APP_SERVER_URL}/authors/delete.php`, {
            data: {
                id: id
            }
        })
        .then(response => {
            console.log(response.data);
            getData();
            // setAuthorData(response.data.data);
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
                hasClickedCreate && <Redirect to="/authors/create" />
            }
   
            <Container maxWidth="lg">

                <IconButton 
                    color="primary"
                    onClick={() => history.push('/')}
                >
                    <KeyboardBackspaceIcon fontSize="large"/>
                </IconButton>

                <Typography variant="h4" align="center" color="textPrimary">
                    Authors
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
                    !authorData && <div><CircularProgress /></div>
                }

                {
                    authorData && <BasicTable data={authorData} handleDelete={handleDelete}/>
                }
                
            </Container>    
        </>
    );
};

export default Authors;